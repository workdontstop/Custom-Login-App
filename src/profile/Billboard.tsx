import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Box } from "@material-ui/core";

import { DarkmodeToggleAction } from ".././GlobalActions";
import { matchPc, matchTablet } from "../DetectDevice";
import { SliderBillboard } from "./SliderBillboard";
import AddIcon from "@mui/icons-material/Add";
import { usePalette } from "react-palette";
import { UpdateColorAction } from ".././GlobalActions";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function Billboardx({ OpenModalForm, click, billboardx }: any): JSX.Element {
  ///
  ///
  ///
  /// USE DISPATCH
  const dispatch = useDispatch();

  ///
  ///
  ///
  /// GET LOGGED USER DATA FROM REDUX STORE
  interface RootStateReducerImage {
    UserdataReducer: {
      image: string;
      username: string;
      quote: string;
      billboard1: string;
      billboard2: string;
    };
  }
  const { image, username, quote, billboard1, billboard2 } = useSelector(
    (state: RootStateReducerImage) => ({
      ...state.UserdataReducer,
    })
  );
  const imageReducer = image;
  const usernameReducer = username;
  const quoteReducer = quote;
  const billboard1Reducer = billboard1;
  const billboard2Reducer = billboard2;

  const billboardImages = [billboard1Reducer, billboard2Reducer];

  const [ShowBillboard, setShowBillboard] = useState<boolean>(false);

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

  //////////////////////////////////BILLBOARD VARIABLES FOR DEVICE TYPES
  var widthh = matchPc ? "65vw" : "98.5vw";
  var topp = matchPc ? "5.9vh" : matchTablet ? "5.5vh" : "3.5vh";
  var usernameClass = matchPc
    ? "usernamePc"
    : matchTablet
    ? "usernameTablet"
    : "usernameMobile";

  var widthName = matchPc ? "65vw" : "98.5vw";
  var topName = matchPc ? "13.5vh" : matchTablet ? "12.5vh" : "9vh";
  var name = matchPc ? "namePc" : matchTablet ? "nameTablet" : "nameMobile";

  var widthConnect = matchPc ? "65vw" : "98.5vw";
  var bottomConnect = matchPc ? "58vh" : matchTablet ? "34vh" : "26vh";
  var favclass = matchPc ? "favPc" : matchTablet ? "favTablet" : "favMobile";
  var fanclass = matchPc ? "fanPc" : matchTablet ? "fanTablet" : "fanMobile";

  var fontConnectText = matchPc ? "1.03vw" : matchTablet ? "2.5vw" : "1.72vh";
  var fontConnectnum = matchPc ? "1.75vw" : matchTablet ? "3.9vw" : "2.3vh";

  var billboardDynamicHeight = matchPc ? "70vh" : matchTablet ? "57vw" : "34vh";

  //////////////////////////////////BILLBOARD VARIABLES FOR DEVICE TYPES

  ///
  ///
  ///
  /// TOGGLEDARKMODE ON USERNAME CLICK
  var toggleDarkMode = false;

  const switchThemes = () => {
    if (darkmodeReducer) {
      toggleDarkMode = false;
    } else {
      toggleDarkMode = true;
    }
    dispatch(DarkmodeToggleAction());
    ////ACESSING LOCALSTORAGE
    localStorage.setItem("darkmode", toggleDarkMode.toString());
  };

  ///
  ///
  ///
  /// CLICK BILLBOARD OPEN ON DOUBLE CLICK
  const ClickBillboard = (e: any) => {
    switch (e.detail) {
      case 2:
        setShowBillboard(true);
        break;
      case 3:
        setShowBillboard(true);
        break;
      case 4:
        setShowBillboard(true);
        break;
    }
  };

  ///
  ///
  ///
  /// CLICK BILLBOARD CLOSE
  const ClickBillboardClose = (e: any) => {
    setShowBillboard(false);
  };

  var fontOptions = "";

  if (matchPc) {
    fontOptions = "5.6vw";
  } else if (matchTablet) {
    fontOptions = "5.2rem";
  } else {
    fontOptions = "2.1rem";
  }

  ///hoverOverImageRef.current.style.background = "red";

  return (
    <>
      <>
        <Grid container className="dontallowhighlighting" style={{}}>
          {/*///////////////////////////////////////////////////////////////////////////BACKPAD BILLBOARD LIGHTINING/DARKEN*/}
          <Grid
            container
            style={{
              position: "relative",
              top: "0em",
              width: "100%",
            }}
          >
            {/*///////////////////////////////////////////////////////////////////////////BACKPAD BILLBOARD CURSOR ALIAS LAYOUT*/}
            <Grid
              item
              component={Box}
              display={{ xs: "none", md: "block" }}
              md={2}
            ></Grid>
            <Grid
              item
              xs={12}
              md={8}
              onClick={ClickBillboard}
              style={{
                visibility: ShowBillboard ? "hidden" : "visible",
                cursor: "alias",
                zIndex: 2,
                position: "relative",
                height: billboardDynamicHeight,
                backgroundColor: darkmodeReducer
                  ? "rgba(005, 005, 005, 0.26)"
                  : "rgba(250, 250, 250, 0.23)",
                borderRadius: "0px",
                borderBottomLeftRadius: matchPc ? "7px" : "0em",
                borderBottomRightRadius: matchPc ? "7px" : "0em",
              }}
            ></Grid>
            <Grid
              item
              component={Box}
              display={{ xs: "none", md: "block" }}
              md={2}
            ></Grid>
            {/*///////////////////////////////////////////////////////////////////////////BACKPAD BILLBOARD CURSOR ALIAS LAYOUT*/}

            <Grid item md={12}></Grid>

            {/*///////////////////////////////////////////////////////////////////////////BACKPAD BILLBOARD CONTROL DISPLAY ON DOUBLE CLICK*/}

            <Grid
              item
              component={Box}
              display={{ xs: "none", md: "block" }}
              md={2}
            ></Grid>
            <Grid
              item
              xs={12}
              md={8}
              onClick={ClickBillboard}
              style={{
                visibility: ShowBillboard ? "hidden" : "visible",
              }}
            >
              {/*///////////////////////////////////////////////////////////////////////////USERNAME*/}
              <Grid
                item
                xs={12}
                style={{
                  position: "absolute",
                  width: widthh,
                  top: topp,
                  textAlign: "right",
                  zIndex: 3,
                  height: "0px",
                }}
              >
                <span
                  className={
                    darkmodeReducer
                      ? `fontfamilyArial ${usernameClass} turdark`
                      : `fontfamilyArial ${usernameClass} turlight`
                  }
                  style={{
                    cursor: "pointer",
                    color: darkmodeReducer ? "#dddddd" : "#0b111b",
                    backgroundColor: darkmodeReducer
                      ? "rgba(005, 005, 005, 0.45)"
                      : "rgba(250, 250, 250, 0.7)",
                  }}
                >
                  {usernameReducer}
                </span>
              </Grid>
              {/*///////////////////////////////////////////////////////////////////////////USERNAME*/}
              {/*///////////////////////////////////////////////////////////////////////////FULLNAME OR QUOTES*/}
              <Grid
                item
                xs={12}
                style={{
                  position: "absolute",
                  width: widthName,
                  top: topName,
                  textAlign: "right",
                  zIndex: 3,
                  height: "0px",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    color: darkmodeReducer ? "#dddddd" : "#0b111b",
                    backgroundColor: darkmodeReducer
                      ? "rgba(005, 005, 005, 0.45)"
                      : "rgba(250, 250, 250, 0.7)",
                  }}
                  className={
                    darkmodeReducer
                      ? `fontfamilyArial ${name} turdark`
                      : `fontfamilyArial ${name} turlight`
                  }
                >
                  {quoteReducer}
                </span>
              </Grid>
              {/*///////////////////////////////////////////////////////////////////////////FULLNAME OR QUOTES*/}
              {/*///////////////////////////////////////////////////////////////////////////FAVS*/}
              <Grid
                item
                xs={12}
                style={{
                  position: "absolute",
                  width: widthConnect,
                  height: "0px",
                  top: bottomConnect,
                  display: "flex",
                  justifyContent: "flex-end",
                  zIndex: 4,
                }}
              >
                <Grid item style={{ textAlign: "center", height: "0px" }}>
                  {" "}
                  <span
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      fontSize: fontConnectText,
                      backgroundColor: darkmodeReducer
                        ? "rgba(005, 005, 005, 0.29)"
                        : "rgba(255, 255, 255, 0.35)",
                      padding: "1px  ",
                      opacity: "0.75",
                    }}
                    className={
                      darkmodeReducer
                        ? `fontfamilyArial zuperxyinfotext turdarkfavfan ${fanclass}  `
                        : `fontfamilyArial  text-connect-light zuperxyinfotext turlight ${fanclass}  `
                    }
                  >
                    FANS
                  </span>
                  <Grid xs={12} item style={{ height: "10px" }}></Grid>
                  <span
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      fontSize: fontConnectnum,
                      marginRight: matchPc ? "0.45vw" : "0.5vw",
                      backgroundColor: darkmodeReducer
                        ? "rgba(005, 005, 005, 0.2)"
                        : "rgba(255, 255, 255, 0.03)",
                    }}
                    className={`fontfamilyArial zuperxyinfo ${fanclass}  `}
                  >
                    .
                  </span>{" "}
                </Grid>
                <Grid item style={{ textAlign: "center", height: "0px" }}>
                  {" "}
                  <span
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      fontSize: fontConnectText,
                      backgroundColor: darkmodeReducer
                        ? "rgba(005, 005, 005, 0.29)"
                        : "rgba(255, 255, 255, 0.35)",

                      padding: "1px  ",
                      opacity: "0.75",
                    }}
                    className={
                      darkmodeReducer
                        ? `fontfamilyArial zuperxyinfotext turdarkfavfan ${favclass}  `
                        : `fontfamilyArial  text-connect-light zuperxyinfotext turlight ${favclass}  `
                    }
                  >
                    FAVORITES
                  </span>
                  <Grid xs={12} item style={{ height: "10px" }}></Grid>
                  <span
                    style={{
                      cursor: "pointer",
                      backgroundColor: darkmodeReducer
                        ? "rgba(005, 005, 005, 0.2)"
                        : "rgba(255, 255, 255, 0.03)",
                      fontWeight: "bolder",
                      fontSize: fontConnectnum,

                      marginRight: matchPc ? "0.1vw" : "0.5vw",
                      marginTop: "9.2px",
                    }}
                    className={`fontfamilyArial zuperxyinfo  ${favclass}`}
                  >
                    .
                  </span>
                </Grid>
              </Grid>
              {/*///////////////////////////////////////////////////////////////////////////FAVS*/}
            </Grid>
            {/*///////////////////////////////////////////////////////////////////////////BACKPAD BILLBOARD CONTROL DISPLAY ON DOUBLE CLICK*/}
          </Grid>
          {/*///////////////////////////////////////////////////////////////////////////BACKPAD BILLBOARD LIGHTINING/DARKEN*/}
          <Grid
            style={{
              position: "relative",
              zIndex: 0,
            }}
            container
          >
            {" "}
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                position: "fixed",
                top: "3em",
                margin: "auto",
                textAlign: "center",
                zIndex: 0,
              }}
            >
              <>
                <input
                  onClick={click}
                  onInput={() => {
                    setShowBillboard(false);
                  }}
                  onChange={billboardx}
                  type="file"
                  name="superImages"
                  accept="image/*"
                  multiple
                  id="billboardxx"
                  style={{ visibility: "hidden" }}
                />
              </>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                position: "fixed",
                top: "3em",
                margin: "auto",
                textAlign: "center",
                zIndex: 200,
              }}
            >
              {ShowBillboard ? (
                <>
                  <label htmlFor="billboardxx">
                    <AddPhotoAlternateIcon
                      style={{
                        fontSize: fontOptions,
                        color: "#ffffff",
                        cursor: "pointer",
                      }}
                      className="zuperkinginfo"
                    />{" "}
                  </label>
                </>
              ) : null}
            </Grid>
            <Grid
              item
              component={Box}
              display={{ xs: "none", md: "block" }}
              md={2}
            ></Grid>
            <Grid
              item
              xs={12}
              md={8}
              style={{ marginTop: `-${billboardDynamicHeight}` }}
            >
              {/*///////////////////////////////////////////////////////////////////////////BILLBOARD IMAGE*/}

              <SliderBillboard
                ClickBillboardClose={ClickBillboardClose}
                ShowBillboard={ShowBillboard}
                slides={billboardImages}
                billboardDynamicHeight={billboardDynamicHeight}
              />

              {/*///////////////////////////////////////////////////////////////////////////BILLBOARD IMAGE*/}
            </Grid>
          </Grid>
        </Grid>
      </>
    </>
  );
}

export const Billboard = React.memo(Billboardx);
