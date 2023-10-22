/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { ArticleActions, ArticleState, articleReducer, initialState } from "./reducer";

const ArticleStateContext = createContext<ArticleState | undefined>(undefined);

type ArticleDispatch = React.Dispatch<ArticleActions>;

const ArticleDispatchContext = createContext<ArticleDispatch | undefined>(undefined);

export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(articleReducer, initialState);

    return (
        <ArticleStateContext.Provider value={state}>
            <ArticleDispatchContext.Provider value={dispatch}>
                {children}
            </ArticleDispatchContext.Provider>
        </ArticleStateContext.Provider>
    );
};

export const useArticleState = () => useContext(ArticleStateContext);
export const useArticleDispatch = () => useContext(ArticleDispatchContext);