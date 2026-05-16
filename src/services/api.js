import axios from 'axios';

// Base URL بتاع الـ Backend (السيرفر)
const BASE_URL = 'http://YOUR_API_URL_HERE';

// إنشاء instance (نسخة) من axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 ثواني
  headers: {
    'Content-Type': 'application/json',
  },
});

// =====================
// Auth (تسجيل الدخول)
// =====================
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// =====================
// Robot Arm (الذراع الروبوتية)
// =====================

// جلب حالة الذراع
export const getRobotStatus = async () => {
  try {
    const response = await api.get('/robot/status');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// إرسال أمر للذراع
export const sendRobotCommand = async (command) => {
  try {
    const response = await api.post('/robot/command', { command });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;