import { Link } from "react-router-dom";

export default function MovieCard(movie) {
  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img src={movie.backdrop_path} alt={`Imagen de ${movie.original_title}`} 
            className="hover:scale-125 transition-transform hover:rotate-2"
        />
      </div>
      <div className="p-5">
        <Link className="text-2xl truncate font-black" >{movie.title}</Link>
      </div>
    </div>
  );
}
