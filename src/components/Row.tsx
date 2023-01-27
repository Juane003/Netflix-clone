import { useEffect, useRef, useState } from "react";
import { ImageBaseUrl } from "../api/api";
import { APIResponse, Movie } from "../types";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RowItem } from "./RowItem";

type Name = "Popular" | "Horror" | "Top rated" | "Trending" | "Upcoming";

interface RowProps {
  name: Name;
  fetcher: () => Promise<APIResponse>;
}

export const Row = ({ name, fetcher }: RowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetcher();
      setMovies(data.results);
    };
    fetchData();
  }, []);

  const handleSlideRight = () => {
    sliderRef.current.scrollLeft += 500;
  };
  const handleSlideLeft = () => {
    sliderRef.current.scrollLeft -= 500;
  };

  return (
    <>
      <h1 className="text-white">{name}</h1>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={handleSlideLeft}
          size={40}
          className="absolute left-0 bg-white rounded-full opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
        />
        <div
          ref={sliderRef}
          className="w-full h-full whitespace-nowrap scroll-smooth overflow-hidden relative"
        >
          {movies.map((movie) => (
            <RowItem movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={handleSlideRight}
          size={40}
          className="absolute right-0  bg-white rounded-full opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};
