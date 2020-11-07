import React from "react";
import { Button, CircularProgress } from "@material-ui/core";

export default function LoadingButton(props) {
  const { onClick, loading, type, variant, color, children } = props;
  return (
    <Button type={type} variant={variant} color={color} onClick={onClick} disabled={loading}>
      {loading && <CircularProgress size={24} />}
      {!loading && children}
    </Button>
  );
}
