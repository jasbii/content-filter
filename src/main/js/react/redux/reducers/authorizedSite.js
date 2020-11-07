import { SET_SITES, POST_SITE, DELETE_SITE } from "../types";

const initialState = {
  sites: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SITES:
      if (typeof action.payload === "string") {
        return {
          ...state,
          sites: [],
        };
      }
      return {
        ...state,
        sites: action.payload,
      };
    case POST_SITE:
      return {
        ...state,
        sites: [action.payload, ...state.sites],
      };
    case DELETE_SITE:
      return {
        ...state,
        sites: state.sites.filter((site) => site.url !== action.payload.url),
      };
    default:
      return state;
  }
}
