import Sidebar from "../../Components/Sidebar";
import style from './DistributorLayout.module.scss';

import {
    UilEstate,
    UilClipboardAlt,
    UilUser,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilBuilding,
    UilArchive
} from "@iconscout/react-unicons";

function DistributorLayout ({ children }) {
    const itemList = [
        {
            icon: UilEstate,
            heading: "DashBoard",
            action: "/distributor/home"
        },
        {
            icon: UilClipboardAlt,
            heading: "Đơn hàng",
            children: [
                {
                    heading: "Tạo mới",
                    action: "/distributor/order/create"
                },
                {
                    heading: "Quản lý đơn hàng",
                    action: "/distributor/order/list"
                }
            ]
        },
        {
            icon: UilArchive,
            heading: "Kho hàng",
            children: [
                {
                    heading: "Quản lý lô sản phẩm",
                    action: "/distributor/warehouse/list_batch"
                },
                {
                    heading: "Nhập kho",
                    action: "/distributor/warehouse/import"
                },
                {
                    heading: "Xuất kho",
                    action: "/distributor/warehouse/export"
                }
            ]
        },
        {
            icon: UilChart,
            heading: "Analytics"
        },
        {
            icon: UilSignOutAlt,
            heading: "Đăng xuất",
            action: "/logout"
        }
    ];

    return (
        <div className={style.container}>
            <Sidebar className={style.sideBar} itemList={itemList}/>
            <div className={style.main}>
                {children}
            </div>
        </div>
    )
}

export default DistributorLayout;