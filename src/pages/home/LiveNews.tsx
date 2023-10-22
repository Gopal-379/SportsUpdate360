/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useArticleState } from "../../context/articles/context";
import { Article } from "../../types/types";

const LiveNews = () => {
    const state: any = useArticleState();
    const { articles, isLoading, isError, errMsg } = state;

    return (
        <div>
            <p className="font-bold text-2xl mb-3">Live News</p>
            {isError && <p className="text-red-500">{errMsg}</p>}
            <div className="flex flex-col md:grid-cols-2 sm:grid-cols-1 gap-2 rounded-md">
                {isLoading &&
                [...Array(10).keys()].map((id) => (
                    <div
                        key={id}
                        className="flex rounded-lg w-full bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow dark:bg-neutral-700 h-24 animate-pulse duration-75"
                    />
                ))}
                {articles &&
                    articles.map((article: Article) => (
                        <Link
                            to={`/article/${article.id}`}
                            className="flex rounded-lg bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow dark:bg-neutral-700">
                            <img
                                className="w-32 rounded-l-lg object-cover h-auto"
                                src={article.thumbnail}
                                alt="thumbnail"
                            />
                            <div className="flex flex-col justify-start p-6">
                                <p className="text-xs text-neutral-500 dark:text-neutral-300">
                                    {article.sport.name}
                                </p>
                                <h5 className="mt-2 text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                                    {article.title}
                                </h5>
                                <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-200">
                                    {article.summary}
                                </p>
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