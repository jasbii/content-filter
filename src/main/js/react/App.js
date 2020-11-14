import React from "react";
import AddUrl from "../react/components/AddUrl";
import ListUrl from "../react/components/ListUrl";
import Message from "../react/components/Message";
import { Provider } from "react-redux";
import store from "./redux/store";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

export default function App(props) {
  const { instance } = props;
  const [tab, setTab] = React.useState(0);
  const [values, setValues] = React.useState({ url: "", word: "" });
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };
  return (
    <Provider store={store}>
      <Message />
      <AppBar position="static">
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Index URL" />
          <Tab label="List of articles" />
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <AddUrl values={values} setValues={setValues} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <ListUrl />
      </TabPanel>
      {instance != "unique" ? (
        <center>
          <Chip label={"This gui was served by instance: " + instance} />
        </center>
      ) : null}
    </Provider>
  );
}
