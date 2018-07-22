import { SET_TEXT_FILTER } from "./types";

export const setTextFilter = searchText => {
  return {
    type: SET_TEXT_FILTER,
    payload: searchText
  };
};
