import MovieCard from "../components/MovieCard"
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/MovieAPI";


export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
  console.log(data)
  return (
    <>
      <h1 className="text-6xl font-extrabold">Movies</h1>
      {data && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10"
        >
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isFavorite={false} />
          ))}
        </div>
      )}
    </>
  );
}
