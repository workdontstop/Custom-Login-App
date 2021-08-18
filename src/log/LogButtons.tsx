import React from "react";
import { Grid, Button } from "@material-ui/core";
import { isBrowser } from "react-device-detect";
import { ILogButtons } from "./log-Interfaces";

function LoginButtonsx({
  loginstyle,
  signupstyle,
  OpenModalForm,
}: ILogButtons) {
  var matchPc = isBrowser;
  return (
    <Grid
      container
      className={matchPc ? "containerloginpc" : "containerloginmobile "}
      item
    >
      <Grid item sm={3} md={5}></Grid>
      <Grid item className="buttonpad buttonshake" xs={12} sm={6} md={2}>
        <Button
          onClick={() => OpenModalForm(1)}
          style={loginstyle}
          fullWidth={true}
          variant="outlined"
          size="large"
          color="primary"
        >
          Log In
        </Button>
      </Grid>
      <Grid item sm={12} className="logbuttonspace"></Grid>

      <Grid item sm={3} md={5}></Grid>
      <Grid item className="buttonpad buttonshake" xs={12} sm={6} md={2}>
        <Button
          onClick={() => OpenModalForm(0)}
          style={signupstyle}
          fullWidth={true}
          variant="contained"
          size="large"
          color="secondary"
        >
          {" "}
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}

export const LoginButtons = React.memo(LoginButtonsx);
