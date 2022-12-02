import Sidebar from "../../Components/Sidebar";
import style from './ManagerLayout.module.scss';

import {
    UilEstate,
    UilClipboardAlt,
    UilUser,
    UilPackage,
    UilChart,
} from "@iconscout/react-unicons";

function ManagerLayout ({ children }) {
    const itemList = [
        {
            icon: UilEstate,
            heading: "DashBoard",
            children: [
                { heading: "A", action: "b"}
            ]
        },
        {
            icon: UilClipboardAlt,
            heading: "Orders"
        },
        {
            icon: UilUser,
            heading: "Tài khoản",
            children: [
                { 
                    heading: "Cấp tài khoản", 
                    action: "b"
                },
                { 
                    heading: "Quản lý tài khoản", 
                    action: "/manager/account/list"
                }
            ]
        },
        {
            icon: UilPackage,
            heading: "Dòng sản phẩm",
            children: [
                { 
                    heading: "Tạo mới", 
                    action: "b"
                },
                { 
                    heading: "Xem danh sách", 
                    action: "b"
                }
            ]
        },
        {
            icon: UilChart,
            heading: "Analytics"
        },  
    ];

    return (
        <div className={style.container}>
            <Sidebar itemList={itemList}/>
            <div className={style.main}>
                {children}
            </div>
        </div>
    )
}

export default ManagerLayout;