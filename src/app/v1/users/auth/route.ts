import { NextRequest, NextResponse } from 'next/server';

import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching auth user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
