import Login from "../pages/Login";
import Home from "../pages/Home";
import ManagerHome from "../pages/Manager/Home";
import ManagerLayout from "../components/Layouts/ManagerLayout";
import ShowAcount from "../pages/Manager/AccountManager/ShowAccount";
import CreateAccount from "../pages/Manager/AccountManager/CreateAccount";
import EditAccount from "../pages/Manager/AccountManager/EditAccount/EditAccount";
import CreateUnit from "../pages/Manager/CreateUnit";
import ShowUnit from "../pages/Manager/ShowUnit";
import EditUnit from "../pages/Manager/EditUnit";
import CreateOrder from "../pages/Distributor/CreateOrder";
import ShowOrder from "../pages/Distributor/ShowOrder";
import CreateProductLine from "../pages/Manager/ProductLine/CreateProductLine";
import ListProductLine from "../pages/Manager/ProductLine/ListProductLine";
import ShowProductLine from "../pages/Manager/ProductLine/ShowProductLine/ShowProductLine";

const publicRoutes = [
    // {path: '/login', component: Login},
    {path: '/manager/home', layout: ManagerLayout , component: ManagerHome},
    {path: '/manager/account/list', layout: ManagerLayout , component: ShowAcount},
    {path: '/manager/account/create', layout: ManagerLayout, component: CreateAccount},
    {path: '/manager/account/edit', layout: ManagerLayout, component: EditAccount},
    {path: '/manager/unit/create', layout: ManagerLayout, component: CreateUnit},
    {path: '/manager/unit/list', layout: ManagerLayout, component: ShowUnit},
    {path: '/manager/unit/edit', layout: ManagerLayout, component: EditUnit},
    {path: '/manager/product_line/create', layout: ManagerLayout, component: CreateProductLine},
    {path: '/manager/product_line/list', layout: ManagerLayout, component: ListProductLine},
    {path: '/manager/product_line/show', layout: ManagerLayout, component: ShowProductLine},
    {path: '/distributor/order/create', layout: ManagerLayout, component: CreateOrder},
    {path: '/distributor/order/list', layout: ManagerLayout, component: ShowOrder}
];

const privateRoutes = [
    {path: '/home', component: Home}
];

export { publicRoutes, privateRoutes }