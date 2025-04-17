import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, Profile, UserRole } from '@/types';
import { signIn, signOut, getCurrentUser } from '@/api/auth';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loginWithEmail: (email: string, password: string, role: UserRole) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const token = localStorage.getItem('supabase.auth.token');
        if (token) {
          const userData = await getCurrentUser();
          if (userData) {
            setUser({
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              profilePicture: userData.profile_picture,
              bio: userData.bio,
              skills: userData.skills,
              createdAt: userData.created_at,
              coverPicture: userData.cover_picture,
              verified: userData.verified,
              availableUntil: userData.available_until,
              rating: userData.rating,
              totalRatings: userData.total_ratings,
            });
            setProfile(userData);
          }
        }
      } catch (error) {
        console.error('Error checking current user:', error);
        localStorage.removeItem('supabase.auth.token');
      } finally {
        setIsLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user: userData, session } = await signIn({ email, password });
      
      if (userData) {
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          profilePicture: userData.profile_picture,
          bio: userData.bio,
          skills: userData.skills,
          createdAt: userData.created_at,
          coverPicture: userData.cover_picture,
          verified: userData.verified,
          availableUntil: userData.available_until,
          rating: userData.rating,
          totalRatings: userData.total_ratings,
        });
        setProfile(userData);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loginWithEmail = async (email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user: userData, session } = await signIn({ email, password });
      
      if (userData) {
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          profilePicture: userData.profile_picture,
          bio: userData.bio,
          skills: userData.skills,
          createdAt: userData.created_at,
          coverPicture: userData.cover_picture,
          verified: userData.verified,
          availableUntil: userData.available_until,
          rating: userData.rating,
          totalRatings: userData.total_ratings,
        });
        setProfile(userData);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Google login initiated');
    } catch (error) {
      console.error('Google login error:', error);
      setError('Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('Password reset initiated for:', email);
      return Promise.resolve();
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Failed to send reset email');
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      console.log('User registration initiated:', { name, email, role });
      return Promise.resolve();
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Failed to register user');
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      console.log('Profile update initiated:', data);
      
      if (profile) {
        const updatedProfile = { ...profile, ...data };
        setProfile(updatedProfile);
        setUser(prev => prev ? {
          ...prev,
          ...data,
          profilePicture: updatedProfile.profile_picture,
          coverPicture: updatedProfile.cover_picture,
          availableUntil: updatedProfile.available_until,
          totalRatings: updatedProfile.total_ratings,
        } : null);
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error('Failed to update profile');
    }
  };

  const value = {
    user,
    profile,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    loginWithEmail,
    loginWithGoogle,
    resetPassword,
    registerWithEmail,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
