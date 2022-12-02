import Login from "../pages/Login";
import Home from "../pages/Home";
import ManagerHome from "../pages/Manager/Home";
import ManagerLayout from "../components/Layouts/ManagerLayout";
import ShowAcount from "../pages/Manager/AccountManager/ShowAccount";

const publicRoutes = [
    {path: '/login', component: Login},
    {path: '/manager/home', layout: ManagerLayout , component: ManagerHome},
    {path: '/manager/account/list', layout: ManagerLayout , component: ShowAcount}
];

const privateRoutes = [
    {path: '/home', component: Home}
];

export { publicRoutes, privateRoutes }