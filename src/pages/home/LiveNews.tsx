/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useArticleState } from "../../context/articles/context";
import { Article, Sport, Teams } from "../../types/types";
import { useSportState } from "../../context/sports/context";
import { useState } from "react";
import { useTeamState } from "../../context/teams/context";

const LiveNews = () => {
    const articleState: any = useArticleState();
    const sportState: any = useSportState();
    const teamState: any = useTeamState();
    const {
        articles,
        isLoading: articleLoading,
        isError: articleError,
        errMsg: articleErrorMessage,
    } = articleState;
    const {
        sports,
        isError: sportError,
        errMsg: sportErrorMessage,
    } = sportState;
    const {
        team,
        isError: teamError,
        errMsg: teamErrorMessage,
    } = teamState;

    const [selectedSports, setSelectedSports] = useState<string[]>([]);
    const [selectedSportDropdown, setSelectedSportDropdown] = useState("All");

    const handleSportDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSportName = event.target.value;
        setSelectedSportDropdown(selectedSportName);
        if (selectedSportName === "All") {
            setSelectedSports([]);
        } else {
            const selectedSportIds = sports
                .filter((sport: Sport) => sport.name === selectedSportName)
                .map((sport: Sport) => sport.name);
            setSelectedSports(selectedSportIds);
        }
    };

    console.log(selectedSports);
    
    const [selectedTeams, setSelectedTeams] = useState<number[]>([]);

    const changeTeam = (team: number) => {
        if (selectedTeams.includes(team)) {
            setSelectedTeams((selectedTeams) =>
            selectedTeams.filter((selectedTeams) => selectedTeams !== team)
        );
        } else {
            setSelectedTeams((selectedTeams) => [...selectedTeams, team]);
        }
    };

    return (
        <div>
            <p className="px-2 font-bold text-2xl mb-3">Live News</p>
            <div className="mb-4">
                <p className="text-md font-semibold mb-1 px-2">Filter by sport:</p>
                <div className="flex items-center space-x-2 mb-3 px-2">
                    <select
                        className="px-4 py-2 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-300 dark:text-white dark:bg-black"
                        value={selectedSportDropdown}
                        onChange={handleSportDropdownChange}
                    >
                        <option value="All">All Sports</option>
                        {sports.map((sport: Sport) => (
                            <option key={sport.id} value={sport.name}>
                                {sport.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mb-4 scroll-bar">
                <p className="text-md font-semibold mb-1 px-2">Filter by team:</p>
                <div className="flex gap-2 items-center mb-3 overflow-x-auto px-2">
                    {team
                        .filter(
                            (team: Teams) => 
                                selectedSports.length === 0 || selectedSports.includes(team.plays ? team.plays : "")
                        )
                        .map((team: Teams) =>
                        selectedTeams.includes(team.id) ? (
                        <div
                            onClick={() => changeTeam(team.id)}
                            key={team.id}     
                            className="flex-shrink-0 cursor-pointer flex items-center gap-1 bg-black rounded-lg px-2 py-1 text-white text-sm dark:bg-white dark:text-neutral-700 mb-3"
                        >
                            <span>{team.name}</span>
                        </div>
                        ) : (
                            <div
                                onClick={() => changeTeam(team.id)}
                                key={team.id}                
                                className="flex-shrink-0 cursor-pointer flex items-center gap-1 border border-black rounded-lg px-2 py-1 text-neutral-700 text-sm dark:text-white dark:border-white mb-3"
                            >
                                <span>{team.name}</span>
                            </div>
                        )
                    )}
                </div>
            </div>
            {articleError && (
                <p className="text-red-500">{articleErrorMessage}</p>
            )}
            {sportError && <p className="text-red-500">{sportErrorMessage}</p>}
            {teamError && <p className="text-red-500">{teamErrorMessage}</p>}
            <div className="flex flex-col md:grid-cols-2 sm:grid-cols-1 gap-2 rounded-md px-2">
                {articleLoading &&
                [...Array(10).keys()].map((id) => (
                    <div
                        key={id}
                        className="flex rounded-lg w-full bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow dark:bg-neutral-700 h-24 animate-pulse duration-75"
                    />
                ))}
                {articles &&
                    articles
                    .filter(
                        (article: Article) => 
                            selectedSports.length === 0 || selectedSports.includes(article.sport.name)
                    )
                    .filter(
                        (article: Article) => {
                            let flag = false;
                            for (let t of article.teams) {
                                if (selectedTeams.includes(t.id)) {
                                    flag = true;
                                    break;
                                }
                            }
                            return selectedTeams.length === 0 || flag;
                        }
                    )
                    .map((article: Article) => (
                    <Link
                        to={`/article/${article.id}`}
                        key={article.id}
                        className="flex rounded-lg bg-white dark:bg-black border border-gray-200 shadow-md hover:shadow-xl transition-shadow"
                    >
                        <img
                        className="w-32 rounded-l-lg object-cover h-auto"
                        src={article.thumbnail}
                        alt="thumbnail"
                        />
                        <div className="flex flex-col justify-start p-6">
                            <p className="text-xs text-neutral-500 dark:text-neutral-300">
                                {article.sport.name}
                            </p>
                            <h5 className="mt-2 text-xl font-semibold text-neutral-800 dark:text-white">
                                {article.title}
                            </h5>
                            <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">
                                {article.summary}
                            </p>
                            <div className="text-xs text-neutral-500 mb-1 dark:text-neutral-300">
                                {article.teams.map((team, id) => (
                                <span key={id}>
                                    <span>{team.name}</span>
                                    {article.teams.length !== id + 1 && " VS "}
                                </span>
                                ))}
                            </div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-300">
                                {new Date(article.date).toDateString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LiveNews;