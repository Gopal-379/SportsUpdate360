/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { useMatchState } from "../../context/matches/context"
import { Match } from "../../types/types";
import { Link } from "react-router-dom";

const LiveSports = () => {
    const state: any = useMatchState();
    const { matches, isLoading, isError, errMsg } = state;

    return (
        <div className="scroll-bar">
            <p className="font-bold text-2xl mb-4 text-black dark:text-white">Live Sports</p>
            {isError && <p className="text-red-500">{errMsg}</p>}
            {isLoading && (
                <div className="flex items-center justify-center overflow-x-auto gap-2 pb-1 rounded-l-md">
                    {isLoading && 
                        [...Array(10).keys()].map((id) => (
                        <div
                            key={id}
                            className="flex-shrink-0 bg-white p-5 rounded-md shadow-md h-28 w-80"
                        />
                    ))}
                </div>
            )}
            <div className="flex overflow-x-auto gap-2 p-2 -mr-8">
                {matches && matches.reverse().map((match: Match) => (
                    <Link
                        to={`/match/${match.id}`}
                        key={match.id}
                        className="flex-shrink-0 bg-white p-3 rounded-md text-black"
                    >
                        <div className="flex justify-between items-center mb-3 gap-6">
                            <p className="text-sm">{match.sportName}</p>
                            {match.isRunning ? (
                                <div className="flex items-center gap-1">
                                    <span className="p-1 rounded-full bg-sky-700 animate-pulse" />
                                    <p className="text-sky-700 text-sm">Live Now</p>
                                </div>
                            ) : (
                                <div className="flex items-center text-sm text-gray-500 gap-1">
                                    <CalendarDaysIcon className="w-4 h-4" />
                                    <p>{new Date(match.endsAt).toDateString()}</p>
                                </div>    
                            )}
                        </div>
                        <div className="flex mt-2 items-center font-semibold gap-2">
                            <span>{match.teams[0].name}</span>
                            <span>VS</span>
                            <span>{match.teams[1].name}</span>
                        </div>
                        <div className="flex text-sm text-gray-500 gap-1 items-center mt-1">
                            <MapPinIcon className="w-4 h-4" />
                            <p>{match.location}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default LiveSports;