import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";

import ListUrl from "../../../main/js/react/components/ListUrl";
import reducer from "../../../main/js/react/redux/reducers/authorizedSite";
import { postSite, getSites, deleteSite } from "../../../main/js/react/redux/actions/authorizedSiteActions";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("<List /> unit test", () => {
  const getWrapper = (
    mockStore = createStore(reducer, {
      sites: {
        sites: [{ id: 1, url: "www.example.com" }],
      },
      ui: {
        message: {},
        loading: {
          post: false,
          sites: false,
          delete: false,
        },
      },
    })
  ) =>
    mount(
      <Provider store={mockStore}>
        <ListUrl />
      </Provider>
    );

  it("Should Load URLs", () => {
    const mockStore = createStore(reducer, {
      sites: {
        sites: [{ id: 1, url: "www.example.com" }],
      },
      ui: {
        message: {},
        loading: {
          post: false,
          sites: false,
          delete: false,
        },
      },
    });
    mockStore.dispatch = jest.fn();

    const wrapper = getWrapper(mockStore);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
