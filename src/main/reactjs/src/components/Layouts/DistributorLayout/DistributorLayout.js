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
    UilArchive,
    UilNotes,
    UilUsersAlt
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
            icon: UilNotes,
            heading: "Đơn bảo hành",
            children: [
                {
                    heading: "Tạo mới",
                    action: "/distributor/warranty/create"
                },
                {
                    heading: "Xem danh sách",
                    action: "/distributor/warranty/list"
                }
            ]
        },
        {
            icon: UilClipboardAlt,
            heading: "Triệu hồi sản phẩm",
            action: "/distributor/productRecall"
        },
        {
            icon: UilArchive,
            heading: "Kho hàng",
            children: [
                {
                    heading: "Danh sách sản phẩm",
                    action: "/distributor/warehouse/product/list"
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
            icon: UilUsersAlt,
            heading: "Khách hàng",
            children: [
                {
                    heading: "Tạo khách hàng",
                    action: "/distributor/customer/create"
                },
                {
                    heading: "Danh sách khách hàng",
                    action: "/distributor/customer/list"
                }
            ]
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