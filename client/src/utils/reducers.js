import { useReducer } from 'react';
import {
    UPDATE_WINES,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_WINES:
            return {
                ...state,
                wines: [...action.wines],
            };

        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [action.categories],
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory,
            };

        default:
            return state;
    }
};

export function useWineReducer(initialState) {
    return useReducer(reducer, initialState);
}