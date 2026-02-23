import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Clear tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/token/', { email, password }),
  
  refresh: (refresh: string) =>
    api.post('/auth/token/refresh/', { refresh }),
  
  verify: (token: string) =>
    api.post('/auth/token/verify/', { token }),
  
  register: (data: {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    phone?: string;
    company_name?: string;
    password: string;
    password_confirm: string;
  }) => api.post('/accounts/register/', data),
  
  getProfile: () => api.get('/accounts/profile/'),
  
  updateProfile: (data: any) => api.patch('/accounts/profile/update/', data),
  
  changePassword: (data: {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
  }) => api.post('/accounts/password/change/', data),
  
  getStats: () => api.get('/accounts/stats/'),
  
  toggleLanguage: () => api.post('/accounts/language/toggle/'),
};

// Core API
export const coreAPI = {
  getSiteContent: (lang?: string) =>
    api.get('/core/content/', { params: { lang } }),
  
  getHero: () => api.get('/core/hero/'),
  
  getServices: () => api.get('/core/services/'),
  
  getTeam: () => api.get('/core/team/'),
  
  getAbout: () => api.get('/core/about/'),
  
  getContactInfo: () => api.get('/core/contact-info/'),
  
  sendContactMessage: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => api.post('/core/contact/', data),
  
  // Admin endpoints
  createHero: (data: any) => api.post('/core/admin/hero/', data),
  updateHero: (id: number, data: any) => api.patch(`/core/admin/hero/${id}/`, data),
  deleteHero: (id: number) => api.delete(`/core/admin/hero/${id}/`),
  
  createService: (data: any) => api.post('/core/admin/services/', data),
  updateService: (id: number, data: any) => api.patch(`/core/admin/services/${id}/`, data),
  deleteService: (id: number) => api.delete(`/core/admin/services/${id}/`),
  
  createTeamMember: (data: any) => api.post('/core/admin/team/', data),
  updateTeamMember: (id: number, data: any) => api.patch(`/core/admin/team/${id}/`, data),
  deleteTeamMember: (id: number) => api.delete(`/core/admin/team/${id}/`),
};

// Portfolio API
export const portfolioAPI = {
  getCategories: () => api.get('/portfolio/categories/'),
  
  getProjects: (params?: {
    category?: string;
    status?: string;
    featured?: boolean;
    tech?: string;
    search?: string;
  }) => api.get('/portfolio/projects/', { params }),
  
  getFeaturedProjects: () => api.get('/portfolio/projects/featured/'),
  
  getProject: (slug: string) => api.get(`/portfolio/projects/${slug}/`),
  
  getRelatedProjects: (slug: string) => api.get(`/portfolio/projects/${slug}/related/`),
  
  getTestimonials: (projectSlug: string) =>
    api.get(`/portfolio/projects/${projectSlug}/testimonials/`),
  
  getStats: () => api.get('/portfolio/stats/'),
  
  // Admin endpoints
  createCategory: (data: any) => api.post('/portfolio/admin/categories/', data),
  updateCategory: (slug: string, data: any) =>
    api.patch(`/portfolio/admin/categories/${slug}/`, data),
  deleteCategory: (slug: string) => api.delete(`/portfolio/admin/categories/${slug}/`),
  
  createProject: (data: any) => api.post('/portfolio/admin/projects/', data),
  updateProject: (id: number, data: any) =>
    api.patch(`/portfolio/admin/projects/${id}/`, data),
  deleteProject: (id: number) => api.delete(`/portfolio/admin/projects/${id}/`),
};

// Messaging API
export const messagingAPI = {
  getConversations: () => api.get('/messaging/conversations/'),
  
  createConversation: (data: { subject: string; initial_message: string }) =>
    api.post('/messaging/conversations/create/', data),
  
  getConversation: (id: number) => api.get(`/messaging/conversations/${id}/`),
  
  getMessages: (conversationId: number) =>
    api.get(`/messaging/conversations/${conversationId}/messages/`),
  
  sendMessage: (data: { conversation: number; content: string; attachment?: File }) =>
    api.post('/messaging/messages/send/', data),
  
  markMessageRead: (messageId: number) =>
    api.post(`/messaging/messages/${messageId}/read/`),
  
  getNotifications: () => api.get('/messaging/notifications/'),
  
  markNotificationRead: (id: number) =>
    api.patch(`/messaging/notifications/${id}/read/`),
  
  markAllNotificationsRead: () =>
    api.post('/messaging/notifications/read-all/'),
  
  getUnreadCounts: () => api.get('/messaging/unread-counts/'),
  
  // Admin endpoints
  getAllConversations: () => api.get('/messaging/admin/conversations/'),
  
  adminReply: (data: { conversation: number; content: string }) =>
    api.post('/messaging/admin/messages/send/', data),
};

export default api;
