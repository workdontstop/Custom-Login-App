import React from "react";
import { Grid } from "@material-ui/core";
import { Slider } from "./Slider";
import { matchPc } from "../DetectDevice";
function Profile() {
  const images = ["1.png", "2.png", "3.png", "4.png"];

  return (
    <>
      <Grid
        container
        style={{
          position: "relative",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            position: "relative",
            height: "auto",
            marginTop: "-1px",
            padding: "0px",
            paddingLeft: matchPc ? "9px" : "0px",
            paddingRight: matchPc ? "10px" : "0px",
          }}
        >
          <Slider slides={images} />
          <Grid item xs={12} style={{ height: "0px" }}></Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          style={{
            position: "relative",
            height: "auto",
            marginTop: "-1px",
            padding: "0px",
            paddingLeft: matchPc ? "9px" : "0px",
            paddingRight: matchPc ? "10px" : "0px",
          }}
        >
          <Slider slides={images} />
          <Grid item xs={12} style={{ height: "0px" }}></Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          style={{
            position: "relative",
            height: "auto",
            marginTop: "-1px",
            padding: "0px",
            paddingLeft: matchPc ? "9px" : "0px",
            paddingRight: matchPc ? "10px" : "0px",
          }}
        >
          <Slider slides={images} />
          <Grid item xs={12} style={{ height: "0px" }}></Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          style={{
            position: "relative",
            height: "auto",
            marginTop: "-1px",
            padding: "0px",
            paddingLeft: matchPc ? "9px" : "0px",
            paddingRight: matchPc ? "10px" : "0px",
          }}
        >
          <Slider slides={images} />
          <Grid item xs={12} style={{ height: "0px" }}></Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
