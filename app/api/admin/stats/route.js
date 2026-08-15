import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDatabase } from '@/lib/mongodb';

const AUTH_SECRET = 'pen_llm_admin_authenticated_session_secret_key';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('pen_admin_auth')?.value;

    if (token !== AUTH_SECRET) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'all'; // 'today' | '7d' | '30d' | 'all'

    const db = await getDatabase();
    const events = db.collection('events');

    let dateFilter = {};
    const now = new Date();

    if (range === 'today') {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      dateFilter = { timestamp: { $gte: startOfDay } };
    } else if (range === '7d') {
      const past7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { timestamp: { $gte: past7 } };
    } else if (range === '30d') {
      const past30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateFilter = { timestamp: { $gte: past30 } };
    }

    // 1. Overall counts
    const totalEvents = await events.countDocuments(dateFilter);
    const pageViews = await events.countDocuments({ ...dateFilter, eventType: 'page_view' });
    const downloadClicks = await events.countDocuments({ ...dateFilter, eventType: 'download_click' });
    const installClicks = await events.countDocuments({ ...dateFilter, eventType: 'install_click' });
    const localhostClicks = await events.countDocuments({ ...dateFilter, eventType: 'localhost_click' });

    // 2. Unique visitors
    const uniqueVisitorsList = await events.distinct('visitorId', { ...dateFilter, eventType: 'page_view' });
    const uniqueVisitors = uniqueVisitorsList.length;

    // 3. Today specific counts
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayViews = await events.countDocuments({ timestamp: { $gte: todayStart }, eventType: 'page_view' });
    const todayDownloads = await events.countDocuments({ timestamp: { $gte: todayStart }, eventType: 'download_click' });
    const todayVisitorsList = await events.distinct('visitorId', { timestamp: { $gte: todayStart } });
    const todayVisitors = todayVisitorsList.length;

    // 4. Download source button breakdown
    const downloadBreakdown = await events.aggregate([
      { $match: { ...dateFilter, eventType: 'download_click' } },
      { $group: { _id: '$buttonLabel', count: { $sum: 1 }, buttonId: { $first: '$buttonId' } } },
      { $sort: { count: -1 } }
    ]).toArray();

    // 5. OS breakdown
    const osBreakdown = await events.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$os', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();

    // 6. Browser breakdown
    const browserBreakdown = await events.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();

    // 7. Daily timeline trend (last 14 days)
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const dailyTrend = await events.aggregate([
      { $match: { timestamp: { $gte: fourteenDaysAgo } } },
      {
        $group: {
          _id: {
            date: '$dateStr',
            type: '$eventType'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.date': 1 } }
    ]).toArray();

    // Process daily trend into structured array
    const trendMap = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      trendMap[dateStr] = { date: dateStr, views: 0, downloads: 0, others: 0 };
    }

    dailyTrend.forEach((item) => {
      const dateStr = item._id.date;
      if (trendMap[dateStr]) {
        if (item._id.type === 'page_view') trendMap[dateStr].views = item.count;
        else if (item._id.type === 'download_click') trendMap[dateStr].downloads = item.count;
        else trendMap[dateStr].others += item.count;
      }
    });

    // 8. Recent 35 activity logs
    const recentEvents = await events
      .find(dateFilter)
      .sort({ timestamp: -1 })
      .limit(35)
      .toArray();

    const conversionRate = uniqueVisitors > 0
      ? ((downloadClicks / uniqueVisitors) * 100).toFixed(1)
      : '0.0';

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalEvents,
          pageViews,
          uniqueVisitors,
          downloadClicks,
          installClicks,
          localhostClicks,
          conversionRate,
          todayViews,
          todayDownloads,
          todayVisitors,
        },
        downloadBreakdown,
        osBreakdown,
        browserBreakdown,
        dailyTrend: Object.values(trendMap),
        recentEvents,
      }
    });
  } catch (error) {
    console.error('Admin Stats API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
