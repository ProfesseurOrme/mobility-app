import Home from "../components/Home";
import Cycle from "../components/Cycle/Cycle";
import Error from "../components/Error/Error";
import Traffic from "../components/Traffic/Traffic";
import Tram from "../components/Tram/Tram";

export const webRoutes = [
    {path: '/', name: 'Home', Component: Home},
    {path: '/cycles-stations', name: 'Cycle', Component: Cycle},
    {path: '/traffic', name: 'Traffic', Component: Traffic},
    {path: '/trams', name: 'Tram', Component: Tram},
    {path: "*", name: "Error", Component: Error}
];
