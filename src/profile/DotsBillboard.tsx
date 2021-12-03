import React from "react";
import { Grid } from "@material-ui/core";
import { matchPc } from "../DetectDevice";

function DotsBillboardx({
  GotoDots,
  slides,
  activeSlide,
  ShowBillboard,
}: any): JSX.Element {
  return (
    <Grid
      container
      style={{
        position: "absolute",
        bottom: matchPc ? "3vh" : "1.6vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
      }}
    >
      {slides.map((slide: any, i: any) => (
        <span
          className="turdark"
          key={i}
          onClick={() => {
            GotoDots(i);
          }}
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
            opacity: activeSlide === i ? 0.95 : 0.6,
            padding: activeSlide === i ? "5px" : "4px",
            verticalAlign: "middle",
            marginRight: "3.5px",
            cursor: "pointer",
            borderRadius: "50%",
            display: ShowBillboard ? "block" : "none",
          }}
        >
          {" "}
        </span>
      ))}
    </Grid>
  );
}

export const DotsBillboard = React.memo(DotsBillboardx);
