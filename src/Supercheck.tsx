import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import profilePic from "./images/profile/2602017071517530029820170521192154199Screenshot_2016-05-29-20-10-52_1.jpg";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SuperstarzIconLight from "./images/ssmall.png";
import SuperstarzIconDark from "./images/sdsmall.png";
import {
  Paper,
  Grid,
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";

interface stateType {
  userdata: { username: string; usercolor: string; userimage: string };
}

function Supercheck() {
  const [darkmode, setDarkmode] = useState<boolean>(false);

  //
  //
  //
  //SETS DARKMODE FROM LOCAL STORAGE IF NOT EMPTY
  useEffect(() => {
    let themelocaldata = JSON.parse(localStorage.getItem("darkmode")!);
    if (themelocaldata !== null) {
      setDarkmode(themelocaldata);
    }
  }, []);

  interface IsuperCheckVariables {
    logoimage: string;
    secondarymaincolor: string;
    maincolor: string;
    moreoptions: string;
  }

  var superCheckVariables: IsuperCheckVariables = {
    logoimage: "",
    secondarymaincolor: "",
    maincolor: "",
    moreoptions: "",
  };

  var superCheckVariablesDARK: IsuperCheckVariables = {
    logoimage: SuperstarzIconDark,
    secondarymaincolor: "#ccccccff",
    maincolor: "#ccccccff",
    moreoptions: "supercheck-options-dark",
  };

  var superCheckVariablesLIGHT: IsuperCheckVariables = {
    logoimage: SuperstarzIconLight,
    secondarymaincolor: "#0b111b",
    maincolor: "#0b111b",
    moreoptions: "supercheck-options-light",
  };

  if (darkmode) {
    superCheckVariables = superCheckVariablesDARK;
  } else {
    superCheckVariables = superCheckVariablesLIGHT;
  }

  let themeGeneralSettings = createMuiTheme({
    palette: {
      primary: {
        main: `${superCheckVariables.maincolor}`,
      },
      secondary: {
        main: `${superCheckVariables.secondarymaincolor}`,
      },
      type: darkmode ? "dark" : "light",
    },
  });

  var useStyle = makeStyles((themeGeneralSettings) => ({
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
    PaperStyle: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        backgroundImage: darkmode
          ? "linear-gradient(0deg, #282c34, #282c36, #191919 )"
          : "linear-gradient(0deg, rgb(220,225,225), rgb(235,237,239),rgb(246,250,255) )",
      },
    },
  }));

  var classes = useStyle();

  const { state } = useLocation<stateType>();
  console.log(state.userdata);
  return (
    <MuiThemeProvider theme={themeGeneralSettings}>
      <Paper className={classes.PaperStyle} style={{ borderRadius: "0px" }}>
        <Grid
          container
          style={{
            padding: "20px",
            paddingRight: "20px",
            position: "absolute",
            top: "0em",
            fontFamily: "kaushan_scriptregular",
            transition: "opacity 1.5s",
            display: "flex",
          }}
        >
          <Grid
            xs={12}
            item
            style={{
              fontFamily: "kaushan_scriptregular",
              fontSize: "2.41vw",
              fontWeight: "bolder",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <img
              style={{
                objectFit: "contain",
                width: "4.9%",
                opacity: 0.6,
              }}
              src={superCheckVariables.logoimage}
              alt="SuperstarZ logo"
            />
          </Grid>
        </Grid>

        <div style={{ height: "100vh", width: "100%" }}>
          <div
            className="center-content-vertically"
            style={{
              zIndex: 1,
              width: "100%",
              display: "grid",
              position: "absolute",
              height: "0px",
            }}
          >
            <div className={superCheckVariables.moreoptions}>
              <MoreVertIcon
                className="make-plainIcons-clickable"
                style={{ fontSize: "3.8rem" }}
              />
            </div>
          </div>
          <div
            className="center-content-vertically"
            style={{
              cursor: "pointer",
              zIndex: 0,
              width: "100%",
              display: "grid",
              position: "absolute",
            }}
          >
            <img
              className="make-small-image-clickable-neutral"
              style={{
                position: "relative",
                objectFit: "contain",
                width: "30%",
                borderRadius: "200px",
                margin: "auto",
              }}
              src={profilePic}
              alt="SuperstarZ logo"
            />
          </div>
        </div>
      </Paper>
    </MuiThemeProvider>
  );
}

export default Supercheck;
