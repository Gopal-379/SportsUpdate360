import { Navigate, createBrowserRouter } from "react-router-dom";
import SigninForm from "../pages/authentication/SigninForm"
import SignupForm from "../pages/authentication/SignupForm";

const router = createBrowserRouter([
    {
        path: "auth",
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
        ],
    },
]);

export default router;