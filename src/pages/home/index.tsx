/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar"
import Dashboard from "./Dashboard";
import { useMatchDispatch } from "../../context/matches/context";
import { useArticleDispatch } from "../../context/articles/context";
import { searchMatches } from "../../context/matches/actions";
import { searchArticles } from "../../context/articles/actions";
import { useSportDispatch } from "../../context/sports/context";
import { searchSports } from "../../context/sports/actions";
import { useEffect } from "react";

const Home = () => {
    const matchDispatch = useMatchDispatch();
    const articleDispatch = useArticleDispatch();
    const sportDispatch = useSportDispatch();

    useEffect(() => {
        searchMatches(matchDispatch);
        searchArticles(articleDispatch);
        searchSports(sportDispatch);
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