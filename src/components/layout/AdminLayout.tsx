"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, setRedirectPath } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Store the current path for redirect after login
      setRedirectPath(window.location.pathname);
      router.push('/sign-in');
    }
  }, [isAuthenticated, router, setRedirectPath]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Add your sidebar and other layout components here */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 