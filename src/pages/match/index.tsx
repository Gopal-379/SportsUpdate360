/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { MatchDetails } from "../../types/types"
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { Transition, Dialog } from "@headlessui/react";
import { CalendarDaysIcon, ArrowPathIcon } from "@heroicons/react/20/solid";

const MatchDetailsModal = () => {
    const [match, setMatch] = useState<MatchDetails | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const { matchId } = useParams();
    const navigate = useNavigate();

    function closeModal() {
        setIsOpen(false); 
        navigate('../../');
    }

    const searchMatch = () => {
        fetch(`${API_ENDPOINT}/matches/${matchId}`)
            .then((res) => res.json())
            .then((data) => {
                setMatch(data);
                setIsOpen(true);
            });
    };

    useEffect(() => {
        searchMatch();
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
                        <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-green-600 text-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-2xl font-bold leading-6 text-white"
                        >
                            {match?.name}
                        </Dialog.Title>
                        <div className="flex justify-between items-center mt-1 mb-3 gap-6">
                            <p className="text-sm">{match?.sportName}</p>
                            {match?.isRunning ? (
                                <div className="flex items-center gap-1">
                                    <span className="p-1 rounded-full bg-white dark:bg-black animate-pulse" />
                                    <p className="text-sm">Live now</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-gray-200 dark:text-neutral-800">
                                    <div className="flex items-center text-sm gap-1">
                                    <CalendarDaysIcon className="w-4 h-4" />
                                    <p>
                                        {match?.startsAt &&
                                        new Date(match.startsAt).toDateString()}
                                    </p>
                                    </div>
                                    <p>to</p>
                                    <p className="text-sm">
                                    {match?.startsAt &&
                                        new Date(match.startsAt).toDateString()}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="my-2">
                            <div className="flex gap-2 items-center">
                            <p className="font-bold text-lg">Scores</p>
                            <button onClick={searchMatch}>
                                <ArrowPathIcon className="w-4 h-4" />
                            </button>
                            </div>
                            <div className="ml-4">
                            <div className="flex items-center gap-2">
                                <div>
                                <span className="font-semibold">
                                    {match?.teams[0].name}:{"  "}
                                </span>
                                {match?.score[match?.teams[0].name]}
                                </div>
                                {match?.playingTeam === match?.teams[0].id && (
                                <span className="bg-green-500 rounded-full px-2 text-white py-1 text-xs py-1 flex items-center">
                                    <span className="p-1 rounded-full bg-green-700"></span>                    
                                    <span>Playing</span>
                                </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <div>
                                <span className="font-semibold">
                                    {match?.teams[1].name}:{"  "}
                                </span>
                                {match?.score[match?.teams[1].name]}
                                </div>
                                {match?.playingTeam === match?.teams[1].id && (
                                <span className="bg-green-500 rounded-full px-2 text-white py-1 text-xs py-1 flex items-center">
                                    <span className="p-1 rounded-full bg-green-700"></span>                    
                                    <span>Playing</span>
                                </span>
                                )}
                            </div>
                            </div>
                        </div>
                        <div className="mt-4 bg-white -m-6 p-6 text-black">
                            <p className="font-bold text-lg">Story</p>
                            <p>{match?.story}</p>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default MatchDetailsModal;