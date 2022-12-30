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
    UilArchive,
    UilLaptop
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
                ,
                {
                    heading: "Nhập kho",
                    action: "/factory/warehouse/product/import"
                },
                {
                    heading: "Xuất kho",
                    action: "/factory/warehouse/product/export"
                }
            ]
        },
        {
            heading: "Quản lý sản phẩm",
            icon: UilLaptop,
            action: "/factory/warehouse/product/list"
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