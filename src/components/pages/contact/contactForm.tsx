'use client';

import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiSend, FiCheckCircle } from 'react-icons/fi';

import { submitContactMe } from '@/utills/actions';
import { contactFormSchema, type ContactFormInput } from '@/lib/validations/contactValidation';
import { showSuccessToast, showErrorToast } from './contactToast';
import { cn } from '@/utills';
import InputField from './inputField';
import TextareaField from './textareaField';

export type ContactFormData = ContactFormInput;

const ContactForm: FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      // phone: '',
      subject: '',
      message: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: ContactFormInput) => {
    try {
      const response = await submitContactMe(data);

      if (!response.success) {
        showErrorToast(
          response.message || 'Something went wrong while saving your message. Please try again.',
          'Submission Error',
        );
        return;
      }

      setIsSuccess(true);
      reset();
      showSuccessToast(
        'Your message has been stored in MongoDB. I will review it and get in touch with you shortly!',
        'Message Sent',
      );

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Contact form submission error:', error);
      showErrorToast(
        'Failed to connect to the database. Please verify network or email directly.',
        'Network Error',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative z-10 flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-7 sm:gap-9">
        {/* Name */}
        <InputField
          label="Your Name *"
          type="text"
          id="name"
          disabled={isSubmitting}
          error={errors.name?.message}
          {...register('name')}
        />

        {/* Email */}
        <InputField
          label="Your Email *"
          type="email"
          id="email"
          disabled={isSubmitting}
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Phone (Optional) */}
        {/* <InputField
          label="Phone Number (Optional)"
          type="tel"
          id="phone"
          disabled={isSubmitting}
          error={errors.phone?.message}
          {...register('phone')}
        /> */}

        {/* Subject */}
        <InputField
          label="Project / Subject *"
          type="text"
          id="subject"
          disabled={isSubmitting}
          error={errors.subject?.message}
          {...register('subject')}
        />

        {/* Message (Optional) */}
        <TextareaField
          label="Your Message (Optional)"
          id="message"
          rows={3}
          disabled={isSubmitting}
          error={errors.message?.message}
          {...register('message')}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'group relative flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 sm:text-base',
          isSuccess
            ? 'bg-light-green text-dark-blue shadow-[0_0_25px_rgba(76,252,15,0.4)]'
            : isSubmitting
              ? 'cursor-wait bg-light-green/70 text-dark-blue'
              : 'cursor-pointer bg-light-green text-dark-blue hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(76,252,15,0.4)] active:scale-[0.99]',
        )}
      >
        {isSubmitting ? (
          <>
            <svg
              className="h-5 w-5 animate-spin text-dark-blue"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Saving Message...</span>
          </>
        ) : isSuccess ? (
          <>
            <FiCheckCircle className="text-xl" />
            <span>Message Saved!</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <FiSend className="text-lg transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
