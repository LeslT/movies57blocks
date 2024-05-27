import { getFavorites } from "../../api/UserAPI";
import MovieCard from "../../components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";


export default function FavoriteMovies() {
  const { data: userId, isError } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: getFavorites(userId),
    retry: false
  });
  
  return (
    <>
      <h1 className="text-6xl font-extrabold">Favorites</h1>
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isFavorite={true}/>
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          Your Favorite movies will be here
        </p>
      )}
    </>
  );
}
