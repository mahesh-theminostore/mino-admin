'use client';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ApiClient } from '@/api/ApiClient';

export default function SignInForm() {
  const router = useRouter();
  const { setIsAuthenticated, redirectPath } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const apiClient = new ApiClient();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((formVal) => ({
      ...formVal,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await apiClient.post('/admin-auth/sign-in', formData);

      const { accessToken } = res.data;

      if (!accessToken) throw new Error('Login Error');

      localStorage.setItem('token', accessToken);
      setIsAuthenticated(true);
      router.push(redirectPath);
    } catch (err) {
      // @ts-expect-error  will define type later
      window.alert(err.message);
    }
  }

  return (
    <div className='flex w-full flex-1 flex-col lg:w-1/2'>
      <div className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center'>
        <div>
          <div className='mb-5 sm:mb-8'>
            <h1 className='mb-2 text-title-sm font-semibold text-gray-800 sm:text-title-md dark:text-white/90'>
              Sign In
            </h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Enter your mobile number and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='space-y-6'>
                <div>
                  <Label>
                    Mobile Number <span className='text-error-500'>*</span>{' '}
                  </Label>
                  <Input name='username' onChange={handleChange} required value={formData.username} />
                </div>
                <div>
                  <Label>
                    Password <span className='text-error-500'>*</span>{' '}
                  </Label>
                  <div className='relative'>
                    <Input
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter your password'
                      onChange={handleChange}
                      value={formData.password}
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer'
                    >
                      {showPassword ? (
                        <EyeIcon className='fill-gray-500 dark:fill-gray-400' />
                      ) : (
                        <EyeCloseIcon className='fill-gray-500 dark:fill-gray-400' />
                      )}
                    </span>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div> */}
                <div>
                  <Button type='submit' className='w-full' size='sm'>
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
