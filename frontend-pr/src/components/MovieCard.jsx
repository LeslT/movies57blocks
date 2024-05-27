import { Link } from "react-router-dom";

export default function MovieCard({movie, isFavorite}) {
  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img src={`https://image.tmdb.org/t/p/w500//${movie.backdrop_path}`} alt={`Imagen de ${movie.original_title}`} 
            className="hover:scale-125 transition-transform hover:rotate-2"
        />
      </div>
      <div className="p-5">
        <Link className="text-2xl truncate font-black" >{movie.title}</Link>
      </div>
      <div>
      <button
          type="button"
          className="bg-green-400 hover:bg-green-500 mt-5 w-full p-3 font-bold text-white text-lg uppercase"
          onClick={()=>selectRecipe(drink.idDrink)}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}
