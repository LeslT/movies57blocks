import api from '../lib/axios'
import { isAxiosError } from 'axios'

export async function getFavorites(dataUser) {
    try {
        const { data } = await api(`/users/favorites/${dataUser.user._id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateUser({favorites, userData} ) {
    try {
        console.log(favorites, userData)
        const { data } = await api.patch(`/users/${userData.user._id}`, favorites)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
