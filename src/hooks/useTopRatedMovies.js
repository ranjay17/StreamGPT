import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import {addTopRatedMovies} from "../utils/moviesSlice";

const useTopRatedMovies = () =>{
  const topRatedMovies = useSelector(store=>store.movies.topRatedMovies);
    // fetch data from TMDB API and update store
    const dispatch = useDispatch();
    
    const getTopRatedMovies = async() =>{
    const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1", API_OPTIONS);
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  }
  useEffect(()=>{
    if(!topRatedMovies){
    getTopRatedMovies()
    }
  },[]);
}

export default useTopRatedMovies;