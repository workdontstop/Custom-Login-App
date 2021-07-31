import React, { useState, useMemo, useCallback } from "react";

import { makeStyles } from "@material-ui/core";

interface IappVariables {
  shade: string;
  shade2: string;
  shade2num: string;
  shade2nump: string;
  secondarymaincolor: string;
  maincolor: string;
  shade2nump22: string;
}

var appVariablesLIGHT: IappVariables = {
  shade: "#0b111b",
  shade2: "#0b111b",
  shade2num: "1.5",
  shade2nump: "1.5",
  secondarymaincolor: "#0b111b",
  maincolor: "#0b111b",
  shade2nump22: "8",
};

const useStyleLight = useMemo(() => {
  const useStyleLightx = makeStyles((themeGeneralSettings) => ({
    AppPaperStyle: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        borderRadius: "0px",
        height: "100vh",
        textAlign: "center",
        backgroundImage:
          "linear-gradient(0deg,  rgb(220,225,225), rgb(255,255,255),rgb(246,250,255) )",
      },
    },
    PaperStyle: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        backgroundImage:
          "linear-gradient(0deg,  rgb(220,225,225), rgb(255,255,255),rgb(246,250,255))",
      },
    },

    icon: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        objectFit: "contain",
        width: "84%",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        objectFit: "contain",
        width: "84%",
      },
      [themeGeneralSettings.breakpoints.up("md")]: {
        objectFit: "contain",
        width: "60%",
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
        fontSize: "3.1vh",
        fontWeight: "bolder",
        transition: "opacity 1.5s",
        textAlign: "left",
        marginLeft: "-3px",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        fontFamily: "kaushan_scriptregular",
        fontSize: "3.5vw",
        fontWeight: "bolder",
        transition: "opacity 1.5s",
        marginLeft: "-8px",
      },
      [themeGeneralSettings.breakpoints.up("md")]: {
        fontFamily: "kaushan_scriptregular",
        fontSize: "2.2vw",
        fontWeight: "bolder",
        transition: "opacity 1.5s",
      },
    },

    littleText: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        fontSize: "1.8vh",
        marginLeft: "3.5px",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        fontSize: "2.1vw",
      },
      [themeGeneralSettings.breakpoints.up("md")]: {
        fontSize: "1.05vw",
      },
      transition: "opacity 1.5s",
      fontWeight: "bold",

      color: "#0b111b",
    },

    loginclass: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        transform: "scale(0.95)",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        fontSize: "2vw",
      },
      [themeGeneralSettings.breakpoints.up("md")]: {
        fontSize: "1vw",
      },
      padding: "11px",
      borderRadius: "50px",
      mozBoxShadow: `0 0 ${appVariablesLIGHT.shade2num}px ${appVariablesLIGHT.shade2} `,
      webkitBoxShadow: `0 0 ${appVariablesLIGHT.shade2num}px ${appVariablesLIGHT.shade2} `,
      boxShadow: `0 0 ${appVariablesLIGHT.shade2num}px ${appVariablesLIGHT.shade2} `,
    },

    signupclass: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        transform: "scale(0.95)",
      },
      [themeGeneralSettings.breakpoints.up("sm")]: {
        fontSize: "2vw",
      },
      [themeGeneralSettings.breakpoints.up("md")]: {
        fontSize: "1vw",
      },

      padding: "13.3px",
      borderRadius: "50px",
      mozBoxShadow: `0 0 4.5px ${appVariablesLIGHT.shade}`,
      webkitBoxShadow: `0 0 4.5px ${appVariablesLIGHT.shade} `,
      boxShadow: `0 0 4.5px ${appVariablesLIGHT.shade}`,
    },

    optionsContainer: {
      [themeGeneralSettings.breakpoints.up("xs")]: {
        padding: "2vh",
        paddingTop: "2.9vh",
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
}, []);

interface IappVariables {
  shade: string;
  shade2: string;
  shade2num: string;
  shade2nump: string;
  secondarymaincolor: string;
  maincolor: string;
  shade2nump22: string;
}

