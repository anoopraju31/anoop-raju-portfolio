import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { contactFormSchema } from '@/lib/validations/contactValidation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: 'Validation failed. Please check the entered fields.',
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, phone, subject, message } = result.data;

    const record = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message: message || null,
      },
    });

    return NextResponse.json(
      {
        message: 'Contact message recorded successfully.',
        id: record.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json({ message: 'Database connection failed. Please verify DATABASE_URL.' }, { status: 500 });
  }
}
