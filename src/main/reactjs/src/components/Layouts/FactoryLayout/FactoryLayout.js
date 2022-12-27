import Sidebar from "../../Components/Sidebar";
import style from './FactoryLayout.module.scss';

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

function FactoryLayout ({ children }) {
    const itemList = [
        {
            icon: UilEstate,
            heading: "DashBoard",
            action: "/factory/home"
        },
        {
            icon: UilArchive,
            heading: "Kho hàng",
            children: [
                {
                    heading: "Tạo lô sản phẩm",
                    action: "/factory/warehouse/create_batch"
                },
                {
                    heading: "Quản lý lô sản phẩm",
                    action: "/factory/warehouse/list_batch"
                },
                {
                    heading: "Xuất kho",
                    action: "/factory/warehouse/export"
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

export default FactoryLayout;