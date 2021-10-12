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

  return loggedInReducer ? (
    matchPc ? (
      <Scrollbars
        autoHide={true}
        autoHideDuration={1000}
        autoHideTimeout={6000}
        style={{ height: "100vh" }}
      >
        <Profile />
      </Scrollbars>
    ) : (
      <Profile />
    )
  ) : null;
}

export default ProfileOutter;
