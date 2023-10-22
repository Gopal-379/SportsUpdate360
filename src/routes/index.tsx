import { Navigate, createBrowserRouter } from "react-router-dom";
import SigninForm from "../pages/authentication/SigninForm"
import SignupForm from "../pages/authentication/SignupForm";
import SignPage from "../pages/authentication";
import ProtectedRoute from "./ProtectedRoute";
import Signout from "../pages/authentication/Signout";
import Home from "../pages/home";
import MatchDetailsModal from "../pages/match";
import ArticleDetailsModel from "../pages/article";

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