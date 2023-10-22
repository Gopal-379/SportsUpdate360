import { Article } from "../../types/types";

export interface ArticleState {
    articles: Article[];
    isLoading: boolean;
    isError: boolean;
    errMsg: string;
}

export type ArticleActions =
    | { type: "FETCH_ARTICLE_REQUEST"}
    | { type: "FETCH_ARTICLE_SUCCESS"; payload: Article[] }
    | { type: "FETCH_ARTICLE_ERROR"; payload: string }

export const initialState: ArticleState = {
    articles: [],
    isLoading: false,
    isError: false,
    errMsg: "",
};

export const articleReducer = (
    state: ArticleState = initialState,
    action: ArticleActions
): ArticleState => {
    switch (action.type) {
        case "FETCH_ARTICLE_REQUEST":
            return {
                ...state,
                isLoading: true,
            }
        case "FETCH_ARTICLE_SUCCESS":
            return {
                ...state,
                isLoading: false,
                articles: action.payload,
            }
        case "FETCH_ARTICLE_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errMsg: action.payload,
            }
        default:
            return state;
    }
};
