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
        alert("app.tsx checkislogged error");
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
