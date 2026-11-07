import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_NOTIFICATIONS } from '@/lib/patient-notifications';

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const unreadOnly = sp.get('unread') === 'true';
  const limit = parseInt(sp.get('limit') || '20', 10);

  let list = DEFAULT_NOTIFICATIONS;
  if (unreadOnly) {
    list = list.filter((n) => !n.readAt);
  }

  const unreadCount = DEFAULT_NOTIFICATIONS.filter((n) => !n.readAt).length;

  return NextResponse.json({
    notifications: list.slice(0, limit),
    total: list.length,
    unreadCount,
  });
}

