import { useMutation } from "@tanstack/react-query";
import { Link, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { updateUser } from "../api/UserAPI";

export default function MovieCard({movie, isFavorite}) {
  const { data: userId} = useAuth()

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data.message)
    }
  })

  const removeFromFavorites = () => {      
    const data = {
    movie,
    userId
  }
  mutate(data) }
  const addToFavorites = (formData) => {  
    const data = {
      movie,
      userId
    }
    mutate(data) 
  }

  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img src={`https://image.tmdb.org/t/p/w500//${movie.backdrop_path}`} alt={`Imagen de ${movie.original_title}`} 
            className="hover:scale-125 transition-transform hover:rotate-2"
        />
      </div>
      <div className="p-5">
        <Link to={`/details/${movie.id}`} className="text-2xl truncate font-black" >{movie.title}</Link>
      </div>
      <div>
      <button
          type="button"
          className={ isFavorite ? "bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg uppercase" : "bg-green-400 hover:bg-green-500 mt-5 w-full p-3 font-bold text-white text-lg uppercase" }
          onClick={ isFavorite ? removeFromFavorites : addToFavorites }
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}
