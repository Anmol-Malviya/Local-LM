import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDatabase } from '@/lib/mongodb';

const AUTH_SECRET = 'pen_llm_admin_authenticated_session_secret_key';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('pen_admin_auth')?.value;

    if (token !== AUTH_SECRET) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();
    const result = await db.collection('events').deleteMany({});
    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
