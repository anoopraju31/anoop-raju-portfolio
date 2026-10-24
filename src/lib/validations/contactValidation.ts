import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^[+0-9\s\-().]{7,20}$/.test(val), {
      message: 'Please enter a valid phone number or leave blank',
    }),
  subject: z
    .string()
    .trim()
    .min(3, { message: 'Subject must be at least 3 characters' })
    .max(150, { message: 'Subject cannot exceed 150 characters' }),
  message: z.string().trim().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
