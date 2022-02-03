import React, { useRef, useState, useEffect } from "react";
import { matchPc, matchTablet } from "../DetectDevice";
import { Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import Masonry from "@mui/lab/Masonry";
import CircleIcon from "@mui/icons-material/Circle";
import Cropper from "react-easy-crop";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PhotoIcon from "@mui/icons-material/Photo";
import GifIcon from "@mui/icons-material/Gif";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider from "@mui/material/Slider";
import { AnySoaRecord } from "dns";

function PreviewCanvasx({
  image,
  index,
  setcropimage,
  setcrop,
  crop,
  cropTOPLEVELScrollRef,
}: any): JSX.Element {
  ///
  ///
  const changeCrop = () => {
    setcropimage(image);
    cropTOPLEVELScrollRef.current.scrollTo("topcanvas", {
      duration: 1800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <>
      <img
        onClick={changeCrop}
        src={image}
        style={{
          padding: "0px",
          width: "100%",
          height: "auto",
          cursor: "pointer",
          marginTop: index === 0 || index === 1 || index === 2 ? "0px" : "-3px",
        }}
      />
    </>
  );
}

export const PreviewCanvas = React.memo(PreviewCanvasx);
