import Login from "../pages/Login";
import Home from "../pages/Home";
import ManagerHome from "../pages/Manager/Home";
import ManagerLayout from "../components/Layouts/ManagerLayout";
import ShowAcount from "../pages/Manager/AccountManager/ShowAccount";
import CreateAccount from "../pages/Manager/AccountManager/CreateAccount";
import EditAcount from "../pages/Manager/AccountManager/Edit/EditAcount";

const publicRoutes = [
    {path: '/login', component: Login},
    {path: '/manager/home', layout: ManagerLayout , component: ManagerHome},
    {path: '/manager/account/list', layout: ManagerLayout , component: ShowAcount},
    {path: '/manager/account/create', layout: ManagerLayout, component: CreateAccount},
    {path: '/manager/account/edit', layout: ManagerLayout, component: EditAcount}
];

const privateRoutes = [
    {path: '/home', component: Home}
];

export { publicRoutes, privateRoutes }