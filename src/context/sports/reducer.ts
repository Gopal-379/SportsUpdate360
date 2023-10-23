import { Sport } from "../../types/types";

export interface SportState {
    sports: Sport[];
    isLoading: boolean;
    isError: boolean;
    errMsg: string;
}

export type SportActions =
    | { type: "FETCH_SPORT_REQUEST" }
    | { type: "FETCH_SPORT_SUCCESS"; payload: Sport[] }
    | { type: "FETCH_SPORT_ERROR"; payload: string };

export const initialState: SportState = {
    sports: [],
    isLoading: false,
    isError: false,
    errMsg: "",
};

export const sportReducer = (
    state: SportState = initialState,
    action: SportActions,
): SportState => {
    switch (action.type) {
        case "FETCH_SPORT_REQUEST":
            return {
                ...state,
                isLoading: true,
            };
        case "FETCH_SPORT_SUCCESS":
            return {
                ...state,
                isLoading: false,
                sports: action.payload,
            };
        case "FETCH_SPORT_ERROR":
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