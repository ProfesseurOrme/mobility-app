import Home from "../components/Home";
import Cycle from "../components/Cycle/Cycle";
import Error from "../components/Error/Error";
import Traffic from "../components/Traffic/Traffic";
import PublicTransport from "../components/PublicTransport/PublicTransport";

export const webRoutes = [
    {path: '/', name: 'Home', Component: Home},
    {path: '/cycles-stations', name: 'Cycle', Component: Cycle},
    {path: '/Traffic', name: 'Traffic', Component: Traffic},
    {path: '/public-transports', name: 'PublicTransport', Component: PublicTransport},
    {path: "*", name: "Error", Component: Error}
];
