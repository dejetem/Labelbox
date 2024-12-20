import axios from 'axios';
import { getToken, removeToken } from '../utils/auth';
import { Annotation, AuthResponse, Project, Image } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const auth = {
    login: (email: string, password: string) =>
        api.post<AuthResponse>('/auth/login/', { email, password }),
    register: (email: string, username: string, password: string) =>
        api.post('/auth/register/', { email, username, password }),
    refreshToken: (refresh: string) =>
        api.post<AuthResponse>('/auth/token/refresh/', { refresh }),
};

export const projects = {
    list: () => api.get<Project[]>('/api/projects/'),
    create: (data: { name: string; description: string }) =>
        api.post<Project>('/api/projects/', data),
    get: (id: number) => api.get<Project>(`/api/projects/${id}/`),
    delete: (id: number) => api.delete(`/api/projects/${id}/`),
};

export const images = {
    upload: (projectId: number, file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('project_id', projectId.toString());
        return api.post<Image>('/api/images/upload/', formData);
    },
    list: (projectId: number) =>
        api.get<Image[]>(`/api/images/?project=${projectId}`),
    delete: (id: number) => api.delete(`/api/images/${id}/`),
};

export const annotations = {
    create: (data: { image: number; data: string }) =>
        api.post<Annotation>('/api/annotations/', data),
    list: (imageId: number) =>
        api.get<Annotation[]>(`/api/annotations/?image=${imageId}`),
    update: (id: number, data: { data: string }) =>
        api.patch<Annotation>(`/api/annotations/${id}/`, data),
};

export default api;