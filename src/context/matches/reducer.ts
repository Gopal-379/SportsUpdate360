import { Match } from "../../types/types";

export interface MatchState {
    matches: Match[];
    isLoading: boolean;
    isError: boolean;
    errMsg: string;
}

export type MatchActions =
    | { type: "FETCH_MATCH_REQUEST" }
    | { type: "FTECH_MATCH_SUCCESS"; payload: Match[] }
    | { type: "FETCH_MATCH_ERROR"; payload: string };

export const initialState: MatchState = {
    matches: [],
    isLoading: false,
    isError: false,
    errMsg: "",
};

export const matchReducer = (
    state: MatchState = initialState,
    action: MatchActions
): MatchState => {
    switch (action.type) {
        case "FETCH_MATCH_REQUEST":
            return {
                ...state,
                isLoading: true,
            };
        case "FTECH_MATCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                matches: action.payload,
            };
        case "FETCH_MATCH_ERROR":
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