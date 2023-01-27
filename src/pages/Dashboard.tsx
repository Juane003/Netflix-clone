import { Main } from "../components/Main";
import { Row } from "../components/Row";
import { API } from "../api/api";

export const Dashboard = () => {
  return (
    <div>
      <Main />
      <Row name={"Upcoming"} fetcher={API.getUpcoming} />
      <Row name={"Popular"} fetcher={API.getPopular} />
      <Row name={"Trending"} fetcher={API.getTrending} />
      <Row name={"Top rated"} fetcher={API.getTopRated} />
      <Row name={"Horror"} fetcher={API.getHorror} />
    </div>
  );
};
