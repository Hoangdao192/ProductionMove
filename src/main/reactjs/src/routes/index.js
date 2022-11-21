import Login from "../pages/Login";
import Home from "../pages/Home";

const publicRoutes = [
    {path: '/login', component: Login}
];

const privateRoutes = [
    {path: '/home', component: Home}
];

export { publicRoutes, privateRoutes }