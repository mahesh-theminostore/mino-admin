'use client';

import { API_BASE_URL } from '@/utils/environment';
import { getFromLocalStorage } from '@/utils/storage';
import { HTTP_METHOD } from 'next/dist/server/web/http';

type ParamsType = string | string[][] | Record<string, string> | URLSearchParams;

function handleApiError(res: Response) {
  if (res.status === 401) {
    window.alert('Logged out');
    window.location.href = '/signin';

    return;
  }

  throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
}

export class ApiClient {
  authToken: string | null = null;

  constructor() {
    this.authToken = getFromLocalStorage('token');
  }

  async get(path: string, params?: ParamsType, headers: object = {}) {
    try {
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      let requestParms: string = '';

      if (this.authToken) {
        requestHeaders['Authorization'] = `Bearer ${this.authToken}`;
      }

      if (headers) {
        Object.assign(requestHeaders, headers);
      }

      if (params) {
        const paramsString: string = new URLSearchParams(params).toString();

        if (paramsString) requestParms = `?${paramsString}`;
      }

      const res = await fetch(`${API_BASE_URL}${path}${requestParms}`, {
        method: 'GET',
        headers: requestHeaders,
      });

      if (!res.ok) {
        handleApiError(res);
      }

      const resJson = await res.json();

      return resJson;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('Error fetching data');
      }
    }
  }

  async post(path: string, body: object = {}, method: HTTP_METHOD = 'POST', params?: ParamsType, headers: object = {}) {
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    let requestParms: string = '';
    let requestBody: string = '';

    if (this.authToken) {
      requestHeaders['Authorization'] = `Bearer ${this.authToken}`;
    }

    if (headers) {
      Object.assign(requestHeaders, headers);
    }

    if (params) {
      const paramsString: string = new URLSearchParams(params).toString();

      if (paramsString) requestParms = `?${paramsString}`;
    }

    if (body) {
      requestBody = JSON.stringify(body);
    }

    const res = await fetch(`${API_BASE_URL}${path}${requestParms}`, {
      method,
      body: requestBody,
      headers: requestHeaders,
    });

    if (!res.ok) {
      handleApiError(res);
    }

    const resJson = await res.json();

    return resJson;
  }
}
