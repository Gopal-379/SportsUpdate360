/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";

export const searchArticles = async (dispatch: any) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
        dispatch({ type: "FETCH_ARTICLE_REQUEST" });
        const res = await fetch(`${API_ENDPOINT}/articles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();

        dispatch({ type: "FETCH_ARTICLE_SUCCESS", payload: data });
    } catch (err) {
        console.log("Error fetching articles", err);
        dispatch({ type: "FETCH_ARTICLE_ERROR", payload: "Unable to fetch articles" });
    }
};