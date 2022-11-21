import Authentication from "../../services/Authentication/Authentication";
import {Route, Navigate} from "react-router-dom";

function AuthenticatedRoute({ children}) {
    const isAuthenticated = Authentication.isUserAuthenticated();
    return (
        isAuthenticated ? (
            children
        ) : (
            <Navigate to="/login" />
        )
    )
}

export default AuthenticatedRoute;