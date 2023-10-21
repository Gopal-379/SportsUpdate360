/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { MatchActions, MatchState, initialState, matchReducer } from "./reducer";

const MatchStateContext = createContext<MatchState | undefined>(undefined);

type MatchDispatch = React.Dispatch<MatchActions>;

const MatchDispatchContext = createContext<MatchDispatch | undefined>(undefined);

export const MatchesProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(matchReducer, initialState);

    return (
        <MatchStateContext.Provider value={state}>
            <MatchDispatchContext.Provider value={dispatch}>
                {children}
            </MatchDispatchContext.Provider>
        </MatchStateContext.Provider>
    );
};

export const useMatchState = () => useContext(MatchStateContext);
export const useMatchDispatch = () => useContext(MatchDispatchContext);