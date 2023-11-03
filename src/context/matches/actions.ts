/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
import { Match } from "../../types/types";

export const searchMatches = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";
    const userSports: string[] = JSON.parse(localStorage.getItem("userData") ?? JSON.stringify({"preferences":{}})).preferences.sports ?? [];
    const userTeams: number[] = JSON.parse(localStorage.getItem("userData") ?? JSON.stringify({"preferences":{}})).preferences.teams ?? [];
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
        const filterBySports = data.matches.filter((match: Match) => userSports.length === 0 || userSports.includes(match.sportName));
        const filterByTeams = filterBySports.filter((match: Match) => {
            let flag = false;
            for (let team of match.teams) {
                if (userTeams.includes(team.id)) {
                    flag = true;
                    break;
                }
            }
            return userTeams.length === 0 || flag;
        })
        dispatch({
            type: "FETCH_MATCH_SUCCESS", payload: filterByTeams.sort(
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