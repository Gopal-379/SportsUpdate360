/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar"
import Dashboard from "./Dashboard";
import { useMatchDispatch } from "../../context/matches/context";
import { useArticleDispatch } from "../../context/articles/context";
import { searchMatches } from "../../context/matches/actions";
import { searchArticles } from "../../context/articles/actions";
import { useEffect } from "react";

const Home = () => {
    const matchDispatch = useMatchDispatch();
    const articleDispatch = useArticleDispatch();

    useEffect(() => {
        searchMatches(matchDispatch);
        searchArticles(articleDispatch);
    }, []);

    return (
        <>
            <NavBar />
            <main>
                <div className="dark:bg-stone-950 h-screen dark:text-white">
                    <Dashboard />
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default Home;