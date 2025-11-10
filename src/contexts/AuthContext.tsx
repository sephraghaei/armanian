import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AppUser {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signUp: (phone: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>;
  signIn: (phone: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
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
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // بررسی توکن ذخیره شده
    const token = localStorage.getItem('app_token');
    const userStr = localStorage.getItem('app_user');
    
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        checkAdminStatus(userData.id);
      } catch (e) {
        localStorage.removeItem('app_token');
        localStorage.removeItem('app_user');
      }
    }
    
    setLoading(false);
  }, []);

  const checkAdminStatus = async (userId?: string) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    
    // فعلاً admin check غیرفعال است - بعداً باید به users_app اضافه شود
    setIsAdmin(false);
  };

  const signUp = async (phone: string, password: string, firstName: string, lastName: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('auth-register', {
        body: { 
          phone,
          password,
          firstName,
          lastName
        }
      });

      if (error) throw error;
      
      const responseData = await data;
      if (responseData.error) {
        return { error: { message: responseData.error } };
      }

      // ذخیره توکن و اطلاعات کاربر
      if (responseData.token && responseData.user) {
        localStorage.setItem('app_token', responseData.token);
        localStorage.setItem('app_user', JSON.stringify(responseData.user));
        setUser(responseData.user);
        checkAdminStatus(responseData.user.id);
      }

      return { error: null };
    } catch (e: any) {
      return { error: { message: e.message || 'خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید' } };
    }
  };

  const signIn = async (phone: string, password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('auth-login', {
        body: { phone, password }
      });

      if (error) throw error;
      
      const responseData = await data;
      if (responseData.error) {
        return { error: { message: responseData.error } };
      }

      // ذخیره توکن و اطلاعات کاربر
      if (responseData.token && responseData.user) {
        localStorage.setItem('app_token', responseData.token);
        localStorage.setItem('app_user', JSON.stringify(responseData.user));
        setUser(responseData.user);
        checkAdminStatus(responseData.user.id);
      }

      return { error: null };
    } catch (e: any) {
      return { error: { message: e.message || 'خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید' } };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('app_token');
    localStorage.removeItem('app_user');
    setUser(null);
    setIsAdmin(false);
    return { error: null };
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};