import Home from "../components/Home";
import Bike from "../components/bikes/Bike";
import Bus from "../components/bus/Bus";
import Car from "../components/cars/Car";
import Error from "../components/error/Error";

export const webRoutes = [
    {path: '/', name: 'Home', Component: Home},
    {path: '/bikes-stations', name: 'Bike', Component: Bike},
    {path: '/bus-stations', name: 'Bus', Component: Bus},
    {path: '/car-parking', name: 'Car', Component: Car},
    {path: "*", name: "Error", Component: Error}
];
