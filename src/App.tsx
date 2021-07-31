import "./App.css";
import "typeface-roboto";
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import SuperstarzIconLight from "./images/s.png";
import SuperstarzIconDark from "./images/sd.png";
import {
  useTheme,
  Paper,
  useMediaQuery,
  Grid,
  Typography,
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { Option } from "./app-folder/Option";
import { LoginButtons } from "./app-folder/LogButtons";
import * as CSS from "csstype";
import { ModalLog } from "./app-folder/ModalLog";
import Supercheck from "./Supercheck";
import { ViewArraySharp } from "@material-ui/icons";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Supercheck" exact component={Supercheck} />
      </Switch>
    </BrowserRouter>
  );
}

const Home = () => {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);

  const [randomicon, setRandomicon] = useState<number>(1);

  const [OpenModalFormOnce, setOpenModalFormOnce] = useState<boolean>(false);
  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [formtype, setFormtype] = useState<number>(1);
  const [zoomedModal, setZoomedModal] = useState<boolean>(false);
  const [mobileZoom, setMobileZoom] = useState<boolean>(false);

  var usetheme = useTheme();
  var matchPc = useMediaQuery(usetheme.breakpoints.up("md"));
  var matchTablet = useMediaQuery(usetheme.breakpoints.up("sm"));
  var matchMobile = useMediaQuery(usetheme.breakpoints.up("xs"));
  const RefAppContainer = useRef<HTMLDivElement>(null);
  const firstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  interface IappVariables {
    shade: string;
    shade2: string;
    shade2num: string;
    shade2nump: string;
    logoimage: string;
    secondarymaincolor: string;
    maincolor: string;
    shade2nump22: string;
    PaperStyle: string;
    littleTextColor: string;
  }

  var appVariables: IappVariables = {
    shade: "",
    shade2: "",
    shade2num: "",
    shade2nump: "",
    logoimage: "",
    secondarymaincolor: "",
    maincolor: "",
    shade2nump22: "",
    PaperStyle: "",
    littleTextColor: "",
  };

  var appVariablesDARK: IappVariables = {
    shade: "#cccccc",
    shade2: "#cccccc",
    shade2num: "1.1",
    shade2nump: "1.8",
    logoimage: SuperstarzIconDark,
    secondarymaincolor: "#ccccccff",
    maincolor: "#ccccccff",
    shade2nump22: "5.5",
    PaperStyle: "linear-gradient(0deg, #282c34, #282c36, #191919 )",
    littleTextColor: "#ccccccff",
  };

  var appVariablesLIGHT: IappVariables = {
    shade: "#0b111b",
    shade2: "#0b111b",
    shade2num: "1.5",
    shade2nump: "1.5",
    logoimage: SuperstarzIconLight,
    secondarymaincolor: "#0b111b",
    maincolor: "#0b111b",
    shade2nump22: "8",
    PaperStyle:
      "linear-gradient(0deg,  rgb(220,225,225), rgb(255,255,255),rgb(246,250,255) )",
    littleTextColor: "#0b111b",
  };

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DARKMODE
  if (darkmode) {
    appVariables = appVariablesDARK;
  } else {
    appVariables = appVariablesLIGHT;
  }

  var containerApp = "";
  var icon = "";
  var superstarzText = "";
  var littleText = "";
  var buttonFont = "";
  var buttonTransform = "";
  var optionsContainer = "";
  var switchsize: "medium" | "small" | undefined;
  var marginData: CSS.Properties;
  var fontData: CSS.Properties;

  const fontDataPc: CSS.Properties = { fontSize: "3.1rem" };
  const fontDataTablet: CSS.Properties = { fontSize: "3.2rem" };
  const fontDataMobile: CSS.Properties = { fontSize: "1.7rem" };
  const marginDataPc: CSS.Properties = { marginLeft: "-35px" };
  const marginDataMobile: CSS.Properties = { marginLeft: "-15.5px" };

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  if (matchPc) {
    containerApp = "containerapp";
    icon = "iconPc";
    superstarzText = "super-starz-text-Pc";
    littleText = "littletext-Pc";
    buttonFont = "1vw";
    buttonTransform = " ";
    optionsContainer = "optionsContainer-Pc-Tab";
    switchsize = "medium";
    marginData = marginDataPc;
    fontData = fontDataPc;
    ///
  } else if (matchTablet) {
    containerApp = "containerapptablet";
    icon = "iconTablet";
    superstarzText = "super-starz-text-Tablet";
    littleText = "littletext-Tablet";
    buttonFont = "2vw";
    buttonTransform = " ";
    optionsContainer = "optionsContainer-Pc-Tab";
    switchsize = "medium";
    marginData = marginDataPc;
    fontData = fontDataTablet;
    ///
  } else {
    containerApp = "containerappmobile";
    icon = "iconMobile";
    superstarzText = "super-starz-text-Mobile";
    littleText = "littletext-Mobile";
    buttonFont = "";
    buttonTransform = "scale(0.95)";
    optionsContainer = "optionsContainer-Mobile";
    switchsize = "medium";
    marginData = marginDataMobile;
    fontData = fontDataMobile;
  }

  var loginButton: CSS.Properties = {
    fontSize: buttonFont,
    transform: buttonTransform,
    padding: "11px",
    borderRadius: "52px",
    MozBoxShadow: `0 0 ${appVariables.shade2num}px ${appVariables.shade2} `,
    WebkitBoxShadow: `0 0 ${appVariables.shade2num}px ${appVariables.shade2} `,
    boxShadow: `0 0 ${appVariables.shade2num}px ${appVariables.shade2} `,
  };

  var signupButton: CSS.Properties = {
    fontSize: buttonFont,
    transform: buttonTransform,
    padding: "13.3px",
    borderRadius: "50px",
    MozBoxShadow: `0 0 4.5px ${appVariables.shade}`,
    WebkitBoxShadow: `0 0 4.5px ${appVariables.shade} `,
    boxShadow: `0 0 4.5px ${appVariables.shade}`,
  };

  ///
  ///
  ///
  ///MATERIAL UI  THEME CUSTOMIZATAION
  let themeGeneralSettings = createMuiTheme({
    palette: {
      primary: {
        main: `${appVariables.maincolor}`,
      },
      secondary: {
        main: `${appVariables.secondarymaincolor}`,
      },
      type: darkmode ? "dark" : "light",
    },
  });

  ///
  ///
  ///
  ///CALCULATE NEW SCREEN HEIGHT
  const calculateScreenHeight = useMemo((): any => {
    const calculateScreenHeightx = () => {
      if (RefAppContainer.current && RefAppContainer.current.clientHeight) {
        setScreenHeight(RefAppContainer.current.clientHeight);
      }
      setTimeout(function () {
        if (RefAppContainer.current && RefAppContainer.current.clientHeight) {
          setScreenHeight(RefAppContainer.current.clientHeight);
        }
      }, 600);
    };
    return calculateScreenHeightx;
  }, [setScreenHeight, RefAppContainer]);

  ///
  ///
  ///
  ///SETS DARKMODE FROM LOCAL STORAGE IF NOT EMPTY AND INSTANTIATE HISTORY.JS
  useEffect(() => {
    /// LOAD HISTORY ONCE ON EVERY FIRST PAGE LOAD OF THE APP
    window.history.pushState(null, "", window.location.href);
    /// LOAD HISTORY ONCE ON EVERY FIRST PAGE LOAD OF THE APP
    calculateScreenHeight(); //
    let themelocaldata = JSON.parse(localStorage.getItem("darkmode")!);
    if (themelocaldata !== null) {
      setDarkmode(themelocaldata);
    }
  }, [calculateScreenHeight, setDarkmode]);

  ///
  ///
  ///
  ///CLOSE LOG MODAL
  const CloseModalForm = useCallback(
    (DeviceBackButtonClicked: number) => {
      ///onpopstate fires when back and forward buttons used
      if (DeviceBackButtonClicked === 1) {
        window.onpopstate = () => {
          setShowModalForm(false);
          setOpenModalFormOnce(false);
        };
      } else {
        setShowModalForm(false);
        setOpenModalFormOnce(false);
        matchMobile
          ? setTimeout(function () {
              ///Replace modal history state with previous history state
              window.history.back();
            }, 500)
          : window.history.back();
      }
    },
    [setShowModalForm, setOpenModalFormOnce, matchMobile]
  );

  ///
  ///
  ///
  ///OPEN LOG MODAL
  const OpenModalForm = useCallback(
    (formtypedata: number) => {
      setFormtype(formtypedata);
      setShowModalForm(true);
      ///Replace current history state (since opening a modal Level 2 grid)...
      /// if this was a level 1 grid (profile-info page use Pushstate to create new history state)
      let modalName;
      if (formtypedata === 0) {
        modalName = "SignUp";
      } else {
        modalName = "LogIn";
      }

      if (!OpenModalFormOnce) {
        window.history.pushState(null, "", modalName);
        setOpenModalFormOnce(true);
        CloseModalForm(1);
      }
    },
    [setShowModalForm, setOpenModalFormOnce, CloseModalForm]
  );

  ///
  ///
  ///
  /// RANDOME EMOJI
  useEffect(() => {
    let emojicontrol: number[] = [1, 2, 3, 4, 5];
    var randomemoji =
      emojicontrol[Math.floor(Math.random() * emojicontrol.length)];

    if (randomemoji === 1) {
      setRandomicon(1);
    } else if (randomemoji === 2) {
      setRandomicon(2);
    } else if (randomemoji === 3) {
      setRandomicon(3);
    } else if (randomemoji === 4) {
      setRandomicon(4);
    } else {
      setRandomicon(5);
    }
  }, [setRandomicon]);

  var displayEmo1 = "none";
  var displayEmo2 = "none";
  var displayEmo3 = "none";
  var displayEmo4 = "none";
  var displayEmo5 = "none";

  if (randomicon === 1) {
    displayEmo1 = "inline";
    displayEmo2 = "none";
    displayEmo3 = "none";
    displayEmo4 = "none";
    displayEmo5 = "none";
  } else if (randomicon === 2) {
    displayEmo1 = "none";
    displayEmo2 = "inline";
    displayEmo3 = "none";
    displayEmo4 = "none";
    displayEmo5 = "none";
  } else if (randomicon === 3) {
    displayEmo1 = "none";
    displayEmo2 = "none";
    displayEmo3 = "inline";
    displayEmo4 = "none";
    displayEmo5 = "none";
  } else if (randomicon === 4) {
    displayEmo1 = "none";
    displayEmo2 = "none";
    displayEmo3 = "none";
    displayEmo4 = "inline";
    displayEmo5 = "none";
  } else {
    displayEmo1 = "none";
    displayEmo2 = "none";
    displayEmo3 = "none";
    displayEmo4 = "none";
    displayEmo5 = "inline";
  }

  return (
    <MuiThemeProvider theme={themeGeneralSettings}>
      <Paper
        ref={RefAppContainer}
        className="app-paper-style"
        style={{
          borderRadius: "0px",
          backgroundImage: appVariables.PaperStyle,
        }}
      >
        <Grid container className="fadeboyin">
          <Option
            switchsize={switchsize}
            darkmode={darkmode}
            setDarkmode={setDarkmode}
            marginData={marginData}
            fontData={fontData}
            superFont={superstarzText}
            optionsContainer={optionsContainer}
          />

          <Grid container className={containerApp}>
            <Grid item xs={3} sm={4} md={4}></Grid>
            <Grid
              item
              className="centericon   dontallowhighlighting"
              xs={6}
              sm={4}
              md={4}
            >
              <img
                className={icon}
                src={appVariables.logoimage}
                alt="SuperstarZ logo"
              />
            </Grid>

            <Grid item xs={3}></Grid>
            <Grid item xs={4} className="littletext-outter">
              <Typography className="app-little-text-typography">
                <span
                  className={littleText}
                  style={{
                    color: appVariables.littleTextColor,
                  }}
                >
                  Express Yourself ...
                  <span style={{ display: displayEmo1 }}>&#129419;</span>
                  <span style={{ display: displayEmo2 }}>&#9996;</span>
                  <span style={{ display: displayEmo3 }}>&#127911;</span>
                  <span style={{ display: displayEmo4 }}>&#128150;</span>
                  <span style={{ display: displayEmo5 }}>&#10024;</span>
                </span>
              </Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={4}></Grid>
            <LoginButtons
              loginstyle={loginButton}
              signupstyle={signupButton}
              match={matchPc}
              OpenModalForm={OpenModalForm}
            />
            <ModalLog
              zoomedModal={zoomedModal}
              setZoomedModal={setZoomedModal}
              mobileZoom={mobileZoom}
              setMobileZoom={setMobileZoom}
              formtype={formtype}
              screenHeight={screenHeight}
              darkmode={darkmode}
              signupstyle={signupButton}
              loginstyle={loginButton}
              PaperStyle={appVariables.PaperStyle}
              showModalForm={showModalForm}
              CloseModalForm={CloseModalForm}
            />
          </Grid>
        </Grid>
      </Paper>
    </MuiThemeProvider>
  );
};

export default App;
