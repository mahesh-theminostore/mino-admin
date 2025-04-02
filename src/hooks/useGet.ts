'use client';

import { Params } from 'next/dist/server/request/params';
import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export const useGet = <T>(url: string, params?: Params) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isFetching, setFetching] = useState<boolean>(true);

  async function fetchData() {
    try {
      setFetching(true);

      let fetchUrl = API_BASE_URL + url;

      if (params) {
        // @ts-expect-error  will redefine type for params later
        fetchUrl += `?${new URLSearchParams(params).toString()}`;
      }

      const res = await fetch(fetchUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const resJson = await res.json();

      setData(resJson.data);
    } catch (error: unknown) {
      if (typeof error === 'string') {
        setError(error);
      } else if (error instanceof Error) {
        setError(error?.message || 'Something went wrong');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
      setFetching(false);
    }
  }

  function reFetch() {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [url, params]);

  return { data, error, isLoading, isFetching, reFetch };
};
