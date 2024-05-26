
import api from "../lib/axios";
import { isAxiosError } from "axios";

export async function getMovies() {
    try {
        const { data } = await api('/movies')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
    
}

export async function getMovieById(id) {
    try {
        const { data } = await api(`/movies/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function addMovieToFavorites(formData, projectId ) {
    try {
        const { data } = await api.put(`/movies/${projectId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteMovieFromFavorites(id) {
    try {
        const { data } = await api.delete(`/movies/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}