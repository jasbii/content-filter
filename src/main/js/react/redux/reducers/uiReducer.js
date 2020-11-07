import {
  SET_MESSAGES,
  CLEAR_MESSAGES,
  START_LOADING_SITES,
  STOP_LOADING_SITES,
  START_LOADING_POST,
  STOP_LOADING_POST,
  START_LOADING_DELETE,
  STOP_LOADING_DELETE,
} from "../types";

const initialState = {
  message: {},
  loading: {
    post: false,
    sites: false,
    delete: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: {},
      };
    case START_LOADING_SITES:
      return {
        ...state,
        loading: {
          ...state.loading,
          sites: true,
        },
      };
    case STOP_LOADING_SITES:
      return {
        ...state,
        loading: {
          ...state.loading,
          sites: false,
        },
      };
    case START_LOADING_POST:
      return {
        ...state,
        loading: {
          ...state.loading,
          post: true,
        },
      };
    case STOP_LOADING_POST:
      return {
        ...state,
        loading: {
          ...state.loading,
          post: false,
        },
      };
    case START_LOADING_DELETE:
      return {
        ...state,
        loading: {
          ...state.loading,
          delete: true,
        },
      };
    case STOP_LOADING_DELETE:
      return {
        ...state,
        loading: {
          ...state.loading,
          delete: false,
        },
      };
    default:
      return state;
  }
}
