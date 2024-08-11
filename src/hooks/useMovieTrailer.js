import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addMovieTrailer } from "../utils/moviesSlice";

const useMovieTrailer = ({movieId}) =>{
  const movieTrailer = useSelector(store=>store.movies.movieTrailer);
    const dispatch = useDispatch();
    // fetch movieTrailer video and upating the store with movie trailer
    const getMovieVideos = async() =>{
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
    const json = await data.json();

    const filterData = json.results.filter(video => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addMovieTrailer(trailer))
  }
  useEffect(()=>{
    if (!movieTrailer){
    getMovieVideos()
    }
  },[]);
}

export default useMovieTrailer