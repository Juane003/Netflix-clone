import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { RootLayout } from "./Layout/RootLayout";
import { Account, Dashboard, Movie, SignIn, SignUp } from "./pages";

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/movie/:id" element={<Movie />} />
      </Route>
    )
  );
  return <RouterProvider router={routes} />;
};

export default App;
