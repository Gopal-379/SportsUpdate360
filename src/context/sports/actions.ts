/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";

export const searchSports = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";
    
    try {
        dispatch({ type: "FETCH_SPORT_REQUEST" });
        const res = await fetch(`${API_ENDPOINT}/sports`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        dispatch({ type: "FETCH_SPORT_SUCCESS", payload: data.sports });
    } catch (err) {
        console.log("Error fetching sports", err);
        dispatch({ type: "FETCH_SPORT_ERROR", payload: "Unable to fetch sports information" });
    }
};