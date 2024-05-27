import { useParams } from "react-router-dom";


export default function MovieDetails() {
  const params = useParams();
  const movieId = params.movieId;
  return (
    <>
      <h1 className="text-6xl font-extrabold">Movie Details</h1>

    </>
  )
}
