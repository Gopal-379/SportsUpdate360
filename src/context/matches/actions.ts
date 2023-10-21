/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";

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

        dispatch({ type: "FETCH_MATCH_SUCCESS", payload: data.matches });
    } catch (err) {
        dispatch({
            type: "FETCH_MATCH_ERROR",
            payload: "Unable to fetch",
        });
        console.log("Error fetching matches: ", err);
    }
};