import { useMemo } from "react";
import { ImageBaseUrl } from "../api/api";
import { Movie } from "../types";

interface MainProps {
  movies: Movie[];
}

export const Main = ({ movies }: MainProps) => {
  const randomMovie = useMemo(() => {
    return movies[Math.floor(Math.random() * movies.length)];
  }, []);

  return (
    <div className="h-[550px] w-full text-white">
      <div className="h-full w-full">
        <div className="absolute h-[550px] w-full bg-gradient-to-r from-black"></div>
        <img
          className="h-full w-full object-cover"
          src={`${ImageBaseUrl}${randomMovie.backdrop_path}`}
          alt={randomMovie?.title}
        />
      </div>
      <div className="absolute top-[20%] w-full p-4 ">
        <h1 className="text-4xl font-bold">{randomMovie.title}</h1>
        <div className="my-4">
          <button className="bg-stone-300 px-5 py-2 text-black">Play</button>
          <button className="ml-4 border border-gray-300 px-5 py-2">
            Watch Later
          </button>
        </div>
        <p className="text-sm text-gray-400">
          Released: {randomMovie.release_date}
        </p>
        <p className="w-full text-gray-200 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
          {randomMovie.overview}
        </p>
      </div>
    </div>
  );
};
