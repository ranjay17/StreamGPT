import MovieList from "./MovieList"
import {useSelector} from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies)
  return (
    movies.nowPlayingMovies && (
    <div className="bg-black">
      <div className="-mt-80 relative z-20">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      <MovieList title={"Trending"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Horror"} movies={movies.nowPlayingMovies}/>
       </div>
      {
        /*
        Movie List - trending
            MovieCard * n
        MovieList - popular
        MovieList - Now Playing
        MovieList - Horror
        */
      }
      
    </div>)
  )
}

export default SecondaryContainer
