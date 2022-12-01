import Login from "../pages/Login";
import Home from "../pages/Home";
import ManagerHome from "../pages/Manager/Home";

const publicRoutes = [
    {path: '/login', component: Login},
    {path: '/manager/home', component: ManagerHome}
];

const privateRoutes = [
    {path: '/home', component: Home}
];

export { publicRoutes, privateRoutes }