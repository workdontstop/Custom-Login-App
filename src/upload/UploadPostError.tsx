import React from "react";
import { animated, useSpring } from "react-spring";
import { Grid, DialogContent } from "@material-ui/core";

import { useSelector } from "react-redux";
import "./logCss.css";
function UploadPostErrorx({
  device,
  serverEmojiplain,
  setServerErrorData,
  serverErrorDisplay,
  serverErrorData,
}: any) {
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
  ///USE SLIDE DOWN ANIMATION FROM REACT SPRING SERVER ERROR
  const serverErrorAnimation = useSpring({
    config: {
      duration: 500,
    },
    opacity: serverErrorDisplay,
    transform: serverErrorData ? `translateY(0%)` : `translateY(-100%)`,
  });

  var ErrorColor = "";

  var Backtype = "";
  var textback = "";

  var severerrorData = "";
  var severerrorEmoji = "";
  var severerrorEmojiLeft = "";

  if (device === "pc") {
    severerrorData = "1.25vw";
    severerrorEmoji = "1.6vw";
    severerrorEmojiLeft = "";
  } else if (device === "mobile") {
    severerrorData = "2.2vh";
    severerrorEmoji = "2.7vh";
    severerrorEmojiLeft = "4vw";
  } else {
  }

  if (darkmodeReducer) {
    ErrorColor = "rgb(34, 34, 34, 0.05)";
    textback = "caption-dark";
  } else {
    ErrorColor = "rgb(238, 238, 238 0.09)";
    textback = "caption-light";
  }

  darkmodeReducer
    ? (Backtype = "error-background-dark")
    : (Backtype = "error-background-light");

  return (
    <>
      <DialogContent
        onClick={() => setServerErrorData(null)}
        className={
          serverErrorData
            ? ` dontallowhighlighting ${Backtype} server-error`
            : `display-off`
        }
      >
        <animated.div style={serverErrorAnimation}>
          <Grid
            container
            className="server-error-container"
            style={{
              backgroundColor: ErrorColor,
            }}
          >
            <Grid item xs={12} className="server-error-inner">
              <Grid
                item
                className="sever-error-data"
                style={{
                  fontSize: severerrorData,
                  paddingLeft: "1px",
                }}
                xs={11}
                sm={10}
              >
                <span
                  style={{
                    color: darkmodeReducer ? "#ffffff" : "#0b1728",
                  }}
                  className={textback}
                >
                  {serverErrorData}
                </span>
              </Grid>
              <Grid
                item
                className={
                  serverEmojiplain
                    ? "display-on server-error-emoji"
                    : "display-off"
                }
                xs={1}
              >
                <span
                  className="server-error-emoji-span"
                  style={{
                    fontSize: severerrorEmoji,
                    marginLeft: severerrorEmojiLeft,
                  }}
                >
                  &#128517;
                </span>
              </Grid>
              <Grid
                item
                className={
                  serverEmojiplain
                    ? "display-off"
                    : "display-on server-error-emoji"
                }
                xs={1}
              >
                <span
                  className="server-error-emoji-span"
                  style={{
                    fontSize: severerrorEmoji,
                    marginLeft: severerrorEmojiLeft,
                  }}
                >
                  &#128543;
                </span>
              </Grid>
            </Grid>
          </Grid>
        </animated.div>
      </DialogContent>
    </>
  );
}

export const UploadPostError = React.memo(UploadPostErrorx);
