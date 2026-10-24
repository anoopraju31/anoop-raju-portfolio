import { NextResponse } from 'next/server';

import { AUTH_COOKIE_NAME } from '@/lib/auth';

function handleLogout() {
  const response = NextResponse.json({ message: 'Logged out successfully', success: true }, { status: 200 });

  response.cookies.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}

export async function POST() {
  return handleLogout();
}

export async function GET() {
  return handleLogout();
}
