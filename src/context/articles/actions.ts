/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
import { Article } from "../../types/types";

export const searchArticles = async (dispatch: any) => {
    const userSports: string[] = JSON.parse(localStorage.getItem("userData") ?? JSON.stringify({"preferences":{}})).preferences.sports ?? [];
    const userTeams: number[] = JSON.parse(localStorage.getItem("userData") ?? JSON.stringify({"preferences":{}})).preferences.teams ?? [];
    try {
        dispatch({ type: "FETCH_ARTICLE_REQUEST" });
        const res = await fetch(`${API_ENDPOINT}/articles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        const filterBySports = data.filter((article: Article) => userSports.length === 0 || userSports.includes(article.sport.name));
        const filterByTeams = filterBySports.filter((article: Article) => {
            let flag = false;
            for (let team of article.teams) {
                if (userTeams.includes(team.id)) {
                    flag = true;
                    break;
                }
            }
            return userTeams.length === 0 || flag;
        })

        dispatch({ type: "FETCH_ARTICLE_SUCCESS", payload: filterByTeams });
    } catch (err) {
        console.log("Error fetching articles", err);
        dispatch({ type: "FETCH_ARTICLE_ERROR", payload: "Unable to fetch articles" });
    }
};