import { ImageBaseUrl } from "../api/api";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { FirebaseMovie, Movie } from "../types";
import { getMovieRef } from "../firebase/db";
import { useAuthContext } from "../context/AuthContext";
import { arrayUnion, getDoc, updateDoc } from "firebase/firestore";

interface RowItemProps {
  movie: Movie;
  isLoading: boolean;
}

export const RowItem = ({ movie, isLoading }: RowItemProps) => {
  const [like, setLike] = useState<boolean>(false);

  const { currentUser } = useAuthContext();

  const movieRef = useMemo(() => {
    return getMovieRef(currentUser);
  }, []);

  useEffect(() => {
    const isMovieLiked = async () => {
      if (!movieRef) return;
      await getDoc(movieRef).then((doc) => {
        const res = doc
          .data()
          ?.savedShows.find(
            (currentMovie: FirebaseMovie) => currentMovie.id === movie.id
          );
        if (res) setLike(true);
      });
    };
    isMovieLiked();
  }, []);

  const saveMovie = async () => {
    if (!movieRef) return;

    setLike((prev) => !prev);

    await updateDoc(movieRef, {
      savedShows: arrayUnion({
        id: movie.id,
        title: movie.title,
        img: movie.backdrop_path,
        isLiked: like,
      }),
    });
  };

  return (
    <div className="relative inline-block w-[160px] cursor-pointer p-2 sm:w-[200px] md:w-[240px] lg:w-[280px]">
      {isLoading ? (
        <div className="h-32 text-white">Is Loading</div>
      ) : (
        <>
          <img
            className="block h-auto w-full object-cover "
            src={`${ImageBaseUrl}${movie?.backdrop_path}`}
            alt={movie?.title}
          />

          <div className="absolute top-0 left-0 h-full w-full text-white opacity-0 duration-300 hover:bg-black/80 hover:opacity-100">
            <p className="flex h-full items-center justify-center whitespace-normal p-2 text-center text-xs font-bold md:text-sm">
              {movie?.title}
            </p>
            <p onClick={saveMovie}>
              {like ? (
                <FaHeart className="absolute top-4 left-4 text-gray-300" />
              ) : (
                <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
