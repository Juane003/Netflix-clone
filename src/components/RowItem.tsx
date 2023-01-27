import { ImageBaseUrl } from "../api/api";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { Movie } from "../types";

interface RowItemProps {
  movie: Movie;
}

export const RowItem = ({ movie }: RowItemProps) => {
  const [like, setLike] = useState<boolean>(false);

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block object-cover "
        src={`${ImageBaseUrl}${movie?.backdrop_path}`}
        alt={movie?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {movie?.title}
        </p>
        <p onClick={() => setLike((prev) => !prev)}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};