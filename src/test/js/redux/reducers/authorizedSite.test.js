import { SET_SITES, POST_SITE, DELETE_SITE } from "../../../../main/js/react/redux/types";
import reducer from "../../../../main/js/react/redux/reducers/authorizedSite";

const expect = global.expect;
const initialState = {
  sites: [],
};

describe("Authorized site reducer", () => {
  it("Should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Should Handle SET_SITES", () => {
    const expectedState = {
      sites: [{ id: 1, url: "www.example.com" }],
    };

    const mockAction = {
      type: SET_SITES,
      payload: [{ id: 1, url: "www.example.com" }],
    };

    expect(reducer(undefined, mockAction)).toEqual(expectedState);
  });

  it("Should Handle POST_SITE", () => {
    const expectedState = {
      sites: [{ id: 1, url: "www.example.com" }],
    };

    const mockAction = {
      type: POST_SITE,
      payload: { id: 1, url: "www.example.com" },
    };

    expect(reducer(undefined, mockAction)).toEqual(expectedState);
  });

  it("Should Handle DELETE_SITE", () => {
    const startingState = {
      sites: [{ id: 1, url: "www.example.com" }],
    };

    const mockAction = {
      type: DELETE_SITE,
      payload: { id: 1, url: "www.example.com" },
    };

    expect(reducer(startingState, mockAction)).toEqual(initialState);
  });
});
