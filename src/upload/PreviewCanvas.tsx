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
  allowCropAllCanvas,
  cutOffLoader,
  setwaitONLOAD,
  setsuperCropLoadFade,
  setcutOffLoader,
  length,
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

  const loader = () => {
    if (allowCropAllCanvas) {
      if (length - 1 === index) {
        if (cutOffLoader === 0) {
          setwaitONLOAD(false);
        } else {
        }
      }
    }
  };

  return (
    <>
      <img
        onLoad={loader}
        onClick={changeCrop}
        src={image}
        style={{
          width: "100%",
          height: "auto",
          cursor: "pointer",
          marginTop: matchPc
            ? index === 0 || index === 1 || index === 2
              ? "0px"
              : "-5px"
            : index === 0 || index === 1
            ? "0px"
            : "-5px",
        }}
      />
    </>
  );
}

export const PreviewCanvas = React.memo(PreviewCanvasx);
