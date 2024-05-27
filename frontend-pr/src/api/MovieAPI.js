
import api from "../lib/axios";
import { isAxiosError } from "axios";

export async function getMovies() {
    try {
        const { data } = await api('/movies/list')
        return data.movies.results
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

export async function addMovieToFavorites(formData, movieId ) {
    try {
        const { data } = await api.put(`/movies/${movieId}`, formData)
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
        return data.movies.results
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}