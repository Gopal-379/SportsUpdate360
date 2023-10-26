import { Teams } from "../../types/types";

export interface TeamState {
    team: Teams[];
    isLoading: boolean;
    isError: boolean;
    errMsg: string;
}

export type TeamActions =
    | { type: "FETCH_TEAM_REQUEST" }
    | { type: "FETCH_TEAM_SUCCESS", payload: Teams[] }
    | { type: "FETCH_TEAM_ERROR", payload: string };

export const initialState: TeamState = {
    team: [],
    isLoading: false,
    isError: false,
    errMsg: "",
};

export const teamsReducer = (
    state: TeamState = initialState,
    action: TeamActions
): TeamState => {
    switch (action.type) {
        case "FETCH_TEAM_REQUEST":
            return {
                ...state,
                isLoading: true,
            };
        case "FETCH_TEAM_SUCCESS":
            return {
                ...state,
                isLoading: false,
                team: action.payload,
            };
        case "FETCH_TEAM_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errMsg: action.payload,
            };
        default:
            return state;
    }
};