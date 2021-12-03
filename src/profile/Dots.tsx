import React from "react";
import { Grid } from "@material-ui/core";
import { RootStateOrAny, useSelector } from "react-redux";

function Dotsx({
  GotoDots,
  slides,
  activeSlide,
  itemCLICKED,
  pey,
  total,
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
      {itemCLICKED[pey] ? (
        total === 1 ? null : (
          <>
            <Grid
              container
              style={{
                position: "absolute",
                bottom: "4vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              {slides.map((slide: any, i: any) => (
                <span
                  className={darkmodeReducer ? "turdarkdot" : "turdark"}
                  key={i}
                  onClick={() => {
                    GotoDots(i);
                  }}
                  style={{
                    verticalAlign: "middle",
                    backgroundColor: darkmodeReducer
                      ? " rgba(51,51,51,1)"
                      : "rgba(255,255,255,0.8)",
                    opacity: activeSlide === i ? 0.95 : 0.6,
                    padding: activeSlide === i ? "5px" : "3px",
                    marginRight: "3.6px",
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                >
                  {" "}
                </span>
              ))}
            </Grid>
          </>
        )
      ) : null}
    </>
  );
}

export const Dots = React.memo(Dotsx);
