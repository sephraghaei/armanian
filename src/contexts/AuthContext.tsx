import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AppUser = {
  id: string;
  phone: string;
  first_name: string;
  last_name: string;
};

interface AuthContextType {
  user: AppUser | null;
  session: null;
  loading: boolean;
  signUpWithCredentials: (phone: string, firstName: string, lastName: string, password: string) => Promise<{ error: any }>;
  signInWithCredentials: (phone: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
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

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem('app_user');
      if (rawUser) {
        setUser(JSON.parse(rawUser));
      }
    } catch {}
    setLoading(false);
  }, []);

  const toEmailFromPhone = (phone: string): string => {
    const normalized = phone.replace(/[^\d]/g, '').replace(/^98/, '0');
    // synthetic, unique per phone
    return `u${normalized}@example.com`;
  };

  const signUpWithCredentials = async (phone: string, firstName: string, lastName: string, password: string) => {
    try {
      const functionUrl = `https://drthfkbvxqjhuurmxjrk.supabase.co/functions/v1/auth-register`;
      const res = await fetch(functionUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ phone, firstName, lastName, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        const body = (() => { try { return JSON.parse(text); } catch { return {}; } })();
        return { error: { message: body.error || 'خطا در ثبت نام' } };
      }
      const body = await res.json();
      try { localStorage.setItem('app_user', JSON.stringify(body.user)); } catch {}
      setUser(body.user);
      return { error: null };
    } catch (e: any) {
      return { error: { message: 'خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید' } };
    }
  };

  const signInWithCredentials = async (phone: string, password: string) => {
    try {
      const functionUrl = `https://drthfkbvxqjhuurmxjrk.supabase.co/functions/v1/auth-login`;
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
      return { error: null };
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
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};