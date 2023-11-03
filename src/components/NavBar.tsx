import { User } from "../types/types";
import { ThemeContext } from "../context/theme"
import { Fragment, useContext, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

const NavBar = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const [enabled, setEnabled] = useState(theme === 'dark');
    const isAuth = !!localStorage.getItem("authToken");

    const userStr = localStorage.getItem("userData");
    const userData: User = JSON.parse(userStr ? userStr : "{}");

    const toggleTheme = () => {
        let newTheme = ''
        if (theme === 'light') {
            newTheme = 'dark'
        } else {
            newTheme = 'light'
        }
        setEnabled(!enabled);
        setTheme(newTheme);
    }
    
    return (
        <>
            <Disclosure as="nav" className="sticky top-0 z-10 bg-slate-300 text-black backdrop-blur-lg dark:bg-black">
                {() => (
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl font-bold dark:text-white">
                                    SportsUpdate360
                                </span>
                            </div>
                        </div>
                        <div className="flex ml-4 items-center md:ml-6">
                            <Switch
                                checked={enabled}
                                onChange={toggleTheme}
                                className={`${
                                    enabled ? "bg-slate-400" : "bg-slate-700"
                                }
                                relative inline-flex h-[25px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                                >
                                <span
                                    aria-hidden="true"
                                    className={`${
                                    enabled ? "translate-x-9" : "translate-x-0"
                                    }
                                    pointer-events-none inline-block h-[22px] w-[22px] pl-1 pr-1 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                    >
                                        {enabled ? (
                                            <div className="flex items-center gap-1">
                                                <MoonIcon className="h-6 w-6" />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                <SunIcon className="h-6 w-6" />
                                            </div>
                                        )}
                                </span>
                            </Switch>
                            {isAuth && (        
                                <Link to="/preferences">
                                    <Cog6ToothIcon className="h-6 w-6 dark:text-white ml-4"/>        
                                </Link>    
                            )}
                            <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="rounded-full p-1 text-black transition-colors dark:text-white">
                                    <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
                                {isAuth ? (
                                    <>
                                        <div className="flex flex-col items-center justify-center my-2">
                                            <span className="text-xl font-semibold text-black">
                                                {userData.name}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {userData.email}
                                            </span>
                                        </div>        
                                        <div className="text-center py-2">
                                            <Link
                                            to="/auth/signout"
                                            className="text-black hover:text-red-500 transition-colors"
                                            >
                                            Sign out
                                            </Link>
                                        </div>
                                        <div className="text-center py-2">
                                            <Link
                                            to="/resetPwd"
                                            className="text-black hover:text-red-500 transition-colors"
                                            >
                                            Reset Password
                                            </Link>
                                        </div>
                                    </>      
                                ) : (
                                    <>            
                                        <div className="text-center py-2">
                                            <Link
                                                to="/auth/signin"
                                                className="text-black hover:text-slate-600 transition-colors"
                                            >
                                                Sign in
                                            </Link>
                                        </div>
                                        <div className="text-center py-2">
                                            <Link
                                                to="/auth/signup"
                                                className="text-black hover:text-slate-600 transition-colors"
                                            >
                                                Sign up
                                            </Link>
                                        </div> 
                                    </>                
                                )}
                                </Menu.Items>
                            </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
                )}
            </Disclosure>
        </>
    );
};

export default NavBar;