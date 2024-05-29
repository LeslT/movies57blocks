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
        const { data } = await api.post(url, formData)
        localStorage.setItem('AUTH_TOKEN', data.token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser(){
    try {
        const { data } = await api.get('/auth/user')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserAuth(){
    try {
        const { data } = await api.get('/auth/userauth')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}