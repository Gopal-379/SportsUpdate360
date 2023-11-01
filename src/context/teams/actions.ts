/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
import { Teams } from "../../types/types";

export const searchTeams = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";
    const userSports: string[] = JSON.parse(localStorage.getItem("userData") ?? "").preferences.sports ?? [];
    const userTeams: number[] = JSON.parse(localStorage.getItem("userData") ?? "").preferences.teams ?? [];
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
        const filterByTeams = data.filter((team: Teams) => userSports.length === 0 || userSports.includes(team.plays ? team.plays : "") || userTeams.includes(team.id));
        dispatch({ type: "FETCH_TEAM_SUCCESS", payload: filterByTeams });
    } catch (err) {
        console.log("Error fetching teams: ", err);
        dispatch({ type: "FETCH_TEAM_ERROR", payload: "Unable to fetch teams" });
    }
};