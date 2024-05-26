import { useState } from "react"
import MovieCard from "../../components/MovieCard"

export default function MovieDetails() {
  const [data , setData]  = useState([])
  return (
    <>
    {
      data && (
        data.map( movie => 
            <MovieCard/>
          )
      )
    }
      
    </>
  )
}
