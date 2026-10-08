'use client';

import { type ChangeEvent, useState, type FC, FormEvent, useEffect } from 'react';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import InputField from './inputField';
import TextareaField from './textareaField';
import { submitContactMe } from '@/utills/actions';
import { toast } from 'sonner';

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

type Status = 'DISABLED' | 'SUBMITTING' | 'SUCCESS' | 'ERROR' | 'ENABLED';

const ContactForm: FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<Status>('DISABLED');

  useEffect(() => {
    if (status === 'SUBMITTING') return;

    const { email, name, subject, message } = formData;
    const isFilled = Boolean(email.trim() && name.trim() && subject.trim() && message.trim());

    setStatus(isFilled ? 'ENABLED' : 'DISABLED');
  }, [formData, status]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'DISABLED' || status === 'SUBMITTING') return;

    setStatus('SUBMITTING');

    try {
      const response = await submitContactMe(formData);

      if (!response) {
        toast.error('Something went wrong. Please try again later or email directly.');
        setStatus('ENABLED');
        return;
      }

      setStatus('SUCCESS');
      setFormData(initialFormData);
      toast.success('Message received! I will get back to you shortly.');

      // Reset back to disabled after 4 seconds
      setTimeout(() => {
        setStatus('DISABLED');
      }, 4000);
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit message. Please try emailing directly.');
      setStatus('ENABLED');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative z-10 flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-8 sm:gap-10">
        {/* Name */}
        <InputField
          label="Your Name"
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'SUBMITTING'}
        />

        {/* Email */}
        <InputField
          label="Your Email"
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'SUBMITTING'}
        />

        {/* Subject */}
        <InputField
          label="Project / Subject"
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          disabled={status === 'SUBMITTING'}
        />

        {/* Message */}
        <TextareaField
          label="Your Message"
          id="message"
          name="message"
          required
          rows={3}
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'SUBMITTING'}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'DISABLED' || status === 'SUBMITTING'}
        className={`group relative flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 sm:text-base ${
          status === 'SUCCESS'
            ? 'bg-light-green text-dark-blue shadow-[0_0_25px_rgba(76,252,15,0.4)]'
            : status === 'SUBMITTING'
              ? 'cursor-wait bg-light-green/70 text-dark-blue'
              : status === 'ENABLED'
                ? 'cursor-pointer bg-light-green text-dark-blue hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(76,252,15,0.4)] active:scale-[0.99]'
                : 'cursor-not-allowed border border-white/10 bg-white/10 text-white/40'
        }`}
      >
        {status === 'SUBMITTING' ? (
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
            <span>Sending Message...</span>
          </>
        ) : status === 'SUCCESS' ? (
          <>
            <FiCheckCircle className="text-xl" />
            <span>Message Sent!</span>
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
