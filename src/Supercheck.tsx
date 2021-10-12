import React, { useState, useCallback, useRef, useEffect } from "react";
import profilePic from "./images/filC2592017-08-17-12-31-0029820170419090518full_size_20170419012414.jpg";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { matchPc, matchTablet } from "./DetectDevice";
import Axios from "axios";
import { SuperCheckFeedBack } from "./SuperCheckFeedBack";
import SuperstarzIconLight from "./images/ssmall.png";
import SuperstarzIconDark from "./images/sdsmall.png";
import { Paper, Grid } from "@material-ui/core";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { IsLoggedProfileAction } from "./log/actions/IsLoggedAction";
import RestoreIcon from "@material-ui/icons/Restore";
import { rememberMeAction } from "./GlobalActions";
import { usePalette } from "react-palette";

function Supercheck() {
  const dispatch = useDispatch();
  const { data, loading, error } = usePalette(profilePic);

  ///
  ///
  ///
  ///GTO PROFILE PAGE FINALLY
  const Gotoprofile = () => {
    dispatch(IsLoggedProfileAction());
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

  ///
  ///
  ///
  /// GET KEEP ME LOGGED IN STATE FROM REDUX STORE
  interface RootStateReducerKeepMeLoggedIn {
    GlobalReducerKeepMeLoggedIn: {
      rememberMe: boolean;
    };
  }
  const { rememberMe } = useSelector(
    (state: RootStateReducerKeepMeLoggedIn) => ({
      ...state.GlobalReducerKeepMeLoggedIn,
    })
  );
  const rememberMeReducer = rememberMe;

  ///
  ///
  ///
  /// GET PROFILE IMAGE DATA FROM REDUX STORE
  interface RootStateReducerImage {
    UserdataReducer: {
      image: string;
    };
  }
  const { image } = useSelector((state: RootStateReducerImage) => ({
    ...state.UserdataReducer,
  }));
  const imageReducer = image;

  const [Feedbackshow, setFeedbackshow] = useState<boolean>(false);
  const [rememberMeButtonshow, setRememberMeButtonshow] =
    useState<boolean>(false);
  const [holdcolorData, setHoldcolorData] = useState<any>(colorReducer);

  ///
  ///
  ///
  ///DOT ENV FILE
  const { REACT_APP_SUPERSTARZ_URL } = process.env;

  ///
  ///
  ///
  ///LOGOUT
  const logout = () => {
    Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/logout`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.message === "cookie deleted") {
          alert("logout  complete");
        } else if (response.data.message === "cookie null") {
          alert("logged out  already");
        }
      })
      .catch(function (error) {
        alert("Connection failure ");
      });
  };

  ///
  ///
  ///
  ///DARKMODE VARIABLE FOR  UI

  interface IsuperCheckVariables {
    logoimage: string;
    moreoptions: string;
  }

  var superCheckVariables: IsuperCheckVariables = {
    logoimage: "",

    moreoptions: "",
  };

  var superCheckVariablesDARK: IsuperCheckVariables = {
    logoimage: SuperstarzIconDark,
    moreoptions: "supercheck-options-dark",
  };

  var superCheckVariablesLIGHT: IsuperCheckVariables = {
    logoimage: SuperstarzIconLight,
    moreoptions: "supercheck-options-light",
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
    superCheckVariables = superCheckVariablesDARK;
    PaperStyleReducer = PaperStyleDark;
  } else {
    superCheckVariables = superCheckVariablesLIGHT;
    PaperStyleReducer = PaperStyleLight;
  }

  ///DARKMODE VARIABLE FOR  UI
  ///
  ///
  ///

  ///
  ///
  ///
  ///DETETCT DEVICE TYPE VARIABLES

  var imageWidth = "";
  var optionsClass = "";
  var iconSize = "";
  var fontOptions = "";
  var pad = "";
  var padR = "";
  var margintopp = "";
  var justifyContentt = "";

  if (matchPc) {
    imageWidth = "26%";
    iconSize = "4.7%";
    optionsClass = "supercheck-optionsPc";
    fontOptions = "3.8rem";
    pad = "33px";
    padR = "20px";
    margintopp = "-2vh";
    justifyContentt = "flex-start";
  } else if (matchTablet) {
    imageWidth = "45%";
    iconSize = "11%";
    optionsClass = "supercheck-optionsTablet";
    fontOptions = "4rem";
    pad = "33px";
    padR = "20px";
    margintopp = "0.8vh";
    justifyContentt = "flex-start";
  } else {
    imageWidth = "60%";
    iconSize = "18%";
    optionsClass = "supercheck-optionsMobile";
    fontOptions = "2rem";
    pad = "10px";
    padR = "2.5px";
    margintopp = "-0.1vh";
    justifyContentt = "flex-start";
  }
  ///DETETCT DEVICE TYPE VARIABLES
  ///
  ///
  ///

  var opacityremember = "";
  var rememberMeType = "";
  var FeedBackData = "";
  var rememberColor: any = colorReducer;
  var opacityrememberout = "";
  var colorremember = "";

  ///
  ///
  ///
  ///SHOW HIDDEN REMEMBER ME BUTTON AFTER SOME SECONDS
  useEffect(() => {
    setTimeout(function () {
      setRememberMeButtonshow(true);
    }, 500);
  }, []);

  ///
  ///
  ///
  ///UPDATE IMAGE DOMINANT COLOR FOR REG USER
  useEffect(() => {
    setHoldcolorData(data.darkVibrant);
  }, [data.darkVibrant]);

  ///
  ///
  ///
  /// CONDITIONAL STATEMENT  KEEP ME LOGGED IN STYLING
  if (rememberMeReducer) {
    opacityrememberout = "1";
    colorremember = "#ffffff";
    opacityremember = "1";
    rememberColor = holdcolorData;
    rememberMeType = "session";
    FeedBackData = "user will stay logged in on browser close";
  } else {
    opacityrememberout = "";
    colorremember = "";
    opacityremember = "0.7";
    rememberColor = "";
    rememberMeType = "forever";
    FeedBackData = "user will be forgotten on browser close";
  }

  ///
  ///
  ///
  ///SERVER ACCESS TO  CHANGE COOKIE EXPIRATION DATE
  const rememberTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remembergoshow = () => {
    setFeedbackshow(true);
    if (rememberTimer.current) {
      clearTimeout(rememberTimer.current);
    }
    rememberTimer.current = setTimeout(() => {
      setFeedbackshow(false);
    }, 3000);
  };
  const rememberUser = () => {
    Axios.post(
      `http://${REACT_APP_SUPERSTARZ_URL}/keepmeloggedin`,
      {
        values: rememberMeType,
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.data.message === "session_Cookie_Activated") {
          dispatch(rememberMeAction(false));
          remembergoshow();
        } else if (response.data.message === "forever_Cookie_Activated") {
          dispatch(rememberMeAction(true));
          remembergoshow();
        }
      })
      .catch(function (error) {
        alert("Connection failure ");
      });
  };

  ///
  ///
  ///TYPES FOR ISLOGGEDIN
  interface RootStateIsLogged {
    IsLoggedReducer: {
      loggedIn: boolean;
    };
  }

  ///
  ///
  ///LOGGED IN DATA FROM REDUX
  const { loggedIn } = useSelector((state: RootStateIsLogged) => ({
    ...state.IsLoggedReducer,
  }));
  const loggedInReducer = loggedIn;

  return loggedInReducer ? (
    <>
      {" "}
      <Paper
        style={{ borderRadius: "0px", backgroundImage: PaperStyleReducer }}
      >
        <Grid
          container
          style={{
            position: "absolute",
            top: "0em",
            transition: "opacity 1.5s",
            display: "flex",
          }}
        >
          <SuperCheckFeedBack
            Feedbackshow={Feedbackshow}
            rememberTimer={rememberTimer}
            setFeedbackshow={setFeedbackshow}
            FeedBackData={FeedBackData}
            rememberMeType={rememberMeType}
          />
        </Grid>

        <Grid container style={{ height: "100vh", width: "100%" }}>
          <Grid item xs={12}>
            <Grid
              item
              xs={12}
              className="center-content-vertically dontallowhighlighting"
              style={{
                cursor: "pointer",
                zIndex: 0,
                margin: "auto",
                display: "grid",
                position: "relative",
                marginTop: matchPc ? "-4.3vh" : matchTablet ? "-4vh" : "-4.2vh",
              }}
            >
              <Grid
                onClick={rememberUser}
                className={`${superCheckVariables.moreoptions}   ${optionsClass}  buttonshakelogoption `}
                style={{
                  zIndex: 1,
                  backgroundColor: rememberColor,
                  opacity: rememberMeButtonshow ? opacityrememberout : 0,
                }}
              >
                <RestoreIcon
                  style={{
                    fontSize: fontOptions,
                    opacity: opacityremember,
                    color: colorremember,
                  }}
                  titleAccess={
                    rememberMeReducer
                      ? "Forget User On Browser Close"
                      : "Keep Me Logged In"
                  }
                  className="zuperkinginfo"
                />
              </Grid>

              <img
                onClick={Gotoprofile}
                className="make-small-image-clickable-neutral  iconPc"
                style={{
                  position: "relative",
                  objectFit: "contain",
                  width: imageWidth,
                  borderRadius: "200px",
                  margin: "auto",
                }}
                src={`./images/profile/${imageReducer}`}
                alt="SuperstarZ logo"
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  ) : null;
}

export default Supercheck;
