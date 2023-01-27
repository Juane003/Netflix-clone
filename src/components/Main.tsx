import { useEffect, useState } from "react";
import { API, ImageBaseUrl } from "../api/api";
import { Movie } from "../types";

export const Main = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await API.getPopular();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  return (
    <div className="text-white h-[550px] w-full">
      <div className="h-full w-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`${ImageBaseUrl}${randomMovie?.backdrop_path}`}
          alt={randomMovie?.title}
        />
      </div>
      <div className="absolute w-full top-[20%] p-4 ">
        <h1 className="text-4xl font-bold">{randomMovie?.title}</h1>
        <div className="my-4">
          <button className="px-5 py-2 text-black bg-stone-300">Play</button>
          <button className="border border-gray-300 px-5 py-2 ml-4">
            Watch Later
          </button>
        </div>
        <p className="text-sm text-gray-400">
          Released: {randomMovie?.release_date}
        </p>
        <p className="w-full text-gray-200 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">
          {randomMovie?.overview}
        </p>
      </div>
    </div>
  );
};
