import { BACKGROUND_IMG } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
  return (
    <div>
        <div>
            <img 
            className="fixed -z-10"
            src={BACKGROUND_IMG}
            alt="logo"
            />
        </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch
