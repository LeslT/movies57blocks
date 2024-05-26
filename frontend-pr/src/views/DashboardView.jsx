import { useState } from "react"
import MovieCard from "../components/MovieCard"

export default function DashboardView() {
  const [data , setData]  = useState([])
  return (
    <>
    {
      data && (
        data.map( movie => 
            <MovieCard movie={movie} />
          )
      )
    }
      
    </>
  )
}
