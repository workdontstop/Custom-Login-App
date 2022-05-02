import React from "react";
import { Grid } from "@material-ui/core";
import { matchPc } from "../DetectDevice";
import { useSelector, useDispatch } from "react-redux";

function ArrowBillboardx({
  clickSlideprev,
  clickSlidenext,
  imageHeight,
  ShowBillboard,
}: any): JSX.Element {
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

  return (
    <>
      <>
        <Grid
          container
          style={{
            position: "absolute",
            zIndex: 3,
            height: "0px",
            width: matchPc ? "100.8%" : "100%",
            padding: "1px",
            left: matchPc ? "-4px" : "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
            top: "-1px",
          }}
        >
          <Grid
            item
            onClick={clickSlideprev}
            className={
              darkmodeReducer
                ? "slider-arrow-backpad-leftDARK"
                : "slider-arrow-backpad-leftLIGHT"
            }
            style={{
              height: `${imageHeight}px`,
              cursor: "pointer",
              display: ShowBillboard ? "block" : "none",
            }}
            xs={2}
          >
            {" "}
          </Grid>{" "}
          <Grid item style={{ height: "0px" }} xs={8}>
            {" "}
          </Grid>{" "}
          <Grid
            item
            onClick={clickSlidenext}
            className={
              darkmodeReducer
                ? "slider-arrow-backpad-rightDARK"
                : "slider-arrow-backpad-rightLIGHT"
            }
            style={{
              height: `${imageHeight}px`,
              cursor: "pointer",
              display: ShowBillboard ? "block" : "none",
            }}
            xs={2}
          >
            {" "}
          </Grid>
        </Grid>
      </>
    </>
  );
}

export const ArrowBillboard = React.memo(ArrowBillboardx);
