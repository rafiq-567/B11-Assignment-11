import {
    createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";
import AvailableCars from "../pages/AvailableCars/AvailableCars";
import AddCar from "../pages/AddCar/AddCar";
import MyCars from "../pages/MyCars/MyCars";
import MyBookings from "../pages/MyBookings/MyBookings";
import axios from "axios";
import CarDetails from "../pages/AvailableCars/CarDetails";
import PrivateRoute from "../routes/PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AboutUs from "../pages/AboutUs/AboutUs";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                loader: () => axios(`${import.meta.env.VITE_API_URL}/cars`),
                Component: Home,
            },
            {
                path: "/availableCars",
                Component: AvailableCars,
            },
            {
                path: "/about",
                Component: AboutUs,
            },
            {
                path: "/car/:id",
                element: <PrivateRoute><CarDetails></CarDetails></PrivateRoute>,
            },
            {
                path: "/addCar",
                element: <PrivateRoute><AddCar></AddCar></PrivateRoute>,
            },
            {
                path: "/myCars/:email",
                loader: ({ params }) => axios(`${import.meta.env.VITE_API_URL}/my-cars/${params.email}`),
                element: <PrivateRoute><MyCars></MyCars></PrivateRoute>,
            },
            {
                path: "/myBookings",
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                path: "/logIn",
                Component: LogIn,
            },
            {
                path: "/*",
                Component: ErrorPage,
            },
        ]
    },
]);

export default router;