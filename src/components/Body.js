import Login from "./Login";
import Browse from "./Browse";
import ErrorPage from "./ErrorPage";
import {createBrowserRouter} from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />
    },
    {
      path : "/error",
      element: <ErrorPage />
    }
  ]);

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
