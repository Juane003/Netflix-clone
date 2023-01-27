import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { RootLayout } from "./Layout/RootLayout";
import { Dashboard, Movie, SignIn } from "./pages";

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Route>
    )
  );
  return <RouterProvider router={routes} />;
};

export default App;
