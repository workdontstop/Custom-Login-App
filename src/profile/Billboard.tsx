import React, { useState } from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { Grid, Box } from "@material-ui/core";
import { DarkmodeToggleAction } from ".././GlobalActions";
import { matchPc, matchTablet } from "../DetectDevice";
import { SliderBillboard } from "./SliderBillboard";

function Billboardx(): JSX.Element {
  const [ShowBillboard, setShowBillboard] = useState<boolean>(false);

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
  var topp = matchPc ? "3.8vh" : matchTablet ? "3.2em" : "1.15em";
  var usernameClass = matchPc
    ? "usernamePc"
    : matchTablet
    ? "usernameTablet"
    : "usernameMobile";

  var widthName = matchPc ? "65vw" : "98.5vw";
  var topName = matchPc ? "11.4vh" : matchTablet ? "10.6em" : "3.3em";
  var name = matchPc ? "namePc" : matchTablet ? "nameTablet" : "nameMobile";

  var widthConnect = matchPc ? "65vw" : "98.5vw";
  var bottomConnect = matchPc ? "58vh" : matchTablet ? "34vh" : "21.9vh";
  var favclass = matchPc ? "favPc" : matchTablet ? "favTablet" : "favMobile";
  var fanclass = matchPc ? "fanPc" : matchTablet ? "fanTablet" : "fanMobile";

  var fontConnectText = matchPc ? "1.03vw" : matchTablet ? "2.5vw" : "1.73vh";
  var fontConnectnum = matchPc ? "1.75vw" : matchTablet ? "3.9vw" : "2.4vh";

  var widthProfilePic = matchPc ? "18%" : matchTablet ? "42%" : "44vw";
  var topProfilePic = matchPc ? "36em" : matchTablet ? "29em" : "8.4em";
  var leftProfilePic = matchPc ? "1vw" : matchTablet ? "3vw" : "2.6vw";

  var billboardDynamicHeight = matchPc ? "70vh" : matchTablet ? "56vw" : "30vh";

  //////////////////////////////////BILLBOARD VARIABLES FOR DEVICE TYPES

  ///
  ///
  ///
  /// TOGGLEDARKMODE ON USERNAME CLICK
  var toggleDarkMode = false;
  const dispatch = useDispatch();
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
  ///MUI PAPER STYLES FROM REDUX
  const { PaperStyleLight, PaperStyleDark } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.PaperReducerLightnDark,
    })
  );

  var PaperStyleReducer = "";

  if (darkmodeReducer) {
    PaperStyleReducer = PaperStyleDark;
  } else {
    PaperStyleReducer = PaperStyleLight;
  }

  ///
  ///
  ///
  /// CLICK BILLBOARD OPEN
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
  return (
    <>
      <>
        <Grid container className="dontallowhighlighting">
          {/*///////////////////////////////////////////////////////////////////////////BACKPAD BILLBOARD LIGHTINING/DARKEN*/}
          <Grid
            container
            style={{
              position: "relative",
              top: "0em",
              width: "100%",
            }}
          >
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
                display: ShowBillboard ? "none" : "block",
                cursor: "alias",
                zIndex: 2,

                height: billboardDynamicHeight,
                backgroundColor: darkmodeReducer
                  ? "rgba(005, 005, 005, 0.18)"
                  : "rgba(250, 250, 250, 0.15)",
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
                }}
              >
                <span
                  onClick={switchThemes}
                  className={
                    darkmodeReducer
                      ? `fontfamilyArial ${usernameClass} turdark`
                      : `fontfamilyArial ${usernameClass} turlight`
                  }
                  style={{
                    cursor: "pointer",
                    color: darkmodeReducer ? "#ffffff" : "#000000",
                    backgroundColor: darkmodeReducer
                      ? "rgba(005, 005, 005, 0.42)"
                      : "rgba(250, 250, 250, 0.75)",
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
                  height: "auto",
                  top: topName,
                  textAlign: "right",
                  zIndex: 3,
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    color: darkmodeReducer ? "#ffffff" : "#000000",
                    backgroundColor: darkmodeReducer
                      ? "rgba(005, 005, 005, 0.42)"
                      : "rgba(250, 250, 250, 0.75)",
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
              {/*/////////i love the summers so much//////////////////////////////////////////////////////////////////FULLNAME OR QUOTES*/}
              {/*///////////////////////////////////////////////////////////////////////////FAVS*/}
              <Grid
                item
                xs={12}
                style={{
                  position: "absolute",
                  width: widthConnect,
                  height: "auto",
                  top: bottomConnect,
                  display: "flex",
                  justifyContent: "flex-end",
                  zIndex: 4,
                }}
              >
                <Grid item style={{ textAlign: "center" }}>
                  {" "}
                  <span
                    style={{
                      cursor: "pointer",
                      fontWeight: "bolder",
                      fontSize: fontConnectText,
                      backgroundColor: darkmodeReducer
                        ? "rgba(005, 005, 005, 0.29)"
                        : "rgba(145, 95, 95, 0.35)",
                      padding: "1px  ",
                      opacity: "0.7",
                    }}
                    className={
                      darkmodeReducer
                        ? `fontfamilyArial zuperxyinfotext turdarkfavfan ${fanclass}  `
                        : `fontfamilyArial text-connect-light zuperxyinfotext turlight ${fanclass}  `
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
                    147
                  </span>{" "}
                </Grid>
                <Grid item style={{ textAlign: "center" }}>
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
                      opacity: "0.7",
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
                    20
                  </span>
                </Grid>
              </Grid>
              {/*///////////////////////////////////////////////////////////////////////////FAVS*/}
              {/*///////////////////////////////////////////////////////////////////////////PROFILE PIC*/}
              <Grid
                item
                xs={12}
                style={{
                  position: "absolute",
                  width: widthProfilePic,
                  height: "auto",
                  marginLeft: leftProfilePic,
                  top: topProfilePic,
                  zIndex: 3,
                }}
              >
                <img
                  className={
                    darkmodeReducer ? `turprofileDark` : ` turprofileLight`
                  }
                  style={{
                    cursor: "alias",
                    position: "relative",
                    zIndex: 0,
                    objectFit: "contain",
                    width: "100%",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                  src={`./images/profile/${imageReducer}`}
                  alt="Superstarz Billboard "
                />{" "}
              </Grid>
              {/*///////////////////////////////////////////////////////////////////////////PROFILE PIC*/}
            </Grid>
          </Grid>
          {/*///////////////////////////////////////////////////////////////////////////BACKPAD BILLBOARD LIGHTINING/DARKEN*/}
          <Grid style={{ position: "absolute", zIndex: 0 }} container>
            <Grid
              item
              component={Box}
              display={{ xs: "none", md: "block" }}
              md={2}
            ></Grid>
            <Grid item xs={12} md={8}>
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
