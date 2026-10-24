'use client';

import { useEffect, type FC, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAddDispatch';
import { AUTH_FAILURE, AUTH_LOADING, AUTH_LOGOUT, AUTH_SUCCESS, OPEN_ROUTES } from '@/constants/auth';
import { fetchUserAuth } from '@/redux/features/userAuth';
import LoadingScreen from '../LoadingScreen';

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const { user, status } = useAppSelector((state) => state.userAuth);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch user on page load
  useEffect(() => {
    // Don't fetch user if user is loading
    if (status === AUTH_LOADING) return;

    // Redirect to Login page if user is not logged in
    if (!user && (status === AUTH_LOGOUT || status === AUTH_FAILURE)) {
      const params = new URLSearchParams(searchParams);
      params.set('redirect', pathname);
      window.location.href = `/login?${params.toString()}`;
      return;
    }

    if (!user && status !== AUTH_FAILURE) dispatch(fetchUserAuth());

    if (user && OPEN_ROUTES.includes(pathname)) {
      const params = new URLSearchParams(searchParams);
      const redirectPath = params.get('redirect') || '/dashboard';
      params.delete('redirect'); // exclude 'redirect' from being added again

      const remainingQuery = params.toString();
      window.location.href = remainingQuery ? `${redirectPath}?${remainingQuery}` : redirectPath;

      return;
    }
  }, [dispatch, pathname, user, status, searchParams]);

  if (status !== AUTH_SUCCESS) return <LoadingScreen />;

  return <div>{children}</div>;
};

export default AuthProvider;
