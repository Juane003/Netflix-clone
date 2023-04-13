import { Main } from "../components/Main";
import { Row } from "../components/Row";
import { API } from "../api/api";
import { QueryClient, useQuery } from "react-query";
import { getMovieRef } from "../firebase/db";
import { User } from "firebase/auth";

const categories: (keyof typeof FETCH_MOVIES_MAP)[] = [
  "Upcoming",
  "Popular",
  "Trending",
  "Top Rated",
  "Horror",
];

const FETCH_MOVIES_MAP = {
  Upcoming: API.getUpcoming,
  Popular: API.getPopular,
  Trending: API.getTrending,
  "Top Rated": API.getTopRated,
  Horror: API.getHorror,
};
export const Dashboard = () => {
  const { data: movies } = useQuery(mainQuery());

  if (!movies) return null;

  return (
    <div>
      <Main movies={movies.results} />
      <Row name={"Upcoming"} />
      <Row name={"Popular"} />
      <Row name={"Trending"} />
      <Row name={"Top Rated"} />
      <Row name={"Horror"} />
    </div>
  );
};

export const mainPageLoader = (queryClient: QueryClient) => async () => {
  const query = mainQuery();

  const categoryQueries = categories.map((category) => {
    return categoryQuery(category);
  });

  return (
    (queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))) &&
    categoryQueries.map(
      async (categoriesQuery) =>
        queryClient.getQueryData(categoriesQuery.queryKey) ??
        (await queryClient.fetchQuery(categoriesQuery))
    )
  );
};

const mainQuery = () => ({
  queryKey: ["movies"],
  queryFn: API.getPopular,
});

export const categoryQuery = (categoryName: keyof typeof FETCH_MOVIES_MAP) => ({
  queryKey: ["movies", categoryName],
  queryFn: FETCH_MOVIES_MAP[categoryName],
});
