import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      eventType,
      buttonId,
      buttonLabel,
      page = '/',
      referrer = '',
      visitorId,
      sessionId,
      screen,
    } = body;

    if (!eventType) {
      return NextResponse.json({ error: 'eventType is required' }, { status: 400 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Basic OS / Device detection
    let os = 'Unknown OS';
    if (/windows/i.test(userAgent)) os = 'Windows';
    else if (/macintosh|mac os x/i.test(userAgent)) os = 'macOS';
    else if (/android/i.test(userAgent)) os = 'Android';
    else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'iOS';
    else if (/linux/i.test(userAgent)) os = 'Linux';

    let browser = 'Unknown Browser';
    if (/edg/i.test(userAgent)) browser = 'Edge';
    else if (/chrome|crios/i.test(userAgent)) browser = 'Chrome';
    else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
    else if (/safari/i.test(userAgent)) browser = 'Safari';
    else if (/opera|opr/i.test(userAgent)) browser = 'Opera';

    const db = await getDatabase();
    const eventsCollection = db.collection('events');

    const eventDoc = {
      eventType, // 'page_view' | 'download_click' | 'install_click' | 'localhost_click' | 'nav_click'
      buttonId: buttonId || null,
      buttonLabel: buttonLabel || null,
      page,
      referrer,
      visitorId: visitorId || 'anonymous',
      sessionId: sessionId || 'session-' + Date.now(),
      ip,
      os,
      browser,
      screen: screen || 'Unknown',
      timestamp: new Date(),
      dateStr: new Date().toISOString().split('T')[0],
    };

    await eventsCollection.insertOne(eventDoc);

    return NextResponse.json({ success: true, eventId: eventDoc._id });
  } catch (error) {
    console.error('Track API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
