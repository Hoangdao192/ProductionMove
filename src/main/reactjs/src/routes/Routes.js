import Login from "../pages/Login";
import Home from "../pages/Home";

import ManagerHome from "../pages/Manager/Home";
import DistributorHome from "../pages/Distributor/Home";
import FactoryHome from '../pages/Factory/Home';
import WarrantyCenterHome from '../pages/WarrantyCenter/Home';

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
import NotFound from "../pages/NotFound";
import Logout from "../pages/Logout";
import DistributorLayout from "../components/Layouts/DistributorLayout";

import DistributorStockList from '../pages/Distributor/Stock/ListBatch';
import DistributorShowBatch from '../pages/Distributor/Stock/ShowBatch';
import CreateCustomer from "../pages/Distributor/Customer/CreateCustomer";

const privateRoutes = [
    // {path: '/login', component: Login},
    {path: '/manager/home', layout: ManagerLayout , component: ManagerHome, authorization : ['Admin']},
    {path: '/manager/account/list', layout: ManagerLayout , component: ShowAcount, authorization : ['Admin']},
    {path: '/manager/account/create', layout: ManagerLayout, component: CreateAccount, authorization : ['Admin']},
    {path: '/manager/account/edit', layout: ManagerLayout, component: EditAccount, authorization : ['Admin']},
    {path: '/manager/unit/create', layout: ManagerLayout, component: CreateUnit, authorization : ['Admin']},
    {path: '/manager/unit/list', layout: ManagerLayout, component: ShowUnit, authorization : ['Admin']},
    {path: '/manager/unit/edit', layout: ManagerLayout, component: EditUnit, authorization : ['Admin']},
    {path: '/manager/product_line/create', layout: ManagerLayout, component: CreateProductLine, authorization : ['Admin']},
    {path: '/manager/product_line/list', layout: ManagerLayout, component: ListProductLine, authorization : ['Admin']},
    {path: '/manager/product_line/show', layout: ManagerLayout, component: ShowProductLine, authorization : ['Admin']},

    {path: '/distributor/home', layout: DistributorLayout, component: DistributorHome, authorization : ['Distributor']},
    {path: '/distributor/order/create', layout: DistributorLayout, component: CreateOrder, authorization : ['Distributor']},
    {path: '/distributor/order/list', layout: DistributorLayout, component: ShowOrder, authorization : ['Distributor']},
    {path: '/distributor/order_detail/get', layout: DistributorLayout, component: ShowOrderDetail, authorization : ['Distributor']},
    // {path: '/factory/warehouse/import', layout: FactoryLayout, component: CreateBatch, authorization : ['Admin', 'Distributor']},
    {path: '/distributor/warehouse/list_batch', layout: DistributorLayout, component: DistributorStockList, authorization : ['Admin', 'Distributor']},
    {path: '/distributor/warehouse/show_batch', layout: DistributorLayout, component: DistributorShowBatch, authorization : ['Admin', 'Distributor']},
    {path: '/distributor/warehouse/export', layout: DistributorLayout, component: StockExport, authorization : ['Admin', 'Distributor']},
    {path: '/distributor/customer/create', layout: DistributorLayout, component: CreateCustomer, authorization: ['Admin', 'Distributor']},

    {path: '/factory/home', layout: FactoryLayout, component: FactoryHome, authorization : ['Manufacture']},
    {path: '/factory/warehouse/create_batch', layout: FactoryLayout, component: CreateBatch, authorization : ['Admin', 'Manufacture']},
    {path: '/factory/warehouse/list_batch', layout: FactoryLayout, component: ListBatch, authorization : ['Admin', 'Manufacture']},
    {path: '/factory/warehouse/export', layout: FactoryLayout, component: StockExport, authorization : ['Admin', 'Manufacture']},

    {path: '/warranty/home', layout: FactoryLayout, component: WarrantyCenterHome, authorization : ['Manufacture']}
];

const publicRoutes = [
    {path: '/home', component: Home},
    {path: '/', component: Home},
    // {path: '/home', component: Home},
    {path: '/login', component: Login},
    {path: '/logout', component: Logout},
    {path: '/not_found', component: NotFound}
];

export { publicRoutes, privateRoutes }