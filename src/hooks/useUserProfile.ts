import { useEffect, useState } from 'react';

interface AppUser {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
}

interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
}

export const useUserProfile = (user: AppUser | null) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    // برای users_app مستقیماً از اطلاعات user استفاده می‌کنیم
    setProfile({
      id: user.id,
      display_name: `${user.first_name} ${user.last_name}`,
      avatar_url: null,
      phone: user.phone,
      first_name: user.first_name,
      last_name: user.last_name,
    });
    setLoading(false);
  }, [user]);

  return { profile, loading };
};
