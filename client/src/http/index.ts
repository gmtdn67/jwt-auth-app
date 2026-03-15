import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = 'https://jwt-auth-htqxgc306-gmt9ns-projects.vercel.app/'

const $api = axios.create({
    withCredentials: true,          // чтобы cookie цеплялись к каждому запросу
    baseURL: API_URL
})

// каждый запрос будет содеражть в куках access token
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, // если сервер возвращеает ошибку
async (error) => {   
    // сохраняем исходный запрос
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response.data.accessToken)
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (error) {
            console.log('Не авторизован!')
        }
    }
    throw error;
})

export default $api;