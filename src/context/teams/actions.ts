/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";

export const seachTeams = async (dispatch: any) => {
    const token = localStorage.getItem("authToken");

    try {
        dispatch({ type: "FETCH_TEAM_REQUEST" });
        const res = await fetch(`${API_ENDPOINT}/teams`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        dispatch({ type: "FETCH_TEAM_SUCCESS", payload: data });
    } catch (err) {
        console.log("Error fetching teams: ", err);
        dispatch({ type: "FETCH_TEAM_ERROR", payload: "Unable to fetch teams" });
    }
};