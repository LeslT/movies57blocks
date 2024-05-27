import { useState } from "react"
import MovieCard from "../components/MovieCard"
import { useAuth } from "../hooks/useAuth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMovies } from "../api/MovieAPI";


export default function DashboardView() {
  const { data: user, isLoading: authLoading } = useAuth();

  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
  
  return (
    <>
    {
      data && (
        data.map( movie => 
          <div key={movie.id}>
            <MovieCard movie={movie} isFavorite={false} />
          </div>
            
          )
      )
    }
      
    </>
  )
}
