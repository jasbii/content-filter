import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useDispatch, useSelector } from "react-redux";
import { getSites, deleteSite } from "../redux/actions/authorizedSiteActions";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import LoadingButton from "./LoadingButton";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ListUrl() {
  const dispatch = useDispatch();
  const sites = useSelector((state) => state.sites.sites);
  const loading = useSelector((state) => state.ui.loading.sites);
  const deleting = useSelector((state) => state.ui.loading.delete);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getSites());
  }, []);

  const [open, setOpen] = React.useState(false);
  const [urlDelete, setUrlDelete] = React.useState("");

  const handleClickOpen = (url) => () => {
    setUrlDelete(url);
    setOpen(true);
  };

  const handleClose = () => {
    setUrlDelete("");
    setOpen(false);
  };

  const handleDelete = (url) => (e) => {
    e.preventDefault();
    dispatch(deleteSite({ url: url }));
    handleClose();
  };

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <center>
          <CircularProgress size={24} />
          <br />
          Loading...
        </center>
      </div>
    );
  }

  if (sites.length == 0) {
    return (
      <div>
        <center>
          <p>The list of articles its empty, please add some in the previous tab</p>
        </center>
      </div>
    );
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <a href={urlDelete}>{urlDelete}</a>
            <br />
            Are you sure you want to delete the above url?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            color="secondary"
            onClick={handleDelete(urlDelete)}
            disabled={deleting}
            loading={deleting}
          >
            <DeleteIcon />
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>URL</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.id}>
                <TableCell>{site.id}</TableCell>
                <TableCell>{site.url}</TableCell>
                <TableCell align="right">
                  <Button onClick={handleClickOpen(site.url)} variant="contained" color="secondary">
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
