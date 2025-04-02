'use client';

export function getFromLocalStorage(key: string): string | null {
  if (typeof localStorage !== 'undefined') {
    const value = window.localStorage.getItem(key);

    if (!value) return null;

    return value;
  }

  return null;
}

export function setInLocalStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
}
