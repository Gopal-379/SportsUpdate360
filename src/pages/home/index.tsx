import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar"
import Dashboard from "./Dashboard";

const Home = () => {
    return (
        <>
            <NavBar />
            <main>
                <div>
                    <Dashboard />
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default Home;