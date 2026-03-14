import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
    user = {} as IUser
    isAuth = false;
    isLoading = false;
    emailError: string | null = null;
    passwordError: string | null = null;
    generalError: string | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    setEmailError(error: string | null) {
        this.emailError = error
    }

    setPasswordError(error: string | null) {
        this.passwordError = error
    }

    setGeneralError(error: string | null) {
        this.generalError = error
    }

    clearErrors() {
        this.emailError = null
        this.passwordError = null
        this.generalError = null
    }

    private parseError(message: string): { emailError: string | null; passwordError: string | null } {
        const lowerMessage = message.toLowerCase()
        
        if (lowerMessage.includes('не найден') || lowerMessage.includes('not found')) {
            return { emailError: message, passwordError: null }
        }
        
        if (lowerMessage.includes('неверный пароль') || lowerMessage.includes('wrong password') || (lowerMessage.includes('неверный') && lowerMessage.includes('пароль'))) {
            return { emailError: null, passwordError: message }
        }
        
        if (lowerMessage.includes('существует') || lowerMessage.includes('exists')) {
            return { emailError: message, passwordError: null }
        }
        
        // Если ошибка не специфична, показываем на обоих полях
        return { emailError: null, passwordError: message }
    }

    async login(email: string, password: string) {
        try {
            this.clearErrors()
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.clearErrors()
        } catch (e: any) {
            const errorMessage = e.response?.data?.message || 'Ошибка при входе'
            const parsedErrors = this.parseError(errorMessage)
            this.setEmailError(parsedErrors.emailError)
            this.setPasswordError(parsedErrors.passwordError)
            console.log(errorMessage)
        }
    }

    async registartion(email: string, password: string) {
        try {
            this.clearErrors()
            const response = await AuthService.registration(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.clearErrors()
        } catch (e: any) {
            const errorMessage = e.response?.data?.message || 'Ошибка при регистрации'
            const parsedErrors = this.parseError(errorMessage)
            this.setEmailError(parsedErrors.emailError)
            this.setPasswordError(parsedErrors.passwordError)
            console.log(errorMessage)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            console.log(response)
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            this.setLoading(true)
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }
}