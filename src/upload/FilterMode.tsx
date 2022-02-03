import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { matchPc, matchTablet } from "../DetectDevice";
import { Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import Masonry from "@mui/lab/Masonry";
import CircleIcon from "@mui/icons-material/Circle";
import { SuperCrop } from "./SuperCrop";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PhotoIcon from "@mui/icons-material/Photo";
import GifIcon from "@mui/icons-material/Gif";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Axios from "axios";
import CropIcon from "@mui/icons-material/Crop";
import CheckIcon from "@mui/icons-material/Check";
import { PreviewCanvasCropAll } from "./PreviewCanvasCropAll";
import { PreviewCanvas } from "./PreviewCanvas";

function FilterModex({ filterImage }: any): JSX.Element {
  ///
  ///
  ///
  const filterbaseimageRef: any = useRef(null);

  useEffect(() => {
    ////// itemUploadRef.current[index].src = canvasRef.current.toDataURL();
    console.log(filterImage);
  }, [filterbaseimageRef, filterImage]);

  return (
    <>
      {filterImage.map((photo: any, index: any) => {
        return (
          <img
            ref={filterbaseimageRef}
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              margin: "auto",
            }}
          />
        );
      })}
    </>
  );
}

export const FilterMode = React.memo(FilterModex);
