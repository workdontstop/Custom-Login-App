import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { matchPc } from "../DetectDevice";
import { Profile } from "./Profile";
import { useSelector } from "react-redux";
function ProfileOutter() {
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

  return loggedInReducer ? (
    matchPc ? (
      <Scrollbars
        autoHide={true}
        autoHideDuration={1000}
        autoHideTimeout={6000}
        style={{ height: "100vh" }}
        renderTrackHorizontal={(props) => (
          <div {...props} className="track-horizontal" />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className="thumb-horizontal" />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
        renderThumbVertical={(props) => (
          <div
            {...props}
            className={
              darkmodeReducer ? "thumb-verticalDARK" : "thumb-verticalLIGHT"
            }
          />
        )}
        renderView={(props) => <div {...props} className="view" />}
      >
        <Profile />
      </Scrollbars>
    ) : (
      <Profile />
    )
  ) : null;
}

export default ProfileOutter;
