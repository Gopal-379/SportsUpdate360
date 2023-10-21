/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { useMatchState } from "../context/matches/context"
import { Match } from "../types/types";

const LiveSports = () => {
    const state: any = useMatchState();
    const { matches, isLoading, isError, errMsg } = state;

    return (
        <div>
            <p className="font-bold text-xl mb-4">Live Sports</p>
            {isError && <p className="text-red-500">{errMsg}</p>}
            {isLoading && (
                <div className="flex overflow-x-auto gap-2 p-1">
                    {[...Array(15).keys()].map((id) => (
                        <div
                            key={id}
                            className="flex-shrink-0 bg-slate-200 p-3 rounded-md outline-blue-300 h-28 w-60 animate-pulse"
                        />
                    ))}
                </div>
            )}
            <div className="flex overflow-x-auto gap-2 p-2 -mr-8">
                {matches && matches.reverse().map((match: Match) => (
                    <div
                        key={match.id}
                        className={`flex-shrink-0 bg-gray-200 p-3 rounded-md outline-blue-300 ${match.isRunning && "outline"}`}
                    >
                        <div className="flex justify-between items-center mb-3 gap-6">
                            <p className="text-sm">{match.sportName}</p>
                            <div className="flex items-center text-sm text-gray-500 gap-1">
                                <CalendarDaysIcon className="w-4 h-4" />
                                <p>{new Date(match.endsAt).toDateString()}</p>
                            </div>
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LiveSports;