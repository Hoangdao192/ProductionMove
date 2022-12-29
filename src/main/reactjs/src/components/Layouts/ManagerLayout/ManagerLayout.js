import Sidebar from "../../Components/Sidebar";
import style from './ManagerLayout.module.scss';

import {
    UilEstate,
    UilClipboardAlt,
    UilUser,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilBuilding
} from "@iconscout/react-unicons";

function ManagerLayout ({ children }) {
    const itemList = [
        {
            icon: UilEstate,
            heading: "DashBoard",
            action: "/manager/home"
        },
        {
            icon: UilBuilding,
            heading: "Đơn vị",
            children: [
                {
                    heading: "Tạo mới",
                    action: "/manager/unit/create"
                },
                {
                    heading: "Quản lý đơn vị",
                    action: "/manager/unit/list"
                }
            ]
        },
        {
            icon: UilUser,
            heading: "Tài khoản",
            children: [
                { 
                    heading: "Quản lý tài khoản", 
                    action: "/manager/account/list"
                },
                { 
                    heading: "Cấp tài khoản", 
                    action: "/manager/account/create"
                }
            ]
        },
        {
            icon: UilPackage,
            heading: "Dòng sản phẩm",
            children: [
                { 
                    heading: "Tạo mới", 
                    action: "/manager/product_line/create"
                },
                { 
                    heading: "Xem danh sách", 
                    action: "/manager/product_line/list"
                }
            ]
        },
        {
            icon: UilSignOutAlt,
            heading: "Đăng xuất",
            action: '/logout'
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

export default ManagerLayout;