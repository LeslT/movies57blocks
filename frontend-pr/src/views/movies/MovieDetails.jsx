import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../api/MovieAPI";
import Spinner from "../../components/Spinner/Spinner";


export default function MovieDetails() {
  const params = useParams();
  const movieId = params.movieId;

  const { data, isError, error,isLoading } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieById(movieId),
    retry: false
})
  if(isLoading) return <Spinner/>
  if(data) return (
    <>
      <h1 className="text-6xl font-extrabold">Movie Details</h1>
      <div className="text-center flex flex-col justify-between gap-3">
        <h1 className="text-4xl font-extrabold text-center text-purple-950 mt-10">
          {data.movie.original_title}
        </h1>
        <div className="overflow-hidden grid place-items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500//${data.movie.backdrop_path}`}
            alt={`Imagen de ${data.movie.original_title}`}
            className="object-center"
          />
        </div>
        <div className="text-left text-lg">
          <div className="flex flex-row gap-4 ">
            <p className="text-purple-950 text-bold text-2xl">Description:</p>
            <p>{data.movie.overview}</p>
          </div>
          <div className="flex flex-row gap-4 ">
            <p className="text-purple-950 text-bold text-2xl">Genres:</p>
            {data.movie.genres.map(genre => (
              <div key={genre.id}>
                <p  >{genre.name},</p>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-4 ">
            <p className="text-purple-950 text-bold text-2xl">Age:</p>
            <p>{data.movie.adult ? "Adults only" : "For everyone"}</p>
          </div>

        </div>
      </div>
    </>
  );
}
