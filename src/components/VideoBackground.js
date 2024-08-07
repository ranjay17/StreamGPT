import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({movieId}) => {
  console.log("movieId:", movieId)
  const movieTrailer = useSelector(store => store.movies?.movieTrailer);
  useMovieTrailer({movieId});
  return (
    <div>
        <iframe
            className=" w-screen aspect-video"
            src={"https://www.youtube.com/embed/" + movieTrailer?.key + "?&autoplay=1&mute=1"}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
    </div>
  )
}

export default VideoBackground
