import React from "react";

import { Grid } from "@material-ui/core";

import { useSelector } from "react-redux";

function SuperLoaderx(): JSX.Element {
  ///
  ///
  ///
  /// GET DARKMODE FROM REDUX STORE
  interface RootStateLoaderReducer {
    GlobalReducerLoader: {
      loader: boolean;
    };
  }
  const { loader } = useSelector((state: RootStateLoaderReducer) => ({
    ...state.GlobalReducerLoader,
  }));
  const loaderReducer = loader;

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

  var superloader = "";
  var superloaderDisplay = "none";

  if (loaderReducer) {
    superloader = "superloader";
    superloaderDisplay = "block";
  } else {
    superloader = "";
    superloaderDisplay = "none";
  }

  return (
    <>
      <Grid
        container
        className={
          darkmodeReducer ? `${superloader} turdark` : `${superloader} turlight`
        }
        style={{
          boxShadow: `0 0 3px ${colorReducer}`,
          backgroundColor: colorReducer,
          height: "3px",
          position: "fixed",
          display: superloaderDisplay,
          zIndex: 100000,
          top: "0em",
        }}
      ></Grid>
    </>
  );
}

export const SuperLoader = React.memo(SuperLoaderx);
