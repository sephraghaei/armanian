import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';

type AppUser = {
  id: string;
  phone: string;
  first_name: string;
  last_name: string;
  email?: string | null;
};

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  signUpWithCredentials: (phone: string, firstName: string, lastName: string, email: string, password: string, redirectTo?: string) => Promise<{ error: any }>;
  signInWithCredentials: (phone: string, password: string, redirectTo?: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  requestPasswordReset: (email: string) => Promise<{ error: any; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<null>(null);
  const [loading, setLoading] = useState(true);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem('app_user');
      if (rawUser) {
        setUser(JSON.parse(rawUser));
      }
    } catch {}
    setLoading(false);
  }, []);

  const ensureFunctionUrl = () => {
    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL is not defined');
    }
    return supabaseUrl;
  };

  const signUpWithCredentials = async (
    phone: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    redirectTo: string = '/courses'
  ) => {
    try {
      const baseUrl = ensureFunctionUrl();
      const functionUrl = `${baseUrl}/functions/v1/auth-register`;
      const res = await fetch(functionUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ phone, firstName, lastName, email, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        const body = (() => { try { return JSON.parse(text); } catch { return {}; } })();
        return { error: { message: body.error || 'خطا در ثبت نام' } };
      }
      const body = await res.json();
      try { localStorage.setItem('app_user', JSON.stringify(body.user)); } catch {}
      setUser(body.user);
      // Redirect to target page after successful signup
      window.location.href = redirectTo;
      return { error: null };
    } catch (e: any) {
      return { error: { message: 'خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید' } };
    }
  };

  const signInWithCredentials = async (phone: string, password: string, redirectTo: string = '/') => {
    try {
      const baseUrl = ensureFunctionUrl();
      const functionUrl = `${baseUrl}/functions/v1/auth-login`;
      const res = await fetch(functionUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        const body = (() => { try { return JSON.parse(text); } catch { return {}; } })();
        return { error: { message: body.error || 'خطا در ورود' } };
      }
      const body = await res.json();
      try { localStorage.setItem('app_user', JSON.stringify(body.user)); } catch {}
      setUser(body.user);
      window.location.href = redirectTo;
      return { error: null };
    } catch (e: any) {
      return { error: { message: 'خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید' } };
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      const baseUrl = ensureFunctionUrl();
      const functionUrl = `${baseUrl}/functions/v1/password-reset`;
      const res = await fetch(functionUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const text = await res.text();
        const body = (() => { try { return JSON.parse(text); } catch { return {}; } })();
        return { error: { message: body.error || 'خطا در ارسال درخواست بازیابی' } };
      }
      const body = await res.json();
      return { error: null, message: body.message };
    } catch (e: any) {
      return { error: { message: 'خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید' } };
    }
  };

  const signOut = async () => {
    try { localStorage.removeItem('app_user'); } catch {}
    setUser(null);
    return { error: null };
  };

  const value = {
    user,
    session,
    loading,
    signUpWithCredentials,
    signInWithCredentials,
    signOut,
    requestPasswordReset
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};