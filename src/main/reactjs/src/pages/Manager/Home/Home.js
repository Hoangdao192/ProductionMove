import Sidebar from "../../../components/Components/Sidebar"
import {
    UilEstate,
    UilClipboardAlt,
    UilUser,
    UilPackage,
    UilChart,
} from "@iconscout/react-unicons";

function Home() {
    
    const SidebarData = [
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
                    action: "/b"
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
        <div className="container">
            <Sidebar itemList={SidebarData}/>
            <div>HOME</div>
        </div>
    )
}

export default Home