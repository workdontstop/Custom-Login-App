import React, { useState, useEffect } from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { Grid, Box } from "@material-ui/core";
import { DarkmodeToggleAction } from ".././GlobalActions";
import { matchPc, matchTablet } from "../DetectDevice";
import { SliderBillboard } from "./SliderBillboard";
import AddIcon from "@mui/icons-material/Add";
import { usePalette } from "react-palette";
import { UpdateColorAction } from ".././GlobalActions";

function Billboardx({ OpenModalForm }: any): JSX.Element {
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

  ////  const { data, loading, error } = usePalette(`./images/profile/${imageReducer}`);

  const { data, loading, error } = usePalette(
    `./images/profile/${imageReducer}`
  );
  const [ShowBillboard, setShowBillboard] = useState<boolean>(false);

  useEffect(() => {
    var colorboy = {
      color1: data.darkVibrant,
      color2: data.lightVibrant,
    };

    dispatch(UpdateColorAction(colorboy));
  }, [data]);

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
  var topp = matchPc ? "3.8vh" : matchTablet ? "4.3em" : "1.55em";
  var usernameClass = matchPc
    ? "usernamePc"
    : matchTablet
    ? "usernameTablet"
    : "usernameMobile";

  var widthName = matchPc ? "65vw" : "98.5vw";
  var topName = matchPc ? "11.4vh" : matchTablet ? "11.9em" : "3.8em";
  var name = matchPc ? "namePc" : matchTablet ? "nameTablet" : "nameMobile";

  var widthConnect = matchPc ? "65vw" : "98.5vw";
  var bottomConnect = matchPc ? "58vh" : matchTablet ? "34vh" : "26vh";
  var favclass = matchPc ? "favPc" : matchTablet ? "favTablet" : "favMobile";
  var fanclass = matchPc ? "fanPc" : matchTablet ? "fanTablet" : "fanMobile";

  var fontConnectText = matchPc ? "1.03vw" : matchTablet ? "2.5vw" : "1.73vh";
  var fontConnectnum = matchPc ? "1.75vw" : matchTablet ? "3.9vw" : "2.4vh";

  var widthProfilePic = matchPc ? "18%" : matchTablet ? "42%" : "44vw";
  var topProfilePic = matchPc ? "36em" : matchTablet ? "31em" : "10.2em";
  var leftProfilePic = matchPc ? "1vw" : matchTablet ? "3vw" : "2.6vw";

  var billboardDynamicHeight = matchPc ? "70vh" : matchTablet ? "57vw" : "34vh";

  var optionsClass = "";
  var fontOptions = "";

  if (matchPc) {
    optionsClass = "profile-optionsImagePc";
    fontOptions = "3.6rem";
  } else if (matchTablet) {
    optionsClass = "profile-optionsImageTablet";
    fontOptions = "5rem";
  } else {
    optionsClass = "profile-optionsImageMobile";
    fontOptions = "1.9rem";
  }

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

  ///
  ///
  ///
  /// GET COLOR FROM REDUX STORE
  interface RootStateReducerColor {
    GlobalReducerColor: {
      color: string;
    };
  }
  const { color } = useSelector((state: RootStateReducerColor) => ({
    ...state.GlobalReducerColor,
  }));
  const colorReducer = color;

  ///hoverOverImageRef.current.style.background = "red";

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
                  ? "rgba(005, 005, 005, 0.29)"
                  : "rgba(250, 250, 250, 0.27)",
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
                  onClick={switchThemes}
                  className={
                    darkmodeReducer
                      ? `fontfamilyArial ${usernameClass} turdark`
                      : `fontfamilyArial ${usernameClass} turlight`
                  }
                  style={{
                    cursor: "pointer",
                    color: darkmodeReducer ? "#dddddd" : "#0b111b",
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
                        : "rgba(145, 95, 95, 0.35)",
                      padding: "1px  ",
                      opacity: "0.75",
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
                <Grid
                  className={`  ${optionsClass}   `}
                  style={{
                    zIndex: 2,
                    backgroundColor: colorReducer,
                    opacity: 0.7,
                  }}
                >
                  <AddIcon
                    style={{
                      fontSize: fontOptions,
                      color: "#ffffff",
                    }}
                    className="zuperkinginfo"
                  />
                </Grid>
                <img
                  onClick={OpenModalForm}
                  className={
                    darkmodeReducer
                      ? `turprofileDark image-zoom-on-click`
                      : ` turprofileLight image-zoom-on-click`
                  }
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    zIndex: 0,
                    objectFit: "contain",
                    width: "100%",
                    borderRadius: "50%",
                    margin: "auto",
                    filter: "blur(1.3px)",
                  }}
                  src={`./images/profilethumb/${imageReducer}`}
                  alt="Superstarz Billboard "
                />{" "}
                <img
                  onClick={OpenModalForm}
                  className={
                    darkmodeReducer
                      ? `turprofileDark image-gray-on-click`
                      : ` turprofileLight image-gray-on-click`
                  }
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                    objectFit: "contain",
                    width: "100%",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                  src={`./images/profile/${imageReducer}`}
                  alt="Superstarz Billboard "
                />
              </Grid>
              {/*///////////////////////////////////////////////////////////////////////////PROFILE PIC*/}
            </Grid>
            {/*///////////////////////////////////////////////////////////////////////////BACKPAD BILLBOARD CONTROL DISPLAY ON DOUBLE CLICK*/}
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
