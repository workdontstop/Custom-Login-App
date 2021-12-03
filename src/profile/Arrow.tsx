import React from "react";
import { Grid } from "@material-ui/core";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

function Arrowx({
  clickSlideprev,
  clickSlidenext,
  itemOriginalPostHeight,
  pey,
  itemCLICKED,
  total,
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
      {itemCLICKED[pey] ? (
        total === 1 ? null : (
          <>
            <Grid
              container
              style={{
                position: "absolute",
                top: "0em",
                zIndex: 2,
                height: "0px",
                width: "100%",
                padding: "0px",
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
                  height: `${itemOriginalPostHeight[pey]}px`,
                  cursor: "pointer",
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
                  height: `${itemOriginalPostHeight[pey]}px`,
                  cursor: "pointer",
                }}
                xs={2}
              >
                {" "}
              </Grid>
            </Grid>
          </>
        )
      ) : null}
    </>
  );
}

export const Arrow = React.memo(Arrowx);
