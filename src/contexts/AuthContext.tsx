import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUpWithPhone: (phone: string, firstName: string, lastName: string, password: string) => Promise<{ error: any }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ error: any }>;
  signInWithPhone: (phone: string) => Promise<{ error: any }>;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (mounted) {
          console.log('Auth state change:', event, !!session);
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        console.log('Initial session:', !!session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUpWithPhone = async (phone: string, firstName: string, lastName: string, password: string) => {
    console.log('AuthContext: signUpWithPhone called with:', { phone, firstName, lastName });
    
    const displayName = `${firstName} ${lastName}`.trim();
    
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phone,
      options: {
        data: {
          display_name: displayName,
          first_name: firstName,
          last_name: lastName
        }
      }
    });
    
    console.log('AuthContext: signUpWithPhone response:', { 
      error: error?.message 
    });
    
    return { error };
  };

  const signInWithPhone = async (phone: string) => {
    console.log('AuthContext: signInWithPhone called with:', { phone });
    
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phone
    });
    
    console.log('AuthContext: signInWithPhone response:', { 
      error: error?.message 
    });
    
    return { error };
  };

  const verifyOtp = async (phone: string, otp: string) => {
    console.log('AuthContext: verifyOtp called with:', { phone, otp: otp ? '***' : 'empty' });
    
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: otp,
      type: 'sms'
    });
    
    console.log('AuthContext: verifyOtp response:', { 
      user: data?.user?.id ? 'found' : 'not found', 
      session: data?.session ? 'found' : 'not found',
      error: error?.message 
    });
    
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUpWithPhone,
    signInWithPhone,
    verifyOtp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};