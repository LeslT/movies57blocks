import api from '../lib/axios'
import { isAxiosError } from 'axios'

export async function createAccount(formData){
    try {
        const url = 'auth/register'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function authenticateUser(formData){
    try {
        const url = 'auth/login'
        const { data } = await api.pos(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
