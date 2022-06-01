import "./App.css";
import "typeface-roboto";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import SuperstarzIconLight from "./images/s.png";
import SuperstarzIconDark from "./images/sd.png";
import {
  Paper,
  Grid,
  Typography,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { Option } from "./log/Option";
import { LoginButtons } from "./log/LogButtons";

import { CommentTemplate } from "./CommentTemplate";
import { matchPc, matchTablet, matchMobile } from "./DetectDevice";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { DarkmodeAction, screenHeightAction } from "./GlobalActions";

function Home(): JSX.Element {
  const dispatch = useDispatch();

  const [showModalForm, setShowModalForm] = useState<boolean>(false);

  const RefAppContainer = useRef<HTMLDivElement>(null);

  const [aboutTemplateGo] = useState<boolean>(false);
  const [commentTemplateGo] = useState<boolean>(false);

  interface IappVariables {
    shade: string;
    shade2: string;
    shade2num: string;
    shade2nump: string;
    logoimage: string;
    secondarymaincolor: string;
    maincolor: string;
    shade2nump22: string;
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
    littleTextColor: "",
  };

  var appVariablesDARK: IappVariables = {
    shade: "#cccccc",
    shade2: "#ffffff",
    shade2num: "1.1",
    shade2nump: "1.8",
    logoimage: SuperstarzIconDark,
    secondarymaincolor: "#dddddd",
    maincolor: "#dddddd",
    shade2nump22: "5.5",
    littleTextColor: "#dddddd",
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
    littleTextColor: "#0b111b",
  };

  ///
  ///
  ///
  ///DARKMODE FROM REDUX
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
  ///MUI PAPER STYLES FROM REDUX
  const { PaperStyleLight, PaperStyleDark } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.PaperReducerLightnDark,
    })
  );

  var PaperStyleReducer = " ";
  var containerApp = "";
  var icon = "";
  var littleText = "";

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DARKMODE
  if (darkmodeReducer) {
    PaperStyleReducer = PaperStyleDark;
    appVariables = appVariablesDARK;
  } else {
    PaperStyleReducer = PaperStyleLight;
    appVariables = appVariablesLIGHT;
  }

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  if (matchPc) {
    containerApp = "containerapp";
    icon = "iconPc";
    littleText = "littletext-Pc";
    ///
  } else if (matchTablet) {
    containerApp = "containerapptablet";
    icon = "iconTablet";
    littleText = "littletext-Tablet";
    ///
  } else {
    containerApp = "containerappmobile";
    icon = "iconMobile";
    littleText = "littletext-Mobile";
  }

  ///
  ///
  ///
  ///MATERIAL UI  THEME CUSTOMIZATAION
  let themeGeneralSettings = createTheme({
    palette: {
      primary: {
        main: `${appVariables.secondarymaincolor}`,
      },
      secondary: {
        main: `${appVariables.secondarymaincolor}`,
      },
      type: darkmodeReducer ? "dark" : "light",
    },
  });

  const calculateScreenHeight = useMemo((): any => {
    const calculateScreenHeightx = () => {
      if (RefAppContainer.current && RefAppContainer.current.clientHeight) {
        dispatch(screenHeightAction(RefAppContainer.current.clientHeight));
      }
      setTimeout(function () {
        if (RefAppContainer.current && RefAppContainer.current.clientHeight) {
          dispatch(screenHeightAction(RefAppContainer.current.clientHeight));
        }
      }, 600);
    };
    return calculateScreenHeightx;
  }, [RefAppContainer, dispatch]);

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
      dispatch(DarkmodeAction(themelocaldata));
    }
  }, [calculateScreenHeight, darkmodeReducer, dispatch]);

  ///
  ///
  ///
  ///CLOSE LOG MODAL
  const [OpenModalFormOnce, setOpenModalFormOnce] = useState<boolean>(false);
  const CloseModalForm = useCallback((DeviceBackButtonClicked: number) => {
    ///onpopstate fires when back and forward buttons used
    if (DeviceBackButtonClicked === 1) {
      window.onpopstate = () => {
        setShowModalForm(false);
        setOpenModalFormOnce(false);
      };
    } else {
      setShowModalForm(false);
      setOpenModalFormOnce(false);
      ///Replace modal history state with previous history state
      window.history.back();
    }
  }, []);

  ///
  ///
  ///
  ///OPEN LOG MODAL
  const [formtype, setFormtype] = useState<number>(1);
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
    [OpenModalFormOnce, CloseModalForm]
  );

  ///
  ///
  ///
  /// RANDOME EMOJI
  const [randomicon, setRandomicon] = useState<number>(1);
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
  }, [randomicon]);

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
          backgroundImage: PaperStyleReducer,
        }}
      >
        <Grid container className="fadeboyin">
          <Option />

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
              <Typography
                className="app-little-text-typography"
                style={{ padding: matchMobile ? "35px" : "0px" }}
              >
                <span
                  className={littleText}
                  style={{
                    color: appVariables.littleTextColor,
                  }}
                >
                  <span
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    stickers, effects on audio gifs
                  </span>
                  <span
                    style={{ display: displayEmo1, verticalAlign: "middle" }}
                  >
                    &#129419;
                  </span>
                  <span
                    style={{ display: displayEmo2, verticalAlign: "middle" }}
                  >
                    &#9996;
                  </span>
                  <span
                    style={{ display: displayEmo3, verticalAlign: "middle" }}
                  >
                    &#127911;
                  </span>
                  <span
                    style={{ display: displayEmo4, verticalAlign: "middle" }}
                  >
                    &#128150;
                  </span>
                  <span
                    style={{ display: displayEmo5, verticalAlign: "middle" }}
                  >
                    &#10024;
                  </span>
                </span>
              </Typography>
            </Grid>

            <Grid item xs={3} sm={3} md={4}></Grid>

            <LoginButtons OpenModalForm={OpenModalForm} />

            <CommentTemplate
              formtype={formtype}
              showModalForm={showModalForm}
              CloseModalForm={CloseModalForm}
              aboutTemp={aboutTemplateGo}
              commentTemp={commentTemplateGo}
            />
          </Grid>
        </Grid>
      </Paper>
    </MuiThemeProvider>
  );
}

export default Home;
