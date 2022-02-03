import React, { useState, useCallback, useEffect, useRef } from "react";

import Axios from "axios";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
/// USE DISPATCH
import { useSelector, useDispatch } from "react-redux";
import { usePalette } from "react-palette";
import CheckIcon from "@mui/icons-material/Check";
import { Grid } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { UpdateColorAction } from "../GlobalActions";

function AboutColorx({ zoomed }: any): JSX.Element {
  const dispatch = useDispatch();
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
  /// GET COLOR FROM REDUX STORE
  interface RootStateReducerColor {
    GlobalReducerColor: {
      color: string;
      colordark: string;
      colortype: number;
    };
  }
  const { color, colordark, colortype } = useSelector(
    (state: RootStateReducerColor) => ({
      ...state.GlobalReducerColor,
    })
  );
  const colorReducer = color;
  const colorReducerdark = colordark;
  const colortypeReducer = colortype;

  var showCheck1: any = "hidden";
  var showCheck2: any = "hidden";
  var showCheck3: any = "hidden";
  var showCheck4: any = "hidden";
  var showCheck5: any = "hidden";

  if (colortypeReducer === 0) {
    showCheck1 = "visible";
  } else if (colortypeReducer === 1) {
    showCheck2 = "visible";
  } else if (colortypeReducer === 2) {
    showCheck3 = "visible";
  } else if (colortypeReducer === 3) {
    showCheck4 = "visible";
  } else {
    showCheck5 = "visible";
  }
  ///
  ///
  ///
  /// GET LOGGED USER DATA FROM REDUX STORE
  interface RootStateReducerImage {
    UserdataReducer: {
      image: string;
      id: number;
    };
  }
  const { image, id } = useSelector((state: RootStateReducerImage) => ({
    ...state.UserdataReducer,
  }));
  const idReducer = id;
  const imageReducer = image;

  ///
  ///
  ///
  /// REACT PALLETTE (VIBRANTCOLOR DETECTION)
  ////  const { data, loading, error } = usePalette(`./images/profile/${imageReducer}`);
  const { data } = usePalette(`./images/profile/${imageReducer}`);

  ///
  ///
  ///
  ///DISPATCH

  ///
  ///
  ///
  ///DOT ENV DATA
  const { REACT_APP_SUPERSTARZ_URL } = process.env;

  var colorboy: any = {
    color1: "",
    color2: "",
    colortype: 0,
    id: idReducer,
  };

  const updateColor = useCallback(
    (type: number) => {
      if (type === 0) {
        colorboy = {
          color1: data.lightVibrant,
          color2: data.darkVibrant,
          colortype: 0,
          id: idReducer,
        };
      } else if (type === 1) {
        colorboy = {
          color1: data.vibrant,
          color2: "",
          colortype: 1,
          id: idReducer,
        };
      } else if (type === 2) {
        colorboy = {
          color1: darkmodeReducer ? data.darkVibrant : data.lightVibrant,
          color2: "",
          colortype: 2,
          id: idReducer,
        };
      } else if (type === 3) {
        colorboy = {
          color1: data.muted,
          color2: "",
          colortype: 3,
          id: idReducer,
        };
      } else {
        colorboy = {
          color1: darkmodeReducer ? data.darkMuted : data.lightMuted,
          color2: "",
          colortype: 4,
          id: idReducer,
        };
      }

      Axios.put(
        `http://${REACT_APP_SUPERSTARZ_URL}/update_color`,
        { values: colorboy },
        {
          withCredentials: true,
        }
      )
        .then((response) => {
          if (response.data.message === "color updated") {
            dispatch(UpdateColorAction(colorboy));
          }
        })
        .catch(function (error) {
          alert("about color error");
        });
    },
    [REACT_APP_SUPERSTARZ_URL, dispatch, data, colorboy]
  );

  const updatecolor1 = () => {
    updateColor(0);
  };

  const updatecolor2 = () => {
    updateColor(1);
  };

  const updatecolor3 = () => {
    updateColor(2);
  };

  const updatecolor4 = () => {
    updateColor(3);
  };

  const updatecolor5 = () => {
    updateColor(4);
  };

  const initialRawSignValue = {
    inputedEmail: "",
    inputedUsername: "",
    inputedPassword: "",
  };
  const initialErrorSignValue = {
    inputedEmail: 0,
    inputedUsername: 0,
    inputedPassword: 0,
  };

  const [rawSignupValues, setRawSignupValues] = useState(initialRawSignValue);
  const [errorsSignupValues, setErrorsSignupValues] = useState(
    initialErrorSignValue
  );

  const UsernameCheckingTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const clickcolortimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (clickcolortimer.current) {
    clearTimeout(clickcolortimer.current);
  }
  clickcolortimer.current = setTimeout(() => {}, 3000);

  const updateTextFeildValues = useCallback(() => {}, [
    REACT_APP_SUPERSTARZ_URL,
    dispatch,
    data,
    colorboy,
  ]);

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            marginTop: zoomed ? "6.5vh" : "5vh",
            padding: "0px",
            marginLeft: zoomed ? "9.4vw" : "2.3vw",
            zIndex: 6,
          }}
        >
          {/*/////////////////////////////////////////////////////////////////////////// 1*/}
          <div
            style={{
              width: "9vh",
              margin: "auto",
              textAlign: "center",
              top: matchPc ? (zoomed ? "2.8vh" : "1.8vh") : "0.54em",
              position: "absolute",
              marginLeft: "0%",
              visibility: showCheck1,
            }}
          >
            <div
              style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                color: darkmodeReducer ? "#dddddd" : "#0b111b",
              }}
            >
              <CheckIcon
                style={{
                  fontSize: matchPc ? "1.1vw" : "2.08vh",
                  fontWeight: 900,
                }}
              />
            </div>
          </div>
          <Grid
            item
            xs={2}
            style={{
              width: `9vh`,
              height: `9vh`,
              position: "absolute",
              backgroundColor: darkmodeReducer
                ? data.darkVibrant
                : data.lightVibrant,
              borderRadius: "50%",
              zIndex: 0,
              marginLeft: "0%",
              cursor: "pointer",
            }}
          >
            {" "}
          </Grid>
          <Grid
            item
            xs={2}
            onClick={updatecolor1}
            style={{
              textAlign: "center",
              alignItems: "center",
              display: "grid",
              justifyContent: "center",
              margin: "auto",
              width: `8vh`,
              height: `8vh`,
              position: "absolute",
              backgroundColor: darkmodeReducer
                ? data.lightVibrant
                : data.darkVibrant,

              borderRadius: "50%",
              zIndex: 1,
              marginLeft: "0.25vw",
              marginTop: "0.5vh",
              cursor: "pointer",
            }}
          >
            {" "}
          </Grid>
          {/*///////////////////////////////////////////////////////////////////////////1*/}
          {/*///////////////////////////////////////////////////////////////////////////2*/}
          <div
            style={{
              width: "9vh",
              margin: "auto",
              textAlign: "center",
              top: matchPc ? (zoomed ? "2.8vh" : "1.8vh") : "0.54em",
              position: "absolute",
              marginLeft: "7%",
              visibility: showCheck2,
            }}
          >
            <div
              style={{
                fontSize: matchPc ? "1.1vw" : "2.08vh",
                fontWeight: "bolder",
                fontFamily: "Arial, Helvetica, sans-serif",

                color: darkmodeReducer ? "#dddddd" : "#0b111b",
              }}
            >
              <CheckIcon />
            </div>
          </div>
          <Grid
            onClick={updatecolor2}
            item
            xs={2}
            style={{
              width: `9vh`,
              height: `9vh`,
              position: "absolute",
              backgroundColor: data.vibrant,
              borderRadius: "50%",
              zIndex: 0,
              marginLeft: "7%",
              cursor: "pointer",
            }}
          >
            {" "}
          </Grid>
          {/*///////////////////////////////////////////////////////////////////////////2*/}
          {/*///////////////////////////////////////////////////////////////////////////3*/}
          <div
            style={{
              width: "9vh",
              margin: "auto",
              textAlign: "center",
              top: matchPc ? (zoomed ? "2.8vh" : "1.8vh") : "0.54em",
              position: "absolute",
              marginLeft: "14%",
              visibility: showCheck3,
            }}
          >
            <div
              style={{
                fontSize: matchPc ? "1.1vw" : "2.08vh",
                fontWeight: "bolder",
                fontFamily: "Arial, Helvetica, sans-serif",

                color: darkmodeReducer ? "#dddddd" : "#0b111b",
              }}
            >
              <CheckIcon />
            </div>
          </div>
          <Grid
            onClick={updatecolor3}
            item
            xs={2}
            style={{
              width: `9vh`,
              height: `9vh`,
              position: "absolute",
              backgroundColor:
                colortypeReducer === 2
                  ? colorReducer
                  : darkmodeReducer
                  ? data.darkVibrant
                  : data.lightVibrant,
              borderRadius: "50%",
              zIndex: 0,
              marginLeft: "14%",
              cursor: "pointer",
            }}
          >
            {" "}
          </Grid>
          {/*///////////////////////////////////////////////////////////////////////////3*/}
          {/*///////////////////////////////////////////////////////////////////////////4*/}
          <div
            style={{
              width: "9vh",
              margin: "auto",
              textAlign: "center",
              top: matchPc ? (zoomed ? "2.8vh" : "1.8vh") : "0.54em",
              position: "absolute",
              marginLeft: "21%",
              visibility: showCheck4,
            }}
          >
            <div
              style={{
                fontSize: matchPc ? "1.1vw" : "2.08vh",
                fontWeight: "bolder",
                fontFamily: "Arial, Helvetica, sans-serif",

                color: darkmodeReducer ? "#dddddd" : "#0b111b",
              }}
            >
              <CheckIcon />
            </div>
          </div>
          <Grid
            onClick={updatecolor4}
            item
            xs={2}
            style={{
              width: `9vh`,
              height: `9vh`,
              position: "absolute",
              backgroundColor: data.muted,
              borderRadius: "50%",
              zIndex: 0,
              marginLeft: "21%",
              cursor: "pointer",
            }}
          >
            {" "}
          </Grid>{" "}
          {/*///////////////////////////////////////////////////////////////////////////4*/}
          {/*///////////////////////////////////////////////////////////////////////////5*/}
          <div
            style={{
              width: "9vh",
              margin: "auto",
              textAlign: "center",
              top: matchPc ? (zoomed ? "2.8vh" : "1.8vh") : "0.54em",
              position: "absolute",
              marginLeft: "28%",
              visibility: showCheck5,
            }}
          >
            <div
              style={{
                fontSize: matchPc ? "1.1vw" : "2.08vh",
                fontWeight: "bolder",
                fontFamily: "Arial, Helvetica, sans-serif",

                color: darkmodeReducer ? "#dddddd" : "#0b111b",
              }}
            >
              <CheckIcon />
            </div>
          </div>
          <Grid
            onClick={updatecolor5}
            item
            xs={2}
            style={{
              width: `9vh`,
              height: `9vh`,
              position: "absolute",
              backgroundColor:
                colortypeReducer === 4
                  ? colorReducer
                  : darkmodeReducer
                  ? data.darkMuted
                  : data.lightMuted,
              borderRadius: "50%",
              zIndex: 0,
              marginLeft: "28%",
              cursor: "pointer",
            }}
          >
            {" "}
          </Grid>
          {/*///////////////////////////////////////////////////////////////////////////5*/}
        </Grid>{" "}
      </Grid>
    </>
  );
}

export const AboutColor = React.memo(AboutColorx);
