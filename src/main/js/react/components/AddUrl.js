import React, { useEffect, useState } from "react";

import LoadingButton from "./LoadingButton";

import { Grid, TextField, Button } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { postSite } from "../redux/actions/authorizedSiteActions";

export default function AddUrl(props) {
  const { values, setValues } = props;
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.ui.message);
  const loading = useSelector((state) => state.ui.loading.post);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postSite(values));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //const [values, setValues] = useState({ url: "", word: "" });

  useEffect(() => {
    if (messages.severity == "success") {
      setValues({ url: "", word: "" });
    }
  }, [messages]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="none"
              fullWidth
              id="url"
              label="Url"
              name="url"
              autoComplete="url"
              autoFocus
              value={values.url}
              onChange={handleInputChange}
              helperText={messages.url}
              error={messages.url ? true : false}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="none"
              fullWidth
              id="word"
              label="Word"
              name="word"
              autoComplete="word"
              value={values.word}
              onChange={handleInputChange}
              helperText={messages.word}
              error={messages.word ? true : false}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton type="submit" variant="contained" color="primary" loading={loading}>
              Check
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
