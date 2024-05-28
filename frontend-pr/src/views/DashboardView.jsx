import MovieCard from "../components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/MovieAPI";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Spinner from "../components/Spinner/Spinner";

export default function DashboardView() {
  const { data: userData } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["movies", currentPage],
    queryFn: ()=> getMovies(currentPage),
  });
  const handleBack = () => {
    setCurrentPage(currentPage-1)
  }
  const handleNext = () => {
    setCurrentPage(currentPage+1)
  }
  if(isLoading) return <Spinner/>

  if(data) return (
    <>
      <h1 className="text-6xl font-extrabold">Movies</h1>
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {data.results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={false}
              userData={userData}
            />
          ))}
        </div>
      )}
      <nav>
        <div className="flex justify-center">
          <button className="font-bold border pl-4 pr-4 ml-2 mr-2 bg-purple-400 hover:bg-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={currentPage===1 ? true : false} onClick={handleBack}>back</button>
          <p className="font-bold p-2">{data.page}</p>
          <button className="font-bold border pl-4 pr-4 ml-2 mr-2 bg-purple-400 hover:bg-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={currentPage=== data.total_pages ? true : false} onClick={handleNext}>next</button>
        </div>
      </nav>
    </>
  );
}
