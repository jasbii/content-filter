import "regenerator-runtime/runtime";
import axios from "axios";
import {
  SET_SITES,
  SET_MESSAGES,
  CLEAR_MESSAGES,
  START_LOADING_POST,
  STOP_LOADING_POST,
  START_LOADING_SITES,
  STOP_LOADING_SITES,
  START_LOADING_DELETE,
  STOP_LOADING_DELETE,
} from "../types";
import { validURL, validWord } from "../utils/validators";

//CREATE
export const postSite = (site) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_MESSAGES,
    });
    dispatch({
      type: START_LOADING_POST,
    });
    if (!validURL(site.url)) {
      dispatch({
        type: SET_MESSAGES,
        payload: { url: "Sorry! this url is invalid. Please check this value and try again" },
      });
    } else if (!validWord(site.word)) {
      dispatch({
        type: SET_MESSAGES,
        payload: { word: "Sorry! this word is invalid. (Max. 15 chars)" },
      });
    } else {
      const res = await axios.post("/api/content/check", site);
      if (res.data.state == "accepted") {
        dispatch(getSites());
        dispatch({
          type: SET_MESSAGES,
          payload: { text: "This url has been accepted", severity: "success" },
        });
      } else {
        dispatch({
          type: SET_MESSAGES,
          payload: { text: "This url has been rejected", severity: "error" },
        });
      }
    }
    dispatch({
      type: STOP_LOADING_POST,
    });
  } catch (error) {}
};

//READ
export const getSites = () => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING_SITES,
    });
    const res = await axios.get("/api/content");
    if (res.status == 200) {
      dispatch({
        type: SET_SITES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: SET_SITES,
        payload: [],
      });
    }
    dispatch({
      type: STOP_LOADING_SITES,
    });
  } catch (error) {}
};
//DELETE
export const deleteSite = (site) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_MESSAGES,
    });
    dispatch({
      type: START_LOADING_DELETE,
    });
    const res = await axios.delete("/api/content", { data: site });
    if (res.status == 200) {
      dispatch(getSites());
      dispatch({
        type: SET_MESSAGES,
        payload: { text: "The selected url has been deleted", severity: "warning" },
      });
    }
    dispatch({
      type: STOP_LOADING_DELETE,
    });
  } catch (error) {}
};
