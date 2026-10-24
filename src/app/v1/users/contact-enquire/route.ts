import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const formattedMessages = messages.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      subject: item.subject,
      message: item.message,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return NextResponse.json(formattedMessages, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact enquiries:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
