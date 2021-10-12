import React from "react";
import { Grid, Button } from "@material-ui/core";

import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { ILogButtons } from "./log-Interfaces";
import { RootStateOrAny, useSelector } from "react-redux";

function LoginButtonsx({ OpenModalForm }: ILogButtons) {
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  var buttonFont = "";
  var buttonTransform = " ";
  var pad = "";

  if (matchPc) {
    buttonFont = "1vw";
    buttonTransform = " ";
    pad = "14.5px";
    ///
  } else if (matchTablet) {
    pad = "16px";
    buttonFont = "2vw";
    buttonTransform = " ";
    ///
  } else {
    buttonFont = "";
    buttonTransform = "scale(0.95)";
    pad = "16px";
  }

  ///
  ///
  ///
  /// GET DARKMODE FROM REDUX STORE
  interface RootStateGlobalReducer {
    GlobalReducer: {
      darkmode: boolean;
    };
  }
  const { darkmode } = useSelector((state: RootStateGlobalReducer) => ({
    ...state.GlobalReducer,
  }));
  const darkmodeReducer = darkmode;

  ///
  ///
  ///
  /// GET  SIGNUP BUTTON AND LOGIN BUTTON STYLE FROM REDUX
  const { MozBoxShadowSD, WebkitBoxShadowSD, boxShadowSD } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.ButtonsSignUpReducerDark,
    })
  );

  const { MozBoxShadowSL, WebkitBoxShadowSL, boxShadowSL } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.ButtonsSignUpReducerLight,
    })
  );

  const { MozBoxShadowLD, WebkitBoxShadowLD, boxShadowLD } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.ButtonsLoginReducerDark,
    })
  );

  const { MozBoxShadowLL, WebkitBoxShadowLL, boxShadowLL } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.ButtonsLoginReducerLight,
    })
  );

  var MozBoxShadowReducerLogin = " ";
  var WebkitBoxShadowReducerLogin = " ";
  var boxShadowReducerLogin = " ";

  var MozBoxShadowReducerSign = " ";
  var WebkitBoxShadowReducerSign = " ";
  var boxShadowReducerSign = " ";

  if (darkmodeReducer) {
    MozBoxShadowReducerLogin = MozBoxShadowLD;
    WebkitBoxShadowReducerLogin = WebkitBoxShadowLD;
    boxShadowReducerLogin = boxShadowLD;

    MozBoxShadowReducerSign = MozBoxShadowSD;
    WebkitBoxShadowReducerSign = WebkitBoxShadowSD;
    boxShadowReducerSign = boxShadowSD;
  } else {
    MozBoxShadowReducerLogin = MozBoxShadowLL;
    WebkitBoxShadowReducerLogin = WebkitBoxShadowLL;
    boxShadowReducerLogin = boxShadowLL;

    MozBoxShadowReducerSign = MozBoxShadowSL;
    WebkitBoxShadowReducerSign = WebkitBoxShadowSL;
    boxShadowReducerSign = boxShadowSL;
  }

  return (
    <Grid
      container
      className={matchPc ? "containerloginpc" : "containerloginmobile "}
      item
      style={{ marginTop: matchMobile ? "1.5vh" : "0px" }}
    >
      <Grid item sm={3} md={5}></Grid>
      <Grid item className="buttonpad buttonshake" xs={12} sm={6} md={2}>
        <Button
          onClick={() => OpenModalForm(1)}
          style={{
            fontSize: buttonFont,
            transform: buttonTransform,
            padding: "11.5px",
            borderRadius: "52px",
            MozBoxShadow: MozBoxShadowReducerLogin,
            WebkitBoxShadow: WebkitBoxShadowReducerLogin,
            boxShadow: boxShadowReducerLogin,
          }}
          fullWidth={true}
          variant="outlined"
          size="large"
          color="primary"
        >
          Log In
        </Button>
      </Grid>
      <Grid
        item
        sm={12}
        style={{ padding: matchTablet ? "9px" : "6px" }}
      ></Grid>

      <Grid item sm={3} md={5}></Grid>
      <Grid item className="buttonpad buttonshake" xs={12} sm={6} md={2}>
        <Button
          onClick={() => OpenModalForm(0)}
          style={{
            fontSize: buttonFont,
            transform: buttonTransform,
            padding: pad,
            borderRadius: "50px",
            MozBoxShadow: MozBoxShadowReducerSign,
            WebkitBoxShadow: WebkitBoxShadowReducerSign,
            boxShadow: boxShadowReducerSign,
          }}
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
