import React from "react";
import { Grid } from "@material-ui/core";
import { matchPc } from "../DetectDevice";

function ArrowBillboardx({
  clickSlideprev,
  clickSlidenext,
  imageHeight,
  ShowBillboard,
}: any): JSX.Element {
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
              matchPc
                ? `slider-arrow-backpad-left`
                : `slider-arrow-backpad-leftMobile`
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
              matchPc
                ? `slider-arrow-backpad-right`
                : `slider-arrow-backpad-rightMobile`
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
