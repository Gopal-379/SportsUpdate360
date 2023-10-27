/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MatchDetails } from "../../types/types";
import { API_ENDPOINT } from "../../config/constants";
import { Link } from "react-router-dom";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const LiveCard = ({ matchID }: { matchID: number }) => {
    const [searchScores, setSearchScores] = useState(false);
    const [match, setMatch] = useState<MatchDetails>();

    const searchMatch = async () => {
        setSearchScores(true);
        await fetch(`${API_ENDPOINT}/matches/${matchID}`)
            .then((res) => res.json())
            .then((data) => {
                setMatch(data);
                setSearchScores(false);
            });
    };

    useEffect(() => {
        searchMatch();
    }, [matchID]);

    return match ? (
        <div
            key={match.id}
            className="flex-shrink-0 bg-white p-3 rounded-md text-black dark:bg-black dark:text-white border dark:border-neutral-600"
        >
            <Link to={`/match/${match.id}`}>
                <div className="flex justify-between items-center mb-3 gap-6">
                    <p className="text-sm dark:text-neutral-300">{match.sportName}</p>
                    {match.isRunning ? (
                        <div className="flex items-center gap-1">
                            <span className="p-1 rounded-full bg-slate-600 animate-pulse dark:bg-white" />
                            <p className="text-slate-600 text-sm dark:text-neutral-300">
                                Live now
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center text-sm text-neutral-500 gap-1 dark:text-neutral-300">
                            <CalendarDaysIcon className="w-4 h-4" />
                            <p>{new Date(match.endsAt).toDateString()}</p>
                        </div>
                    )}
                </div>
                <div className="flex gap-2 font-semibold">
                    <div className="flex items-center gap-2">
                        <div
                            className={`${match?.playingTeam === match?.teams[0].id &&
                                "text-green-700 dark:text-green-400"
                                }`}
                        >
                            <span className="font-semibold">
                                {match?.teams[0].name}:{"  "}
                            </span>
                            {match?.score[match?.teams[0].name]}
                        </div>
                    </div>
                    <span>VS</span>
                    <div className="flex items-center gap-2">
                        <div
                            className={`${match?.playingTeam === match?.teams[1].id &&
                                "text-sky-700 dark:text-sky-300"
                                }`}
                        >
                            <span className="font-semibold">
                                {match?.teams[1].name}:{"  "}
                            </span>
                            {match?.score[match?.teams[1].name]}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex items-end justify-between">
                <div className="flex text-sm text-gray-500 gap-1 items-center mt-1 dark:text-neutral-300">
                    <MapPinIcon className="w-4 h-4" />
                    <p>{match.location}</p>
                </div>
                <button onClick={searchMatch}>
                    <ArrowPathIcon
                        className={`w-4 h-4 ${searchScores && "rotate-180"} transition-all`}
                    />
                </button>
            </div>
        </div>
    ) : (
        <div
            key={matchID}
            className={`flex-shrink-0 bg-white dark:bg-neutral-600 shadow-md p-3 rounded-md h-24 w-60 animate-pulse duration-75`}
        />
    )
};

export default LiveCard;