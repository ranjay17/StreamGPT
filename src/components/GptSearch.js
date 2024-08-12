import { BACKGROUND_IMG } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
  return (
    <>
    <div className="fixed -z-10">
            <img 
            className="h-screen object-cover md:h-screen md:w-screen"
            src={BACKGROUND_IMG}
            alt="logo"
            />
    </div>
    <div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
    </>
  )
}

export default GptSearch
