import { Navigate, createBrowserRouter } from "react-router-dom";
import SigninForm from "../pages/authentication/SigninForm"
import SignupForm from "../pages/authentication/SignupForm";
import SignPage from "../pages/authentication";
// import ProtectedRoute from "./ProtectedRoute";
import Signout from "../pages/authentication/Signout";
import Home from "../pages/home";
import MatchDetailsModal from "../pages/match";
import ArticleDetailsModel from "../pages/article";
import Preferences from "../pages/preferences";
import ResetPwd from "../pages/authentication/ResetPwd";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                index: true,
                element: <></>,
            },
            {
                path: "match",
                children: [
                    {
                        index: true,
                        element: <Navigate to="/" replace />
                    },
                    {
                        path: ":matchId",
                        element: <MatchDetailsModal />,
                    },
                ],
            },
            {
                path: "article",
                children: [
                    {
                        index: true,
                        element: <Navigate to="/" replace />
                    },
                    {
                        path: ":articleId",
                        element: <ArticleDetailsModel />,
                    },
                ],
            },
            {
                path: "preferences",
                element: <Preferences />,
            },
            {
                path: "resetPwd",
                element: <ResetPwd />,
            },
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