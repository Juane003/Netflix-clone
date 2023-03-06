import { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { ImageBaseUrl } from "../api/api";
import { useAuthContext } from "../context/AuthContext";
import { getMovieRef, onMovieSnapshot } from "../firebase/db";
import { updateDoc } from "firebase/firestore";
import { FirebaseMovie } from "../types";

export const SavedShows = () => {
  const [movies, setMovies] = useState<FirebaseMovie[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    onMovieSnapshot(currentUser, (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [currentUser?.email]);

  const handleSlideRight = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft += 500;
  };
  const handleSlideLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft -= 500;
  };

  const movieRef = getMovieRef(currentUser);

  const handleDeleteShow = async (id: string | number) => {
    if (!movieRef) return;
    const newMovies = movies.filter((movie) => movie.id !== id);
    await updateDoc(movieRef, {
      savedShows: newMovies,
    });
  };

  return (
    <div className="px-8">
      <h1 className="py-2 pl-4 text-xl font-bold text-white">Saved Shows</h1>
      <div className="group relative flex items-center">
        <MdChevronLeft
          onClick={handleSlideLeft}
          size={40}
          className="absolute left-0 z-10 hidden rounded-full bg-white opacity-50 duration-300 hover:opacity-100 group-hover:block"
        />
        <div
          ref={sliderRef}
          className="relative h-full w-full overflow-hidden scroll-smooth whitespace-nowrap"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative inline-block w-[160px] cursor-pointer p-2 sm:w-[200px] md:w-[240px] lg:w-[280px]"
            >
              <img
                className="block h-auto w-full object-cover "
                src={`${ImageBaseUrl}${movie.img}`}
                alt={movie.title}
              />
              <div className="absolute top-0 left-0 h-full w-full text-white opacity-0 duration-300 hover:bg-black/80 hover:opacity-100">
                <p className="white-space-normal flex h-full items-center justify-center text-center text-xs font-bold md:text-sm">
                  {movie.title}
                </p>
                <p
                  className="absolute top-4 right-4 text-gray-300"
                  onClick={() => handleDeleteShow(movie.id)}
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={handleSlideRight}
          size={40}
          className="absolute right-0  z-10 hidden rounded-full bg-white opacity-50 duration-300 hover:opacity-100 group-hover:block"
        />
      </div>
    </div>
  );
};
