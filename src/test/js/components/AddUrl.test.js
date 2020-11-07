import React from "react";
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";

import AddUrl from "../../../main/js/react/components/AddUrl";
import reducer from "../../../main/js/react/redux/reducers/authorizedSite";
import { postSite, getSites, deleteSite } from "../../../main/js/react/redux/actions/authorizedSiteActions";

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("<AddUrl /> unit test", () => {
  const getWrapper = (
    mockStore = createStore(reducer, {
      sites: [],
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
        <AddUrl values={{ url: "www.example.com", word: "test" }} setValues="" />
      </Provider>
    );

  it("Should submit site", () => {
    const mockStore = createStore(reducer, {
      sites: [],
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
    wrapper.find("form").simulate("submit");
    expect(mockStore.dispatch).toHaveBeenCalled();
    //expect(postSite()).toHaveBeenCalled();
  });
});
