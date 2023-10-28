/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { Sport, Teams, UserPreferences } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useSportState } from "../../context/sports/context";
import { useTeamState } from "../../context/teams/context";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";
import { BookmarkIcon } from "@heroicons/react/20/solid";

const Preferences = () => {
    const [userPreferences, setUserPreferences] = useState<UserPreferences>({
        sports: [],
        teams: [],
    });
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const sportState: any = useSportState();
    const teamState: any = useTeamState();
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

    function closeModal() {
        setIsOpen(false);
        navigate("../../");
    }

    const token = localStorage.getItem("authToken");

    const changeSport = (sport: number) => {
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
        setUserPreferences(data.preferences);
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

        const patchedUserData = {
            ...JSONdata,
            preferences: data.preferences,
        };
        localStorage.setItem("userData", JSON.stringify(patchedUserData));
        navigate('/');
    };

    const findSportId = (sportName: string) => {
        const sportID: Sport = sports.find((sport: Sport) => sport.name === sportName);
        return sportID ? sportID.id : -1;
    };

    useEffect(() => {
        searchPreferences();
    }, []);

    console.log(sports);

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

                    <div className="fixed inset-0 overflow-y-auto">
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
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-sky-700 text-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-bold leading-6 text-white mb-2"
                                        >
                                            Preferences
                                        </Dialog.Title>
                                        <button
                                            onClick={patchPreferences}
                                            className="bg-white rounded-md px-2 py-1 text-sky-700 flex items-center gap-1"
                                        >
                                            <BookmarkIcon className="h-4 w-4" />
                                            <span className="font-semibold">Save</span>
                                        </button>
                                    </div>
                                    <p className="mb-4 text-sm">
                                        Select your favourite sports and teams for tailored feed.
                                    </p>
                                    <div className="mt-4 bg-white -m-6 p-6 text-black">
                                        {sportError && (
                                            <p className="text-red-500">{sportErrorMessage}</p>
                                        )}
                                        {teamError && (
                                            <p className="text-red-500">{teamErrorMessage}</p>
                                        )}
                                        <p className="font-medium text-lg mb-1">
                                            Select your favorite sports
                                        </p>
                                        <div className="flex items-center gap-2 flex-wrap mb-3">
                                            {sports.map((sport: Sport) =>
                                                userPreferences.sports.includes(sport.id) ? (
                                                    <div
                                                        onClick={() => changeSport(sport.id)}
                                                        key={sport.id}
                                                        className="flex-shrink-0 cursor-pointer flex items-center gap-1 bg-sky-700 rounded-lg px-2 py-1 text-white text-sm"
                                                    >
                                                        <span>{sport.name}</span>
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => changeTeam(sport.id)}
                                                        key={sport.id}
                                                        className="flex-shrink-0 cursor-pointer flex items-center gap-1 border border-sky-600 rounded-lg px-2 py-1 text-sky-700 text-sm"
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
                                            {team
                                                .filter(
                                                    (team: Teams) =>
                                                        userPreferences.sports.length === 0 ||
                                                        userPreferences.sports.includes(
                                                            findSportId(team.plays ? team.plays : "")
                                                        )
                                                )
                                                .map((team: Teams) =>
                                                    userPreferences.teams.includes(team.id) ? (
                                                        <div
                                                            onClick={() => changeTeam(team.id)}
                                                            key={team.id}
                                                            className="flex-shrink-0 cursor-pointer flex items-center gap-1 bg-sky-700 rounded-lg px-2 py-1 text-white text-sm"
                                                        >
                                                            <span>{team.name}</span>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            onClick={() => changeTeam(team.id)}
                                                            key={team.id}
                                                            className="flex-shrink-0 cursor-pointer flex items-center gap-1 border border-sky-600 rounded-lg px-2 py-1 text-sky-700 text-sm"
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