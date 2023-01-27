import { APIResponse } from "../types";

const key = import.meta.env.VITE_API_KEY;

const endpoints = {
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  trending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  horror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export const ImageBaseUrl = "https://image.tmdb.org/t/p/original/";

export const API = {
  getPopular: async (): Promise<APIResponse> => {
    const data = await fetch(endpoints.popular);
    const json = await data.json();
    return json;
  },
  getTopRated: async (): Promise<APIResponse> => {
    const data = await fetch(endpoints.topRated);
    const json = await data.json();
    return json;
  },
  getTrending: async (): Promise<APIResponse> => {
    const data = await fetch(endpoints.trending);
    const json = await data.json();
    return json;
  },
  getHorror: async (): Promise<APIResponse> => {
    const data = await fetch(endpoints.horror);
    const json = await data.json();
    return json;
  },
  getUpcoming: async (): Promise<APIResponse> => {
    const data = await fetch(endpoints.upcoming);
    const json = await data.json();
    return json;
  },
};
