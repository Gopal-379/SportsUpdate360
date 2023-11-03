import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

const LiveSports = React.lazy(() => import("./LiveSports"));
const LiveNews = React.lazy(() => import("./LiveNews"));

const Dashboard = () => {
    return (
        <>
            <div className="w-full bg-slate-300 p-4 sm:pl-5 lg:pl-6 py-4 dark:bg-black">
                <ErrorBoundary>
                    <Suspense
                        fallback={<div className="suspense-loading">Loading....</div>}
                    >
                        <LiveSports />
                    </Suspense>
                </ErrorBoundary>
            </div>
            <div className="w-full bg-slate-300 p-4 sm:pl-5 lg:pl-6 py-4 dark:bg-black">
                <ErrorBoundary>
                    <Suspense
                        fallback={<div className="suspense-loading">Loading....</div>}
                    >
                        <LiveNews />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </>
    );
};

export default Dashboard;