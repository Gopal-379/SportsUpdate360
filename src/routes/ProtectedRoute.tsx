import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
    children,
}: {
    children: JSX.Element;
}) {
    const { pathname } = useLocation();
    
    const isAuthenticated = !!localStorage.getItem("authToken");
    if (isAuthenticated) {
        return <>{children}</>;
    }

    return <Navigate to="/auth/signin" replace state={{ referrer: pathname }} />;
}