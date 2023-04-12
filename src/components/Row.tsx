import { useEffect, useRef, useState } from "react";
import { APIResponse, Movie } from "../types";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { RowItem } from "./RowItem";
import { useQuery } from "react-query";

type Name = "Popular" | "Horror" | "Top rated" | "Trending" | "Upcoming";

interface RowProps {
  name: Name;
  fetcher: () => Promise<APIResponse>;
}

export const Row = ({ name, fetcher }: RowProps) => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["movies", name], queryFn: fetcher });

  const sliderRef = useRef<HTMLDivElement>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error ocurred</div>;
  if (!movies) return null;

  const handleSlideRight = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft += 500;
  };
  const handleSlideLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft -= 500;
  };

  return (
    <div className="px-8">
      <h1 className="py-2 pl-4 text-xl font-bold text-white">{name}</h1>
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
          {movies.results.map((movie) => (
            <RowItem movie={movie} isLoading={isLoading} />
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
