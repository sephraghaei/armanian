import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, phone?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (token: string, newPassword: string) => Promise<{ error: any }>;
  isAdmin: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // بررسی session موجود
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkAdminStatus(session?.user?.id);
    });

    // گوش دادن به تغییرات احراز هویت
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkAdminStatus(session?.user?.id);
    });

    setLoading(false);
    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId?: string) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    setIsAdmin(!!data);
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, phone?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            display_name: `${firstName} ${lastName}`,
          },
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) return { error };

      // ارسال ایمیل خوش‌آمدگویی
      if (data.user) {
        await supabase.functions.invoke('send-email', {
          body: {
            to: email,
            subject: 'خوش آمدید به آرمانیان آکادمی',
            html: `
              <div style="font-family: Tahoma, sans-serif; direction: rtl; text-align: right;">
                <h2>سلام ${firstName} ${lastName}!</h2>
                <p>به آرمانیان آکادمی خوش آمدید.</p>
                <p>اکنون می‌توانید در دوره‌های مختلف ثبت‌نام کنید و یادگیری خود را شروع کنید.</p>
                <a href="${window.location.origin}/courses" style="display: inline-block; padding: 10px 20px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                  مشاهده دوره‌ها
                </a>
              </div>
            `,
            type: 'welcome',
          },
        }).catch(err => console.error('Email send error:', err));
      }

      return { error: null };
    } catch (e: any) {
      return { error: { message: 'خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (e: any) {
      return { error: { message: 'خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید' } };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await fetch(
        `https://drthfkbvxqjhuurmxjrk.supabase.co/functions/v1/password-reset`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );
      
      const data = await response.json();
      if (!response.ok) return { error: data };
      return { error: null };
    } catch (e: any) {
      return { error: { message: 'خطای شبکه' } };
    }
  };

  const updatePassword = async (token: string, newPassword: string) => {
    try {
      const response = await fetch(
        `https://drthfkbvxqjhuurmxjrk.supabase.co/functions/v1/password-reset`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, newPassword }),
        }
      );
      
      const data = await response.json();
      if (!response.ok) return { error: data };
      return { error: null };
    } catch (e: any) {
      return { error: { message: 'خطای شبکه' } };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};