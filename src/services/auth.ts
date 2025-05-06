import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'; // Replace with your actual API URL

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    user_id: string;
    email: string;
    name: string;
    role: string;
    [key: string]: any;
  };
}

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, payload);
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};