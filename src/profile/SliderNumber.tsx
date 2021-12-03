import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";

function SliderNumberx({
  activeSlide,
  total,
  pey,
  itemCLICKED,
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
            {" "}
            <div
              style={{
                position: "absolute",
                zIndex: 3,
                right: 21,
                top: "3vh",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontWeight: "bolder",
              }}
            >
              <span
                className={darkmodeReducer ? "turdark" : "turlight"}
                style={{
                  height: "200px",
                  width: "20px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  backgroundColor: darkmodeReducer
                    ? "rgba(51,51,51,0.66)"
                    : "rgba(255,255,255,0.6) ",
                  padding: "6px",
                  borderRadius: "42%",
                  fontSize: "0.92vw",
                  color: darkmodeReducer ? "#eeeeee" : "#111111 ",
                }}
              >
                {activeSlide + 1}
                <span style={{ fontSize: "1vw" }}>/</span>
                {total}
              </span>
            </div>{" "}
          </>
        )
      ) : null}
    </>
  );
}

export const SliderNumber = React.memo(SliderNumberx);
