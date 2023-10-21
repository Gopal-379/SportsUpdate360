import { Navigate, createBrowserRouter } from "react-router-dom";
import SigninForm from "../pages/authentication/SigninForm"
import SignupForm from "../pages/authentication/SignupForm";
import SignPage from "../pages/authentication";
import ProtectedRoute from "./ProtectedRoute";
import Signout from "../pages/authentication/Signout";
import Home from "../pages/home";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                {/* <div className="text-green-700 items-center justify-center">This is Home Page!</div> */}
                <Home/>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <></>,
            }
        ],
    },
    {
        path: "auth",
        element: <SignPage />,
        children: [
            {
                index: true,
                element: <Navigate to='/auth/signup' replace />,
            },
            {
                path: "signin",
                element: <SigninForm />,
            },
            {
                path: "signup",
                element: <SignupForm />,
            },
            {
                path: "signout",
                element: <Signout />,
            },
        ],
    },
]);

export default router;