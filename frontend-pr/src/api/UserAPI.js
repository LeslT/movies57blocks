import api from '../lib/axios'
import { isAxiosError } from 'axios'

export async function getFavorites(userId) {
    try {
        const { data } = await api(`/users/favorites/${userId.id}`)
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateUser(formData, movieId ) {
    try {
        const { data } = await api.put(`/movies/${movieId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
