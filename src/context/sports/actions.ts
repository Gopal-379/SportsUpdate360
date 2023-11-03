/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
import { Sport } from "../../types/types";

export const searchSports = async (dispatch: any) => {
    const userSports: string[] = JSON.parse(localStorage.getItem("userData") ?? JSON.stringify({ "prefernces": {} })).preferences.sports ?? [];
    try {
        dispatch({ type: "FETCH_SPORT_REQUEST" });
        const res = await fetch(`${API_ENDPOINT}/sports`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        const data = await res.json();
        const filterBySports = data.sports.filter((sport: Sport) => userSports.length === 0 || userSports.includes(sport.name));
        dispatch({ type: "FETCH_SPORT_SUCCESS", payload: filterBySports });
    } catch (err) {
        console.log("Error fetching sports", err);
        dispatch({ type: "FETCH_SPORT_ERROR", payload: "Unable to fetch sports information" });
    }
};