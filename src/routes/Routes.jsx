import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../components/Home";
import Login from "../components/Login";
import Registration from "../components/Registration";
import News from "../components/News";
import PrivateRoutes from "./PrivateRoutes";
import Destination from "../components/Destination";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/news",
        element: (
          <PrivateRoutes>
            <News></News>
          </PrivateRoutes>
        ),
      },
      {
        path: "/destination",
        element: (
          <PrivateRoutes>
            <Destination></Destination>
          </PrivateRoutes>
        ),
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
]);
export default router;
