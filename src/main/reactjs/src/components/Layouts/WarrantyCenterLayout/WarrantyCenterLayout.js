import Sidebar from "../../Components/Sidebar";
import style from './WarrantyCenterLayout.module.scss';

import {
    UilEstate,
    UilClipboardAlt,
    UilUser,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilBuilding,
    UilHistory,
    UilNotes
} from "@iconscout/react-unicons";

function WarrantyCenterLayout ({ children }) {
    const itemList = [
        {
            icon: UilEstate,
            heading: "DashBoard",
            action: "/warranty/home"
        },
        {
            icon: UilNotes,
            heading: "Đơn bảo hành",
            action: "/warranty/warranty/list"
        },
        {
            icon: UilHistory,
            heading: "Lịch sử bảo hành",
            action: "/warranty/warranty/history"
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

export default WarrantyCenterLayout;