import { Navigate } from "react-router-dom";
import Authentication from "../../services/Authentication/Authentication";

export default function Logout() {
    Authentication.logout()
    return (
        <Navigate to="/login"/>
    )
}