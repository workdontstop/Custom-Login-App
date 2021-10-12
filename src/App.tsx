import "./App.css";
import "typeface-roboto";
import { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Home";
import Supercheck from "./Supercheck";
import { IsLoggedAction } from "./log/actions/IsLoggedAction";
import { IsLoggedProfileAction } from "./log/actions/IsLoggedAction";
import { UserdataActionOnLoad } from "./log/actions/UserdataAction";
import { UpdateColorAction } from "./GlobalActions";
import ProfileOutter from "./profile/ProfileOutter";

Axios.defaults.withCredentials = true;

function App(): JSX.Element {
  ///
  ///
  ///
  ///DISPATCH
  const dispatch = useDispatch();

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
    Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/checkIsLogged`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.message === "logged in") {
          dispatch(IsLoggedAction());
          dispatch(IsLoggedProfileAction());
          dispatch(UserdataActionOnLoad(response.data.payload));
        } else if (response.data.message === "logged out") {
          alert("Connection malfunction");
        }
      })
      .catch(function (error) {});
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
  ///
  ///SET COLOR TO RANDOM WHEN LOGGED OUT
  var color1 = "";
  var color2 = "";

  var color3 = "";
  var color4 = "";

  if (darkmodeReducer) {
    color1 = "#ff2a7fd4";
    color2 = "#ffd42ad6";
    color3 = "#80b3ffbc";
    color4 = "#00ff66bf";
  } else {
    color1 = "#ff0066ff";
    color2 = "#ffd900";
    color3 = "#00ccff";
    color4 = "#00ff00ff";
  }

  useEffect(() => {
    let emojicontrol: number[] = [1, 2, 3, 4];
    var randomemoji =
      emojicontrol[Math.floor(Math.random() * emojicontrol.length)];

    if (randomemoji === 1) {
      dispatch(UpdateColorAction(color1));
    } else if (randomemoji === 2) {
      dispatch(UpdateColorAction(color2));
    } else if (randomemoji === 3) {
      dispatch(UpdateColorAction(color3));
    } else {
      dispatch(UpdateColorAction(color4));
    }
  }, [color1, color2, color3, color4, dispatch]);

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
    </>
  );
}

export default App;
