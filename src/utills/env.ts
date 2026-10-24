export const getBackendBaseUrl = () => {
  const value = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!value) throw new Error('Missing environment variable: NEXT_PUBLIC_BACKEND_URL');

  return value;
};

export const BACKEND_URL = getBackendBaseUrl();
