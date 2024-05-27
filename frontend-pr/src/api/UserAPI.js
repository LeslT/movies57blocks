import api from '../lib/axios'
import { isAxiosError } from 'axios'

export async function getFavorites(userId) {
    try {
        const { data } = await api(`/users/favorites/${userId.id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}