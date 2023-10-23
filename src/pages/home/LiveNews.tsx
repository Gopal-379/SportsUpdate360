/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useArticleState } from "../../context/articles/context";
import { Article, Sport } from "../../types/types";
import { useSportState } from "../../context/sports/context";
import { useState } from "react";

const LiveNews = () => {
    const articleState: any = useArticleState();
    const sportState: any = useSportState();
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

    const [selectedSports, setSelectedSports] = useState<number[]>([]);
    const [selectedSportDropdown, setSelectedSportDropdown] = useState("All");

    const handleSportDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSportDropdown(event.target.value);
        if (event.target.value === "All") {
            setSelectedSports([]);
        } else {
            setSelectedSports([parseInt(event.target.value, 10)]);
        }
    };

    return (
        <div>
            <p className="font-bold text-2xl mb-3">Live News</p>
            <div className="mb-4">
                <p className="text-md font-semibold mb-1">Filter by sport:</p>
                <div className="flex gap-2 items-center mb-3">
                    <select
                        className="px-4 py-2 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
                        value={selectedSportDropdown}
                        onChange={handleSportDropdownChange}
                    >
                        <option value="All">All Sports</option>
                        {sports.map((sport: Sport) => (
                            <option key={sport.id} value={sport.id}>
                                {sport.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {articleError && (
                <p className="text-red-500">{articleErrorMessage}</p>
            )}
            {sportError && <p className="text-red-500">{sportErrorMessage}</p>}
            <div className="flex flex-col md:grid-cols-2 sm:grid-cols-1 gap-2 rounded-md">
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
                            selectedSports.length === 0 ||
                            selectedSports.includes(article.sport.id)
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