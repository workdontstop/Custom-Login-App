import "./App.css";
import "typeface-roboto";
import { useState, useEffect } from "react";
import imyz from "./images/s.png";
import imyzd from "./images/sd.png";
import { LoginButtons } from "./app-folder/LogButtons";
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
import Option from "./app-folder/Option";
import * as CSS from "csstype";
import ModalLog from "./app-folder/ModalLog";

function App(): JSX.Element {
  var usetheme = useTheme();
  var match = useMediaQuery(usetheme.breakpoints.up("sm"));
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const [textVisible, setTextVisible] = useState<boolean>(true);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [formtype, setFormtype] = useState<number>(1);

  interface IappVariables {
    shade: string;
    shade2: string;
    shade2num: string;
    shade2nump: string;
    logoimage: string;
    secondarymaincolor: string;
    maincolor: string;
    shade2nump22: string;
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
  };

  var appVariablesDARK: IappVariables = {
    shade: "#cccccc",
    shade2: "#cccccc",
    shade2num: "1.1",
    shade2nump: "1.8",
    logoimage: imyzd,
    secondarymaincolor: "#ccccccff",
    maincolor: "#ccccccff",
    shade2nump22: "5.5",
  };

  var appVariablesLIGHT: IappVariables = {
    shade: "#0b1728",
    shade2: "#0b1728",
    shade2num: "1.5",
    shade2nump: "1.5",
    logoimage: imyz,
    secondarymaincolor: "#0b1728",
    maincolor: "#0b1728",
    shade2nump22: "8",
  };

  if (darkmode) {
    appVariables = appVariablesDARK;
  } else {
    appVariables = appVariablesLIGHT;
  }

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

  var useStyle = makeStyles((themeGeneralSettings) => ({
    AppPaperStyle: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        borderRadius: "0px",
        height: "100vh",
        textAlign: "center",
        backgroundImage: darkmode
          ? "linear-gradient(0deg, #282c34, #282c36, #191919 )"
          : "linear-gradient(0deg, rgb(222,225,225), rgb(238,237,239),rgb(250,250,255) )",
      },
    },
    PaperStyle: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        backgroundImage: darkmode
          ? "linear-gradient(0deg, #282c34, #282c36, #191919 )"
          : "linear-gradient(0deg, rgb(222,225,225), rgb(238,237,239),rgb(250,250,255) )",
      },
    },

    icon: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        objectFit: "contain",
        width: "83%",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        objectFit: "contain",
        width: "85%",
      },
      [themeGeneralSettings.breakpoints.up("md")]: {
        objectFit: "contain",
        width: "56%",
        transition: " 0.5s transform ease-in",
        cursor: "pointer",
      },
      "&:hover": {
        transition: "560ms transform ease-in",
        transform: "scale(1.06)",
      },
      "&:active": {
        transition: "200ms transform ease-in",
        transform: "scale(0.94)",
      },
    },

    superstarzText: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        fontFamily: "kaushan_scriptregular",
        fontSize: "2.9vh",
        fontWeight: "1000",
        transition: "opacity 1.5s",
        opacity: textVisible ? "1" : "0",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        fontFamily: "kaushan_scriptregular",
        fontSize: "3.3vw",
        fontWeight: "1000",
        transition: "opacity 1.5s",
        opacity: textVisible ? "1" : "0",
      },
      [themeGeneralSettings.breakpoints.up("md")]: {
        fontFamily: "kaushan_scriptregular",
        fontSize: "2.1vw",
        fontWeight: "1000",
        transition: "opacity 1.5s",
        opacity: textVisible ? "1" : "0",
      },
    },

    littleText: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        fontSize: "1.7vh",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        fontSize: "2.1vw",
      },
      [themeGeneralSettings.breakpoints.up("md")]: {
        fontSize: "1.1vw",
      },
      transition: "opacity 1.5s",
      fontWeight: "bolder",
      color: darkmode ? "#ccccccff" : "rgba(11, 23, 40, 1)",
      opacity: textVisible ? "1" : "0",
    },

    loginclass: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        fontSize: "1.7vh",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        fontSize: "1.9vw",
      },
      [themeGeneralSettings.breakpoints.up("md")]: {
        fontSize: "0.9vw",
      },
      padding: "8.5px",
      borderRadius: "50px",
      mozBoxShadow: `0 0 ${appVariables.shade2num}px ${appVariables.shade2} `,
      webkitBoxShadow: `0 0 ${appVariables.shade2num}px ${appVariables.shade2} `,
      boxShadow: `0 0 ${appVariables.shade2num}px ${appVariables.shade2} `,
    },

    signupclass: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        fontSize: "1.7vh",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        fontSize: "1.9vw",
      },
      [themeGeneralSettings.breakpoints.up("md")]: {
        fontSize: "0.9vw",
      },

      padding: "10.5px",
      borderRadius: "50px",
      mozBoxShadow: `0 0 4.5px ${appVariables.shade}`,
      webkitBoxShadow: `0 0 4.5px ${appVariables.shade} `,
      boxShadow: `0 0 4.5px ${appVariables.shade}`,
    },

    optionsContainer: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        padding: "3vh",
        top: "1em",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        padding: "4.5vh",
        top: "1em",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
      },
    },
  }));

  var classes = useStyle();

  const fontDataPc: CSS.Properties = { fontSize: "3.1rem" };
  const fontDataMobile: CSS.Properties = { fontSize: "1.7rem" };
  const marginDataPc: CSS.Properties = { marginLeft: "-35px" };
  const marginDataMobile: CSS.Properties = { marginLeft: "-15.5px" };

  ///
  ///
  ///
  ///hides text after some seconds
  useEffect(() => {
    var timer1 = setTimeout(() => setTextVisible(false), 7 * 1500);
    return () => {
      clearTimeout(timer1);
    };
  }, [textVisible]);

  ///
  ///
  ///
  ///calls this ON omouse/ontouch
  const textvisibility = (timer1: any) => {
    setTextVisible(true);
    clearTimeout(timer1);
  };

  ///
  ///
  ///
  ///CLOSE MODAL
  const CloseModalForm = (DeviceBackButtonClicked: number) => {
    ///pop states fires when back and forward buttons used
    if (DeviceBackButtonClicked == 1) {
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = null;
        setShowModalForm(false);
      };
    } else {
      window.history.pushState(null, "", ".");
      window.onpopstate = null;
      setShowModalForm(false);
    }
  };

  ///
  ///
  ///
  ///OPEN MODAL
  const OpenModalForm = (formtypedata: number) => {
    setFormtype(formtypedata);
    setShowModalForm(true);
    //pushstate add enteries to your history
    window.history.pushState(null, "", "CameraBoy");
    CloseModalForm(1);
  };

  return (
    <MuiThemeProvider theme={themeGeneralSettings}>
      <Paper
        onMouseOver={textvisibility}
        onTouchStart={textvisibility}
        className={classes.AppPaperStyle}
      >
        <Grid xs={12} container className="fadeboyin">
          {match ? (
            <Option
              switchsize="medium"
              darkmode={darkmode}
              setDarkmode={setDarkmode}
              marginData={marginDataPc}
              fontData={fontDataPc}
              superFont={classes.superstarzText}
              optionsContainer={classes.optionsContainer}
            />
          ) : (
            <Option
              switchsize="small"
              darkmode={darkmode}
              setDarkmode={setDarkmode}
              marginData={marginDataMobile}
              fontData={fontDataMobile}
              superFont={classes.superstarzText}
              optionsContainer={classes.optionsContainer}
            />
          )}

          <Grid
            container
            xs={12}
            className={match ? "containerapp    " : "containerappmobile   "}
          >
            <Grid xs={3} sm={4} md={4}></Grid>
            <Grid
              item
              className="centericon   dontallowhighlighting"
              xs={6}
              sm={4}
              md={4}
            >
              <img
                className={classes.icon}
                src={appVariables.logoimage}
                alt="SuperstarZ logo"
              />
            </Grid>

            <Grid xs={12} className="littletext-outter" style={{}}>
              <Typography className="app-little-text-typography" style={{}}>
                <i className={classes.littleText}>Express Yourself ...</i>
              </Typography>
            </Grid>

            <Grid xs={3} sm={3} md={4}></Grid>
            <LoginButtons
              loginclass={classes.loginclass}
              signupclass={classes.signupclass}
              match={match}
              OpenModalForm={OpenModalForm}
            />
            <ModalLog
              signupclass={classes.signupclass}
              loginclass={classes.loginclass}
              formtype={formtype}
              PaperStyle={classes.PaperStyle}
              showModalForm={showModalForm}
              CloseModalForm={CloseModalForm}
              setShowModalForm={setShowModalForm}
            />
          </Grid>
        </Grid>
      </Paper>
    </MuiThemeProvider>
  );
}

export default App;