var appVariablesDARK: IappVariables = {
  shade: "#cccccc",
  shade2: "#cccccc",
  shade2num: "1.1",
  shade2nump: "1.8",
  secondarymaincolor: "#ccccccff",
  maincolor: "#ccccccff",
  shade2nump22: "5.5",
};

const useStyleDark = makeStyles((themeGeneralSettings) => ({
  AppPaperStyle: {
    [themeGeneralSettings.breakpoints.up("xs")]: {
      borderRadius: "0px",
      height: "100vh",
      textAlign: "center",
      backgroundImage: "linear-gradient(0deg, #282c34, #282c36, #191919 )",
    },
  },
  PaperStyle: {
    [themeGeneralSettings.breakpoints.up("xs")]: {
      backgroundImage: "linear-gradient(0deg, #282c34, #282c36, #191919 )",
    },
  },

  icon: {
    [themeGeneralSettings.breakpoints.up("xs")]: {
      objectFit: "contain",
      width: "84%",
    },
    [themeGeneralSettings.breakpoints.up("sm")]: {
      objectFit: "contain",
      width: "84%",
    },
    [themeGeneralSettings.breakpoints.up("md")]: {
      objectFit: "contain",
      width: "60%",
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
      fontSize: "3.1vh",
      fontWeight: "bolder",
      transition: "opacity 1.5s",
      textAlign: "left",
      marginLeft: "-3px",
    },
    [themeGeneralSettings.breakpoints.up("sm")]: {
      fontFamily: "kaushan_scriptregular",
      fontSize: "3.5vw",
      fontWeight: "bolder",
      transition: "opacity 1.5s",
      marginLeft: "-8px",
    },
    [themeGeneralSettings.breakpoints.up("md")]: {
      fontFamily: "kaushan_scriptregular",
      fontSize: "2.2vw",
      fontWeight: "bolder",
      transition: "opacity 1.5s",
    },
  },

  littleText: {
    [themeGeneralSettings.breakpoints.up("xs")]: {
      fontSize: "1.8vh",
      marginLeft: "3.5px",
    },
    [themeGeneralSettings.breakpoints.up("sm")]: {
      fontSize: "2.1vw",
    },
    [themeGeneralSettings.breakpoints.up("md")]: {
      fontSize: "1.05vw",
    },
    transition: "opacity 1.5s",
    fontWeight: "bold",

    color: "#ccccccff",
  },

  loginclass: {
    [themeGeneralSettings.breakpoints.up("xs")]: {
      transform: "scale(0.95)",
    },
    [themeGeneralSettings.breakpoints.up("sm")]: {
      fontSize: "2vw",
    },
    [themeGeneralSettings.breakpoints.up("md")]: {
      fontSize: "1vw",
    },
    padding: "11px",
    borderRadius: "50px",
    mozBoxShadow: `0 0 ${appVariablesDARK.shade2num}px ${appVariablesDARK.shade2} `,
    webkitBoxShadow: `0 0 ${appVariablesDARK.shade2num}px ${appVariablesDARK.shade2} `,
    boxShadow: `0 0 ${appVariablesDARK.shade2num}px ${appVariablesDARK.shade2} `,
  },

  signupclass: {
    [themeGeneralSettings.breakpoints.up("xs")]: {
      transform: "scale(0.95)",
    },
    [themeGeneralSettings.breakpoints.up("sm")]: {
      fontSize: "2vw",
    },
    [themeGeneralSettings.breakpoints.up("md")]: {
      fontSize: "1vw",
    },

    padding: "13.3px",
    borderRadius: "50px",
    mozBoxShadow: `0 0 4.5px ${appVariablesDARK.shade}`,
    webkitBoxShadow: `0 0 4.5px ${appVariablesDARK.shade} `,
    boxShadow: `0 0 4.5px ${appVariablesDARK.shade}`,
  },

  optionsContainer: {
    [themeGeneralSettings.breakpoints.up("xs")]: {
      padding: "2vh",
      paddingTop: "2.9vh",
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

export { useStyleLight, useStyleDark };
