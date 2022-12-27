import Login from "../pages/Login";
import Home from "../pages/Home";
import ManagerHome from "../pages/Manager/Home";
import ManagerLayout from "../components/Layouts/ManagerLayout";
import FactoryLayout from "../components/Layouts/FactoryLayout";

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
import ShowOrderDetail from "../pages/Distributor/ShowOrderDetail";
import CreateBatch from "../pages/Factory/CreateBatch";
import ListBatch from "../pages/Factory/ListBatch";
import StockExport from "../pages/Factory/StockExport";

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
    {path: '/distributor/order/list', layout: ManagerLayout, component: ShowOrder},
    {path: '/distributor/order_detail/get', layout: ManagerLayout, component: ShowOrderDetail},
    {path: '/factory/warehouse/create_batch', layout: FactoryLayout, component: CreateBatch},
    {path: '/factory/warehouse/list_batch', layout: FactoryLayout, component: ListBatch},
    {path: '/factory/warehouse/export', layout: FactoryLayout, component: StockExport}
];

const privateRoutes = [
    {path: '/home', component: Home}
];

export { publicRoutes, privateRoutes }