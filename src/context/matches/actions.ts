/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
import { Match } from "../../types/types";

export const searchMatches = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
        dispatch({ type: "FETCH_MATCH_REQUEST" });
        const res = await fetch(`${API_ENDPOINT}/matches`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        dispatch({
            type: "FETCH_MATCH_SUCCESS", payload: data.matches.sort(
                (match1: Match, match2: Match) => new Date(match2.endsAt).getTime() - new Date(match1.endsAt).getTime()
            ),
        });
    } catch (err) {
        console.log("Error fetching matches: ", err);
        dispatch({
            type: "FETCH_MATCH_ERROR",
            payload: "Unable to fetch",
        });
    }
};