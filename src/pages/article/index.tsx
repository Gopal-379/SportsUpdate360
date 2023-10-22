/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { ArticleDetails } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { Transition, Dialog } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";

const ArticleDetailsModel = () => {
    const [article, setArticle] = useState<ArticleDetails | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const { articleId } = useParams();
    const navigate = useNavigate();

    function closeModal() {
        setIsOpen(false);
        navigate('../../');
    }

    const searchArticle = () => {
        fetch(`${API_ENDPOINT}/articles/${articleId}`)
            .then((res) => res.json())
            .then((data) => {
                setArticle(data);
                setIsOpen(true);
            });
    };

    useEffect(() => {
        searchArticle();
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
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-green-600 text-white p-6 text-left align-middle shadow-xl transition-all dark:bg-stone-950">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-bold leading-6 text-white"
                                    >
                                        {article?.title}
                                    </Dialog.Title>
                                    <p className="mb-4 text-sm">{article?.summary}</p>
                                    <div className="flex justify-between items-center mt-1 mb-3 gap-6 ">
                                        <p className="text-sm">{article?.sport.name}</p>
                                        <div className="flex items-center text-sm gap-1">
                                        <CalendarDaysIcon className="w-4 h-4" />
                                        <p>
                                            {article?.date && new Date(article.date).toDateString()}
                                        </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 bg-white -m-6 p-6 text-black">
                                        <p className="font-bold text-lg">Story</p>
                                        <p>{article?.content}</p>
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

export default ArticleDetailsModel;