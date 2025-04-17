
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, Profile, UserRole } from '@/types';
import { signIn, signOut, getCurrentUser } from '@/api/auth';
import { toast } from '@/components/ui/use-toast';

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
          // Check if we have a demo user in localStorage
          const demoUser = localStorage.getItem('demo_user');
          if (demoUser) {
            const userData = JSON.parse(demoUser);
            setUser(userData);
            setProfile({
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              profile_picture: userData.profilePicture,
              bio: userData.bio,
              skills: userData.skills,
              created_at: userData.createdAt,
              cover_picture: userData.coverPicture,
              verified: userData.verified,
              available_until: userData.availableUntil,
              rating: userData.rating,
              total_ratings: userData.totalRatings,
            });
            return;
          }
          
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

      // For demo purposes when backend is not available
      if (email === "demo@example.com" && password === "password123") {
        const demoUser = createDemoUser();
        setUser(demoUser);
        setProfile({
          id: demoUser.id,
          name: demoUser.name,
          email: demoUser.email,
          role: demoUser.role,
          profile_picture: demoUser.profilePicture,
          bio: demoUser.bio,
          skills: demoUser.skills,
          created_at: demoUser.createdAt,
          cover_picture: demoUser.coverPicture,
          verified: demoUser.verified,
          available_until: demoUser.availableUntil,
          rating: demoUser.rating,
          total_ratings: demoUser.totalRatings,
        });
        localStorage.setItem('supabase.auth.token', 'demo_token');
        localStorage.setItem('demo_user', JSON.stringify(demoUser));
        toast({
          title: "Demo login successful",
          description: "You're now using the app with a demo account",
        });
        return;
      }

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
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Check if it's a demo user
      if (localStorage.getItem('demo_user')) {
        localStorage.removeItem('demo_user');
        localStorage.removeItem('supabase.auth.token');
        setUser(null);
        setProfile(null);
        return;
      }
      
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
      
      // For demo purposes when backend is not available
      if (email === "demo@example.com" && password === "password123") {
        const demoUser = createDemoUser(role);
        setUser(demoUser);
        setProfile({
          id: demoUser.id,
          name: demoUser.name,
          email: demoUser.email,
          role: demoUser.role,
          profile_picture: demoUser.profilePicture,
          bio: demoUser.bio,
          skills: demoUser.skills,
          created_at: demoUser.createdAt,
          cover_picture: demoUser.coverPicture,
          verified: demoUser.verified,
          available_until: demoUser.availableUntil,
          rating: demoUser.rating,
          total_ratings: demoUser.totalRatings,
        });
        localStorage.setItem('supabase.auth.token', 'demo_token');
        localStorage.setItem('demo_user', JSON.stringify(demoUser));
        toast({
          title: "Demo login successful",
          description: "You're now using the app with a demo account",
        });
        return;
      }
      
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
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In demo mode, create a demo Google user
      const demoGoogleUser = createDemoUser('freelancer', true);
      setUser(demoGoogleUser);
      setProfile({
        id: demoGoogleUser.id,
        name: demoGoogleUser.name,
        email: demoGoogleUser.email,
        role: demoGoogleUser.role,
        profile_picture: demoGoogleUser.profilePicture,
        bio: demoGoogleUser.bio,
        skills: demoGoogleUser.skills,
        created_at: demoGoogleUser.createdAt,
        cover_picture: demoGoogleUser.coverPicture,
        verified: demoGoogleUser.verified,
        available_until: demoGoogleUser.availableUntil,
        rating: demoGoogleUser.rating,
        total_ratings: demoGoogleUser.totalRatings,
      });
      localStorage.setItem('supabase.auth.token', 'demo_google_token');
      localStorage.setItem('demo_user', JSON.stringify(demoGoogleUser));
      
      toast({
        title: "Demo Google login",
        description: "You're signed in with a simulated Google account",
      });
    } catch (error) {
      console.error('Google login error:', error);
      setError('Failed to login with Google');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Just simulate success in demo mode
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for the reset link (demo mode)",
      });
      return Promise.resolve();
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Failed to send reset email');
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // Create a new demo user for registration
      const demoUser = {
        id: `demo-${Date.now()}`,
        name,
        email,
        role,
        profilePicture: null,
        bio: '',
        skills: [],
        createdAt: new Date().toISOString(),
        coverPicture: null,
        verified: false,
        availableUntil: null,
        rating: 0,
        totalRatings: 0
      };
      
      localStorage.setItem('supabase.auth.token', 'demo_registration_token');
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      
      setUser(demoUser);
      setProfile({
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
        profile_picture: demoUser.profilePicture,
        bio: demoUser.bio,
        skills: demoUser.skills,
        created_at: demoUser.createdAt,
        cover_picture: demoUser.coverPicture,
        verified: demoUser.verified,
        available_until: demoUser.availableUntil,
        rating: demoUser.rating,
        total_ratings: demoUser.totalRatings,
      });
      
      toast({
        title: "Registration successful",
        description: "Your account has been created (demo mode)",
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Failed to register user');
    } finally {
      setIsLoading(false);
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
        
        // Update demo user in localStorage if it exists
        const demoUser = localStorage.getItem('demo_user');
        if (demoUser) {
          const parsedUser = JSON.parse(demoUser);
          localStorage.setItem('demo_user', JSON.stringify({
            ...parsedUser,
            ...data
          }));
        }
        
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated",
        });
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error('Failed to update profile');
    }
  };

  // Helper function to create a demo user
  const createDemoUser = (role: UserRole = 'freelancer', isGoogle = false) => {
    return {
      id: 'demo-user-id',
      name: isGoogle ? 'Google Demo User' : 'Demo User',
      email: 'demo@example.com',
      role: role,
      profilePicture: null,
      bio: 'This is a demo user account for testing purposes.',
      skills: ['JavaScript', 'React', 'Node.js'],
      createdAt: new Date().toISOString(),
      coverPicture: null,
      verified: isGoogle,
      availableUntil: null,
      rating: 4.5,
      totalRatings: 10
    };
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
