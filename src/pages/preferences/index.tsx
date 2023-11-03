/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState, useContext } from "react";
import { Sport, Teams, UserPreferences } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { useMatchDispatch } from "../../context/matches/context";
import { useArticleDispatch } from "../../context/articles/context";
import { useSportDispatch } from "../../context/sports/context";
import { useTeamDispatch } from "../../context/teams/context";
import { searchMatches } from "../../context/matches/actions";
import { searchArticles } from "../../context/articles/actions";
import { searchSports } from "../../context/sports/actions";
import { searchTeams } from "../../context/teams/actions";
import { ThemeContext } from "../../context/theme";

const Preferences = () => {
    const { theme } = useContext(ThemeContext); 
    const [userPreferences, setUserPreferences] = useState<UserPreferences>({
        sports: [],
        teams: [],
    });
    const [sports, setSport] = useState<Sport[]>([]);
    const [teams, setTeam] = useState<Teams[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken") ?? "";
    const matchDipatch = useMatchDispatch();
    const articleDispatch = useArticleDispatch();
    const sportDispatch = useSportDispatch();
    const teamDispatch = useTeamDispatch();

    const searchAllSports = async () => {
        try {
            const res = await fetch(`${API_ENDPOINT}/sports`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setSport(data.sports);
        } catch (err) {
            console.log('Error Fetching Sports: ', err);
        }
    };

    const searchAllTeams = async () => {
        try {
            const res = await fetch(`${API_ENDPOINT}/teams`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setTeam(data);
        } catch (err) {
            console.log("Error fetching teams:", err);
        }
    }
    
    function closeModal() {
        setIsOpen(false);
        navigate("../../");
    }

    const changeSport = (sport: string) => {
        if (userPreferences.sports.includes(sport)) {
            setUserPreferences((userPreferences) => {
                return {
                    ...userPreferences,
                    sports: userPreferences.sports.filter(
                        (selectedSport) => selectedSport !== sport
                    ),
                };
            });
        } else {
            setUserPreferences((userPreferences) => {
                return {
                    ...userPreferences,
                    sports: [...userPreferences.sports, sport],
                };
            });
        }
    };

    const changeTeam = (team: number) => {
        if (userPreferences.teams.includes(team)) {
            setUserPreferences((userPreferences) => {
                return {
                    ...userPreferences,
                    teams: userPreferences.teams.filter(
                        (selectedTeam) => selectedTeam !== team
                    ),
                };
            });
        } else {
            setUserPreferences((userPreferences) => {
                return {
                    ...userPreferences,
                    teams: [...userPreferences.teams, team],
                };
            });
        }
    };

    const searchPreferences = async () => {
        const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        setUserPreferences(
            Object.keys(data.preferences).includes("sports") && Object.keys(data.preferences).includes("teams") ?
                data.preferences : {
                    sports: [],
                    teams: [],
                }
        );
        setIsOpen(true);
    }

    const patchPreferences = async () => {
        const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                preferences: userPreferences,
            }),
        });
        const data = await res.json();
        const userData = localStorage.getItem("userData") ?? "";
        const JSONdata = JSON.parse(userData);
        console.log(data);
        const patchedUserData = {
            ...JSONdata,
            preferences: data.preferences,
        };
        localStorage.setItem("userData", JSON.stringify(patchedUserData));
        searchMatches(matchDipatch);
        searchArticles(articleDispatch);
        searchSports(sportDispatch);
        searchTeams(teamDispatch);
        navigate('/');
    };

    useEffect(() => {
        searchAllSports();
        searchAllTeams();
        searchPreferences();
    }, []);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className={`fixed inset-0 overflow-y-auto ${theme === "dark" && "dark"}`}>
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-slate-300 text-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black dark:text-neutral-100 dark:border dark:border-white">
                                    <div className="flex justify-between items-center">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-bold leading-6 text-black mb-2 dark:text-white"
                                        >
                                            Preferences
                                        </Dialog.Title>
                                        <button
                                            onClick={patchPreferences}
                                            className="bg-white rounded-md px-2 py-1 text-black flex items-center gap-1 dark:bg-black dark:text-neutral-100"
                                        >
                                            <FunnelIcon className="h-4 w-4" />
                                            <span className="font-semibold">Apply</span>
                                        </button>
                                    </div>
                                    <p className="mb-4 text-sm text-black">
                                        Select your favourite sports and teams.
                                    </p>
                                    <div className="bg-slate-300 -m-6 p-6 text-black dark:bg-black dark:text-white">
                                        <p className="font-medium text-lg mb-1">
                                            Select your favorite sports
                                        </p>
                                        <div className="flex items-center gap-2 flex-wrap mb-3">
                                            {sports.map((sport: Sport) =>
                                                userPreferences.sports.includes(sport.name) ? (
                                                    <div
                                                        onClick={() => changeSport(sport.name)}
                                                        key={sport.id}
                                                        className="flex-shrink-0 cursor-pointer flex items-center gap-1 bg-black rounded-lg px-2 py-1 text-white text-sm dark:bg-white dark:text-neutral-700 mb-3 select-none"
                                                    >
                                                        <span>{sport.name}</span>
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => changeSport(sport.name)}
                                                        key={sport.id}
                                                        className="flex-shrink-0 cursor-pointer flex items-center gap-1 border border-black rounded-lg px-2 py-1 text-neutral-700 text-sm dark:text-white dark:border-white mb-3 select-none"
                                                    >
                                                        <span>{sport.name}</span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <p className="font-medium text-lg mb-1">
                                            Select your favorite teams
                                        </p>
                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                            {teams
                                                .filter(
                                                    (team: Teams) =>
                                                        userPreferences.sports.length === 0 || userPreferences.sports.includes(team.plays ? team.plays : "") || userPreferences.teams.includes(team.id)
                                                )
                                                .map((team: Teams) =>
                                                    userPreferences.teams.includes(team.id) ? (
                                                        <div
                                                            onClick={() => changeTeam(team.id)}
                                                            key={team.id}
                                                            className="flex-shrink-0 cursor-pointer flex items-center gap-1 bg-black rounded-lg px-2 py-1 text-white text-sm dark:bg-white dark:text-neutral-700 mb-3 select-none"
                                                        >
                                                            <span>{team.name}</span>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            onClick={() => changeTeam(team.id)}
                                                            key={team.id}
                                                            className="flex-shrink-0 cursor-pointer flex items-center gap-1 border border-black rounded-lg px-2 py-1 text-neutral-700 text-sm dark:text-white dark:border-white mb-3 select-none"
                                                        >
                                                            <span>{team.name}</span>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default Preferences;