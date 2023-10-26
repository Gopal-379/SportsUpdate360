/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { TeamActions, TeamState, initialState, teamsReducer } from "./reducer";

const TeamStateContext = createContext<TeamState | undefined>(undefined);

type TeamDispatch = React.Dispatch<TeamActions>;

const TeamDispatchContext = createContext<TeamDispatch | undefined>(undefined);

export const TeamsProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(teamsReducer, initialState);

    return (
        <TeamStateContext.Provider value={state}>
            <TeamDispatchContext.Provider value={dispatch}>
                {children}
            </TeamDispatchContext.Provider>
        </TeamStateContext.Provider>
    );
};

export const useTeamState = () => useContext(TeamStateContext);
export const useTeamDispatch = () => useContext(TeamDispatchContext);