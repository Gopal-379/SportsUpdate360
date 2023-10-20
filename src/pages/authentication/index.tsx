import { Outlet } from "react-router-dom"

const Signin: React.FC = () => {
    return (
        <div className="h-screen flex">
            <Outlet />
        </div>
    );
};

export default Signin;