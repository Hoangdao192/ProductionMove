import Authentication from "../../services/Authentication/Authentication"
import ManagerHome from '../Manager/Home';
import FactoryHome from '../Factory/Home';
import DistributorHome from '../Distributor/Home';
import WarrantyCenterHome from '../WarrantyCenter/Home';
import { Navigate } from "react-router-dom";

function Home() {
    let role = Authentication.getCurrentUser().role;
    return (
            role == "Admin" ? <Navigate to="/manager/home" /> : 
            role == "Manufacture" ? <Navigate to="/factory/home" /> :
            role == "Distributor" ? <Navigate to="/distributor/home" /> :
            role == "Warranty center" ? <Navigate to="/warranty/home" /> : <></>
    )
}

export default Home