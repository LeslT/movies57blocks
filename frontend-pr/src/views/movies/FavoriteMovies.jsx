
import MovieCard from "../../components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../api/UserAPI";
import { getUser } from "../../api/AuthAPI";


export default function FavoriteMovies() {
    const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false
})

  const { data } = useQuery({
    queryKey: ["favorites", user],
    queryFn: () => getFavorites(user),
    retry: false
  });


  return (
    <>
      <h1 className="text-6xl font-extrabold">Favorites</h1>
      {data ? data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isFavorite={true} userData={user}/>
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          Your Favorite movies will be here
        </p>
      ) : (
        <p className="my-10 text-center text-2xl">
          Your Favorite movies will be here
        </p>
      ) }
    </>
  );
}
