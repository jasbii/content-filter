import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import { SET_SITES } from "../../../../main/js/react/redux/types";
import { postSite, getSites, deleteSite } from "../../../../main/js/react/redux/actions/authorizedSiteActions";

const expect = global.expect;
const middlewares = [thunk];
const mockstore = configureMockStore(middlewares);
const payload = { test: "test" };

describe("Authorized site actions", () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it("Test postSite(site) accepted", () => {
    const store = mockstore({});
    const expectedData = [{ id: 1, url: "www.example1.com" }];

    moxios.stubRequest("/api/content/check", { status: 200, response: { state: "accepted" } });

    const mockAction = {
      payload: { severity: "success", text: "This url has been accepted" },
      type: "SET_MESSAGES",
    };

    return store.dispatch(postSite({ url: "www.example.com", word: "test" })).then(() => {
      expect(store.getActions()).toContainEqual(mockAction);
    });
  });

  it("Test postSite(site) rejected", () => {
    const store = mockstore({});
    const expectedData = [];

    moxios.stubRequest("/api/content/check", { status: 200, response: { state: "rejected" } });

    const mockAction = {
      payload: { url: "Sorry! this url is invalid. Please check this value and try again" },
      type: "SET_MESSAGES",
    };

    return store.dispatch(postSite({ url: "badsitecom", word: "bad" })).then(() => {
      expect(store.getActions()).toContainEqual(mockAction);
    });
  });

  it("Test getSites()", () => {
    const store = mockstore({});
    const expectedData = [{ id: 1, url: "www.example.com" }];

    moxios.stubRequest("/api/content", { status: 200, response: expectedData });

    const mockAction = {
      type: SET_SITES,
      payload: expectedData,
    };

    return store.dispatch(getSites()).then(() => {
      expect(store.getActions()).toContainEqual(mockAction);
    });
  });

  it("Test getSites() if empty", () => {
    const store = mockstore({});
    const expectedData = [];

    moxios.stubRequest("/api/content", { status: 204, response: expectedData });

    const mockAction = {
      type: SET_SITES,
      payload: expectedData,
    };

    return store.dispatch(getSites()).then(() => {
      expect(store.getActions()).toContainEqual(mockAction);
    });
  });

  it("Test deleteSite(site) found", () => {
    const store = mockstore({ sites: [{ id: 1, url: "www.example.com" }] });

    moxios.stubRequest("/api/content", { status: 200 });

    const mockAction = {
      payload: { severity: "warning", text: "The selected url has been deleted" },
      type: "SET_MESSAGES",
    };

    return store.dispatch(deleteSite({ url: "www.example.com" })).then(() => {
      expect(store.getActions()).toContainEqual(mockAction);
    });
  });

  it("Test deleteSite(site) not", () => {
    const store = mockstore({ sites: [{ id: 1, url: "www.notexample.com" }] });

    moxios.stubRequest("/api/content", { status: 204 });

    const mockAction = {
      payload: { severity: "warning", text: "The selected url has been deleted" },
      type: "SET_MESSAGES",
    };

    return store.dispatch(deleteSite({ url: "www.example.com" })).then(() => {
      expect(store.getActions()).not.toContainEqual(mockAction);
    });
  });
});
