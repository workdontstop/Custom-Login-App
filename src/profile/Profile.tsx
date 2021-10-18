import React, { useRef, useState, useEffect } from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import "./profile.css";
import { Billboard } from "./Billboard";
import { OptionsSlider } from "./OptionsSlider";
import { useSpring, animated } from "react-spring";

function Profilex() {
  const optionsImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

  const getSliderWidthRef = useRef<HTMLDivElement>(null);

  const [getSliderWidth, setgetSliderWidth] = useState(0);

  ///
  ///
  ///
  ///SHOW HIDDEN REMEMBER ME BUTTON AFTER SOME SECONDS
  useEffect(() => {
    if (getSliderWidthRef.current && getSliderWidthRef.current.clientWidth) {
      setgetSliderWidth(getSliderWidthRef.current.clientWidth);
    }
  }, []);

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
  ///MUI PAPER STYLES FROM REDUX
  const { PaperStyleLight, PaperStyleDark } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.PaperReducerLightnDark,
    })
  );

  var PaperStyleReducer = "";

  if (darkmodeReducer) {
    PaperStyleReducer = PaperStyleDark;
  } else {
    PaperStyleReducer = PaperStyleLight;
  }

  ///

  ///
  ///
  ///
  return (
    <>
      <Paper
        style={{
          backgroundImage: PaperStyleReducer,
          height: "200vh",
          borderRadius: "0px",
        }}
      >
        {" "}
        <Billboard />
        <Grid container className="dontallowhighlighting">
          <Grid
            item
            component={Box}
            display={{ xs: "none", md: "block" }}
            md={3}
          ></Grid>

          <Grid
            ref={getSliderWidthRef}
            xs={2}
            md={1}
            style={{ padding: "0px" }}
          ></Grid>

          <Grid xs={3} md={2} style={{ padding: "0px" }}></Grid>
          <Grid
            item
            xs={7}
            md={4}
            style={{
              height: "150px",
              paddingLeft: matchTablet ? "42px" : "20px",
              marginTop: "-4px",
            }}
          >
            <OptionsSlider getSliderWidth={getSliderWidth} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export const Profile = React.memo(Profilex);
