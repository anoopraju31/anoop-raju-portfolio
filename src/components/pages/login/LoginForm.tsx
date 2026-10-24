'use client';

import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

import type { UserAuth } from '../../../../types';
import { loginFormSchema, type LoginFormInput } from '@/lib/validations/authValidation';
import useAppDispatch from '@/hooks/useAddDispatch';
import { setUser } from '@/redux/features/userAuth';
import { cn } from '@/utills';

interface LoginApiResponse {
  message: string;
  user: UserAuth;
  errors?: Record<string, string[]>;
}

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormInput) => {
    setServerError(null);

    try {
      const response = await axios.post<LoginApiResponse>(
        '/v1/users/auth/login',
        {
          email: data.email.trim().toLowerCase(),
          password: data.password,
        },
        { withCredentials: true },
      );

      if (response.data && response.data.user) {
        setIsSuccess(true);
        dispatch(setUser(response.data.user));

        toast.success('Access Granted', {
          description: `Welcome back, ${response.data.user.firstName || 'Admin'}!`,
        });

        // Short timeout for visual feedback before route navigation
        setTimeout(() => {
          router.push(redirectUrl);
          router.refresh();
        }, 800);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        const status = err.response.status;
        const msg = err.response.data?.message || 'Authentication failed. Please verify your credentials.';

        if (status === 401) {
          setServerError('Invalid email or password. Please verify your credentials.');
          toast.error('Authentication Failed', {
            description: 'Invalid email or password. Please try again.',
          });
        } else if (status === 400 && err.response.data?.errors) {
          const firstError = Object.values(err.response.data.errors)[0] as string[];
          setServerError(firstError?.[0] || 'Validation failed.');
          toast.error('Validation Error', {
            description: firstError?.[0] || 'Please check the form fields.',
          });
        } else {
          setServerError(msg);
          toast.error('Login Failed', { description: msg });
        }
      } else {
        const networkError = 'Network connection error. Please ensure the server is running.';
        setServerError(networkError);
        toast.error('Connection Error', { description: networkError });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-6">
      {/* Server Error Alert Banner */}
      {serverError && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 backdrop-blur-md transition-all">
          <FiAlertCircle className="shrink-0 text-lg text-red-400" />
          <span className="font-sans leading-snug">{serverError}</span>
        </div>
      )}

      {/* Email Input Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-white/70">
          Administrator Email
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/40">
            <FiMail className="text-lg" />
          </div>
          <input
            id="email"
            type="email"
            autoComplete="email"
            disabled={isSubmitting || isSuccess}
            placeholder="admin@anoopraju.xyz"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
            className={cn(
              'w-full rounded-xl border bg-white/[0.04] py-3.5 pl-11 pr-4 font-sans text-sm text-white placeholder-white/20 backdrop-blur-sm transition-all duration-300 focus:outline-none sm:text-base',
              errors.email
                ? 'border-red-500/80 bg-red-500/[0.04] focus:border-red-400 focus:ring-1 focus:ring-red-400/50'
                : 'border-white/10 hover:border-white/20 focus:border-light-green focus:bg-white/[0.06] focus:ring-1 focus:ring-light-green/40',
              (isSubmitting || isSuccess) && 'cursor-not-allowed opacity-60',
            )}
          />
        </div>
        {errors.email && <p className="font-mono text-xs text-red-400">{errors.email.message}</p>}
      </div>

      {/* Password Input Field */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="font-mono text-xs uppercase tracking-widest text-white/70">
            Access Key / Password
          </label>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/40">
            <FiLock className="text-lg" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            disabled={isSubmitting || isSuccess}
            placeholder="••••••••••••"
            aria-invalid={Boolean(errors.password)}
            {...register('password')}
            className={cn(
              'w-full rounded-xl border bg-white/[0.04] py-3.5 pl-11 pr-12 font-sans text-sm text-white placeholder-white/20 backdrop-blur-sm transition-all duration-300 focus:outline-none sm:text-base',
              errors.password
                ? 'border-red-500/80 bg-red-500/[0.04] focus:border-red-400 focus:ring-1 focus:ring-red-400/50'
                : 'border-white/10 hover:border-white/20 focus:border-light-green focus:bg-white/[0.06] focus:ring-1 focus:ring-light-green/40',
              (isSubmitting || isSuccess) && 'cursor-not-allowed opacity-60',
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isSubmitting || isSuccess}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40 transition-colors duration-200 hover:text-white/80 focus:outline-none"
          >
            {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
          </button>
        </div>
        {errors.password && <p className="font-mono text-xs text-red-400">{errors.password.message}</p>}
      </div>

      {/* Security notice hint */}
      <div className="flex items-center justify-between pt-1">
        <span className="font-mono text-[11px] text-white/40">AUTHORIZED PERSONNEL ONLY</span>
        <span className="font-mono text-[11px] text-light-green/70">TLS 1.3 SECURE</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className={cn(
          'group relative mt-2 flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 sm:text-base',
          isSuccess
            ? 'bg-light-green text-dark-blue shadow-[0_0_30px_rgba(76,252,15,0.5)]'
            : isSubmitting
              ? 'cursor-wait bg-light-green/70 text-dark-blue'
              : 'cursor-pointer bg-light-green text-dark-blue hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(76,252,15,0.45)] active:scale-[0.99]',
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
            <span>Verifying Credentials...</span>
          </>
        ) : isSuccess ? (
          <>
            <FiCheckCircle className="text-xl" />
            <span>Authenticated. Launching...</span>
          </>
        ) : (
          <>
            <span>Authenticate Session</span>
            <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
