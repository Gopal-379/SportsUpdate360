import { useEffect } from "react"
import { Navigate } from "react-router-dom";

const Signout = () => {
    useEffect(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
    }, []);

    return <Navigate to="/auth/signin" />;
};

export default Signout;