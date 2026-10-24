'use server';

import prisma from '@/lib/prisma';
import { contactFormSchema, type ContactFormInput } from '@/lib/validations/contactValidation';

export type SubmitContactResult = {
  success: boolean;
  message: string;
  id?: string;
  errors?: Record<string, string[] | undefined>;
};

export const submitContactMe = async (rawData: ContactFormInput): Promise<SubmitContactResult> => {
  const validation = contactFormSchema.safeParse(rawData);

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return {
      success: false,
      message: 'Validation failed. Please check the entered fields.',
      errors: fieldErrors,
    };
  }

  const { name, email, phone, subject, message } = validation.data;

  try {
    const record = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message: message || null,
      },
    });

    return {
      success: true,
      message: 'Message received! I will get back to you shortly.',
      id: record.id,
    };
  } catch (error) {
    console.error('Error saving contact message to MongoDB via Prisma:', error);
    return {
      success: false,
      message: 'Database connection failed. Please verify DATABASE_URL or email directly.',
    };
  }
};
