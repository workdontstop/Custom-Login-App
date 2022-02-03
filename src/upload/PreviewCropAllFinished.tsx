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

function PreviewCropAllFinishedx({ addfinishedCropRef }: any): JSX.Element {
  alert("kj");
  return (
    <>
      <img ref={addfinishedCropRef} style={{ width: "100%", height: "auto" }} />
    </>
  );
}

export const PreviewCropAllFinished = React.memo(PreviewCropAllFinishedx);
