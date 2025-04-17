
import apiClient from './client';
import { UserRole } from '@/types';

export const signUp = async (userData: {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}) => {
  const response = await apiClient.post('/auth/signup', userData);
  return response.data;
};

export const signIn = async (credentials: { email: string; password: string }) => {
  const response = await apiClient.post('/auth/signin', credentials);
  
  // Store the token in localStorage
  if (response.data.session?.access_token) {
    localStorage.setItem('supabase.auth.token', response.data.session.access_token);
  }
  
  return response.data;
};

export const signOut = async () => {
  const response = await apiClient.post('/auth/signout');
  
  // Remove the token from localStorage
  localStorage.removeItem('supabase.auth.token');
  
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

export const resetPassword = async (email: string) => {
  const response = await apiClient.post('/auth/reset-password', { email });
  return response.data;
};

export const googleAuth = async () => {
  const response = await apiClient.get('/auth/google');
  return response.data;
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  const response = await apiClient.put(`/users/${userId}/profile`, profileData);
  return response.data;
};
