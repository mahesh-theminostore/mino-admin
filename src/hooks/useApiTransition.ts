import { useEffect, useState } from 'react';

export const useApiTransition = <T>(fn?: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [errorMessage, setErrorMessage] = useState('');

  async function apiFetch(fn: () => Promise<T>) {
    setLoading(true);

    try {
      const resData = await fn();

      setData(resData);

      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
        setErrorMessage(err.message);
      } else {
        setError(new Error('Error in API Call'));
        setErrorMessage('Error in API Call');
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    if (fn) apiFetch(fn);
    else setLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    errorMessage,
    apiFetch,
  };
};
