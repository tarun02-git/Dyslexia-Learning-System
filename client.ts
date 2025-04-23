import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (username: string, password: string) => {
    const response = await api.post('/login', { username, password });
    return response.data;
  },
  
  register: async (username: string, password: string) => {
    const response = await api.post('/register', { username, password });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  
  updateProfile: async (data: any) => {
    const response = await api.post('/profile', data);
    return response.data;
  },
};

export const content = {
  getRecommendations: async () => {
    const response = await api.get('/recommendations');
    return response.data.recommendations;
  },
  
  getContent: async (contentId: string) => {
    const response = await api.get(`/content/${contentId}`);
    return response.data;
  },

  getAllContent: async () => {
    const response = await api.get('/content');
    return response.data;
  },
};

export const analytics = {
  getPersonalizedReport: async () => {
    const response = await api.get('/analytics/report/personalized');
    return response.data.report;
  },
  
  getOverallAnalytics: async () => {
    const response = await api.get('/analytics/report/overall');
    return response.data.overall_report;
  },
  
  recordPerformance: async (activityType: string, metrics: any) => {
    const response = await api.post('/performance', { activity_type: activityType, metrics });
    return response.data;
  },
};

export const accessibility = {
  textToSpeech: async (text: string) => {
    const response = await api.post('/tts', { text });
    return response.data;
  },
  
  speechToText: async () => {
    const response = await api.post('/stt');
    return response.data;
  },
};

export default api;