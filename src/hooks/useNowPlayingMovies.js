import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () =>{
  const nowPlayingMovies = useSelector(store=>store.movies.nowPlayingMovies)
    // fetch data from TMDB API and update store
  const dispatch = useDispatch();
  const getNowPlayingMovies = async() =>{
    const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTIONS);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  }
  useEffect(()=>{
    if(!nowPlayingMovies){
    getNowPlayingMovies()
    }
  },[]);
}

export default useNowPlayingMovies;