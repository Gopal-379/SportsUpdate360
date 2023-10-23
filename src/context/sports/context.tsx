/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from "react";
import { SportActions, SportState, initialState, sportReducer } from "./reducer";

const SportStateContext = createContext<SportState | undefined>(undefined);

type SportDispatch = React.Dispatch<SportActions>;

const SportDispatchContext = createContext<SportDispatch | undefined>(undefined);

export const SportsProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(sportReducer, initialState);

    return (
        <SportStateContext.Provider value={state}>
            <SportDispatchContext.Provider value={dispatch}>
                {children}
            </SportDispatchContext.Provider>
        </SportStateContext.Provider>
    );
};

export const useSportState = () => useContext(SportStateContext);
export const useSportDispatch = () => useContext(SportDispatchContext);
