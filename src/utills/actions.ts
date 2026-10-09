'use server';

import { client } from '@/sanity/lib/client';
import { type ContactFormData } from '@/components/pages/contact/contactForm';

export const submitContactMe = async (data: ContactFormData) => {
  const updatedData = {
    _type: 'contactMe',
    ...data,
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await client.create(updatedData);
    return response;
  } catch (error) {
    console.log(error);
  }
};
