import "./App.css";
import "typeface-roboto";
import { useEffect, useState } from "react";
import Axios from "axios";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import Home from "./Home";
import { matchPc, matchTablet, matchMobile } from "./DetectDevice";
import Supercheck from "./Supercheck";
import { IsLoggedAction } from "./log/actions/IsLoggedAction";
import { IsLoggedProfileAction } from "./log/actions/IsLoggedAction";
import { UserdataActionOnLoad } from "./log/actions/UserdataAction";
import { UpdateColorAction } from "./GlobalActions";
import { Grid, GridSize } from "@material-ui/core";
import SuperstarzIconLight from "./images/s.png";
import SuperstarzIconDark from "./images/sd.png";
import ProfileOutter from "./profile/ProfileOutter";

Axios.defaults.withCredentials = true;

function App(): JSX.Element {
  ///
  ///
  ///
  ///DISPATCH
  const dispatch = useDispatch();

  const [superLoad, setsuperLoad] = useState<boolean>(true);

  ///
  ///
  ///
  ///TYPES FOR ISLOGGEDIN
  interface RootStateIsLogged {
    IsLoggedReducer: {
      loggedIn: boolean;
    };
  }

  /////////////////////////////
  ///
  ///
  ///LOGGED IN DATA FROM REDUX
  const { loggedIn } = useSelector((state: RootStateIsLogged) => ({
    ...state.IsLoggedReducer,
  }));
  const loggedInReducer = loggedIn;

  ///
  ///
  ///
  ///TYPES FOR ISLOGGEDINPROFILE
  interface RootStateIsLoggedProfile {
    IsLoggedProfileReducer: {
      loggedInProfile: boolean;
    };
  }
  /////////////////////////

  ///////////////////////
  ///
  ///
  ///LOGGEDPROFILE IN DATA FROM REDUX
  const { loggedInProfile } = useSelector(
    (state: RootStateIsLoggedProfile) => ({
      ...state.IsLoggedProfileReducer,
    })
  );
  const loggedInProfileReducer = loggedInProfile;
  //////////////

  ///
  ///
  ///
  ///DOT ENV DATA
  const { REACT_APP_SUPERSTARZ_URL } = process.env;

  ///
  ///
  ///MODAL ZOOMED STATE
  useEffect(() => {
    setTimeout(function () {
      setsuperLoad(false);
    }, 4000);
    document.title = "SuperstarZ";
  }, []);

  ///
  ///
  ///MODAL ZOOMED STATE
  useEffect(() => {
    Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/checkIsLogged`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.message === "logged in") {
          dispatch(IsLoggedAction());
          dispatch(IsLoggedProfileAction());
          dispatch(UserdataActionOnLoad(response.data.payload));
          var colorboy = {
            color1: response.data.payload.usercolor1,
            color2: response.data.payload.usercolor2,
            colortype: response.data.payload.usercolortype,
          };
          dispatch(UpdateColorAction(colorboy));
        } else if (response.data.message === "logged out") {
          alert("app.tsx checkislogged logged out");
        }
      })
      .catch(function (error) {
        console.log("app.tsx checkislogged error");
      });
  }, [REACT_APP_SUPERSTARZ_URL, dispatch]);

  ///
  ///
  ///
  /// GET DARK MODE REDUCER FROM REDUX STORE
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
  ///MUI PAPER STYLES FROM REDUX
  const { PaperStyleLight, PaperStyleDark } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.PaperReducerLightnDark,
    })
  );
  var PaperStyleReducer = "";
  var logoimage;

  if (darkmodeReducer) {
    PaperStyleReducer = PaperStyleDark;
    logoimage = SuperstarzIconDark;
  } else {
    PaperStyleReducer = PaperStyleLight;
    logoimage = SuperstarzIconLight;
  }

  var icon;
  var containerApp = "containerappmobile";
  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  if (matchPc) {
    containerApp = "containerapp";
    icon = "iconPc";

    ///
  } else if (matchTablet) {
    containerApp = "containerapptablet";
    icon = "iconTablet";

    ///
  } else {
    containerApp = "containerappmobile";
    icon = "iconMobile";
  }

  return (
    <>
      {loggedInReducer ? (
        loggedInProfileReducer ? (
          <ProfileOutter />
        ) : (
          <Supercheck />
        )
      ) : (
        <Home />
      )}

      {superLoad ? (
        <>
          <Grid
            container
            style={{
              backgroundImage: PaperStyleReducer,
              position: "fixed",
              top: "0px",
              width: "100%",
              height: "100%",
              zIndex: 10,
            }}
          >
            <Grid container className={containerApp} style={{ top: "27%" }}>
              <Grid item xs={3} sm={4} md={4}></Grid>
              <Grid
                item
                className="centericon   dontallowhighlighting"
                xs={6}
                sm={4}
                md={4}
                style={{
                  textAlign: "center",
                }}
              >
                <img
                  className={icon}
                  src={logoimage}
                  alt="SuperstarZ logo"
                  style={{ textAlign: "center" }}
                />
              </Grid>

              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>{" "}
        </>
      ) : null}
    </>
  );
}

export default App;
