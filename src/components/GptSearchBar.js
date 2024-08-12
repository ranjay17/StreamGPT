import languageConstants from "../utils/languageConstants"
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import client from "../utils/openai"
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const searchText = useRef(null);
  const language = useSelector(store=>store.config.language);

  const searchMovies = async(movie) =>{
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + 
      movie + 
      "&include_adult=false&language=en-US&page=1", API_OPTIONS);
      const json = await data.json();

      return json.results;
  }
  const handleGptSearch = async() =>{
    console.log(searchText.current.value);
    // Make an API call to GPT API to Fetch the movie result

    const gptQuery = "Act as a Movie Recommendation sysyem and suggest some movies for the query:" + 
    searchText.current.value + 
    ". only give me names of 5 movies, comma separated like the example given ahead. Example Result: Raaz, Gadar, Welcome, Singham, Koi Mil Gaya";

    const gptResult = await client.chat.completions.create({
    messages: [{ role: 'user', content: gptQuery }],
    model: 'gpt-3.5-turbo',
  });
  if(!gptResult.choices){
    navigate("/error")
  }

   // to convert it into array
   const gptMovies = gptResult.choices[0]?.message?.content.split(",");

   // for each movie i will search the TMDB API
   const promiseArray = gptMovies.map((movie)=> searchMovies(movie));

   const tmdbResults = await Promise.all(promiseArray);
   console.log(tmdbResults);
   dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
  }
  return (
   <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}>
        <input
        ref={searchText} 
        type="text" 
        className="p-4 m-4 col-span-9" 
        placeholder={languageConstants[language].gptSearchPlaceholder}
        />
        <button className="py-2 px-4 m-4 bg-red-700 col-span-3 text-white rounded-lg" onClick={handleGptSearch}>
          {languageConstants[language].search}
          </button>
      </form>
    </div>
  )
}

export default GptSearchBar
