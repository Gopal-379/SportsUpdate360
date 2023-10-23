import LiveNews from "./LiveNews";
import LiveSports from "./LiveSports";

const Dashboard = () => {
    return (
        <>
            <div className="w-full bg-slate-300 p-4 sm:pl-5 lg:pl-6 py-4 dark:bg-black">
                <LiveSports />
            </div>
            <div className="w-full bg-slate-300 p-4 sm:pl-5 lg:pl-6 py-4 dark:bg-black">
                <LiveNews />
            </div>
        </>
    );
};

export default Dashboard;