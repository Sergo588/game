import { useRouter } from 'next/router';

export const usePreviewMode = () => {
  const { query } = useRouter();

  return !!query.user;
};
