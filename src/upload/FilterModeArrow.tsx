import React from "react";
import { Grid } from "@material-ui/core";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

function FilterModeArrowx({
  clickSlideprev,
  clickSlidenext,
  tfilterHeightey,
  itemCLICKED,
  total,
  filterHeight,
  fullHeight,
}: any): JSX.Element {
  ///
  ///
  ///
  /// INTERFACE/TYPES FOR SCREENHEIGHT AND DARKMODE
  interface RootStateGlobalReducer {
    GlobalReducer: {
      darkmode: boolean;
    };
  }

  ///
  ///
  ///
  /// GET SCREENHEIGHT FROM REDUX STORE
  const { darkmode } = useSelector((state: RootStateGlobalReducer) => ({
    ...state.GlobalReducer,
  }));

  const darkmodeReducer = darkmode;

  return (
    <>
      <Grid
        container
        style={{
          position: "absolute",
          zIndex: 2,
          height: "0px",
          width: "100%",
          padding: "0px",
          marginTop: "5px",
        }}
      >
        <Grid
          item
          onMouseDown={clickSlideprev}
          className={
            darkmodeReducer
              ? "slider-arrow-backpad-leftDARK"
              : "slider-arrow-backpad-leftLIGHT"
          }
          style={{
            height: `${filterHeight}px`,
            cursor: "pointer",
          }}
          xs={2}
          sm={1}
        >
          {" "}
        </Grid>{" "}
        <Grid item style={{ height: "0px" }} xs={8} sm={10}>
          {" "}
        </Grid>{" "}
        <Grid
          item
          onMouseDown={clickSlidenext}
          className={
            darkmodeReducer
              ? "slider-arrow-backpad-rightDARK"
              : "slider-arrow-backpad-rightLIGHT"
          }
          style={{
            height: `${filterHeight}px`,
            cursor: "pointer",
          }}
          xs={2}
          sm={1}
        >
          {" "}
        </Grid>
      </Grid>
    </>
  );
}

export const FilterModeArrow = React.memo(FilterModeArrowx);
