
import api from "../lib/axios";
import { isAxiosError } from "axios";

export async function getMovies(page) {
    try {
        const { data } = await api(`/movies/list?page=${page}`)
        return data.movies
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

