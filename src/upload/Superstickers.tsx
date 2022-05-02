import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { Grid, GridSize } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
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
import { ImageTobeFiltered } from "./ImageTobeFiltered";
import { FilterModeArrow } from "./FilterModeArrow";
import { OptionsSlider } from "../profile/OptionsSlider";
import { convertHexToRGB } from "material-ui/utils/colorManipulator";

function Superstickersx({
  setstartSuperStickerblur,
  setstartSuperSticker,
  startSuperSticker,
  itemUploadRef,
  index,
}: any): JSX.Element {
  const [matchTabletMobile, setmatchTabletMobile] = useState<boolean>(false);

  var extendxy = 1;
  extendxy = matchTabletMobile ? 2.5 : 2.4;

  ///
  ///
  ///DARKMODE FROM REDUX
  interface RootStateGlobalReducer {
    GlobalReducer: {
      darkmode: boolean;
    };
  }
  const { darkmode } = useSelector((state: RootStateGlobalReducer) => ({
    ...state.GlobalReducer,
  }));

  const darkmodeReducer = darkmode;

  const [superImageHolder, setsuperImageHolder] = useState<any>(null);

  const [OriginalImageHeight, setOriginalImageHeight] = useState<number>(0);

  const [OriginalImageWidth, setOriginalImageWidth] = useState<number>(0);

  const canvasRefsticker: any = useRef(null);

  const canvasRefstickerimage: any = useRef(null);

  const [crop, setcrop] = useState<any>({ x: 0, y: 0 });

  const [superDragAcivated, setsuperDragAcivated] = useState<boolean>(false);

  const [cropInitial, setcropInitial] = useState<any>({ x: 0, y: 0 });

  const [optionscropshow, setoptionsStickershow] = useState<boolean>(true);

  const [cropOffset, setcropOffset] = useState<any>({ x: 0, y: 0 });

  const [Drag, setDrag] = useState<boolean>(false);

  const [dd, setdd] = useState<any>(0);

  const allowscrolltimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchStart = (e: any, type: any) => {
    if (superDragAcivated) {
      ////mouseover(0);

      setoptionsStickershow(false);
      if (type === 0) {
        setcropInitial({
          ...cropInitial,
          x: e.clientX * extendxy - cropOffset.x,
          y: e.clientY * extendxy - cropOffset.y,
        });
      } else {
        setcropInitial({
          ...cropInitial,
          x: e.touches[0].clientX * extendxy - cropOffset.x,
          y: e.touches[0].clientY * extendxy - cropOffset.y,
        });
      }
      if (e.target) {
        setDrag(true);
      }
    } else {
      setsuperDragAcivated(true);
    }
  };

  const handleTouchEnd = () => {
    if (allowscrolltimer.current) {
      clearTimeout(allowscrolltimer.current);
    }

    allowscrolltimer.current = setTimeout(function () {
      ////mouseover(1);
    }, 1200);

    setoptionsStickershow(true);
    setcropInitial({
      ...cropInitial,
      x: crop.x,
      y: crop.y,
    });
    setDrag(false);
  };

  const handleTouchDrag = (e: any, type: any) => {
    if (Drag) {
      if (type === 0) {
        setcrop({
          ...crop,
          x: e.clientX * extendxy - cropInitial.x,
          y: e.clientY * extendxy - cropInitial.y,
        });
      } else {
        setcrop({
          ...crop,
          x: e.touches[0].clientX * extendxy - cropInitial.x,
          y: e.touches[0].clientY * extendxy - cropInitial.y,
        });
      }

      setcropOffset({
        ...cropOffset,
        x: crop.x,
        y: crop.y,
      });
    }
  };

  useLayoutEffect(() => {
    const Newstickfilter: any = new Image();

    Newstickfilter.src = itemUploadRef.current[index].src;

    Newstickfilter.onload = function () {
      const ctx = canvasRefsticker.current.getContext("2d");

      if (superImageHolder === Newstickfilter) {
      } else {
        setsuperImageHolder(Newstickfilter);
      }

      if (OriginalImageHeight === Newstickfilter.naturalHeight) {
      } else {
        setOriginalImageHeight(Newstickfilter.naturalHeight);
      }
      //
      if (OriginalImageWidth === Newstickfilter.naturalWidth) {
      } else {
        setOriginalImageWidth(Newstickfilter.naturalWidth);
      }
    };
  }, [startSuperSticker]);

  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (matchMobile || matchTablet) {
      setmatchTabletMobile(true);
    }
  }, []);

  useLayoutEffect(() => {
    if (superImageHolder && canvasRefsticker.current) {
      const ctx = canvasRefsticker.current.getContext("2d");

      canvasRefsticker.current.width = OriginalImageWidth;
      canvasRefsticker.current.height = OriginalImageHeight;

      var scalehh = window.innerHeight / OriginalImageHeight;
      var widthx = OriginalImageWidth * scalehh;

      var scalehhr = window.innerWidth / OriginalImageWidth;
      var heightx = OriginalImageHeight * scalehhr;

      var dragDistanceY;
      var dragDistanceX;

      var addto;
      if (matchTabletMobile && OriginalImageHeight === OriginalImageWidth) {
        addto = 120;
      } else {
        addto = 0;
      }

      if (OriginalImageWidth > OriginalImageHeight) {
        var vv = widthx + 65;
        var uu = window.innerHeight + 65;
        dragDistanceY = uu + addto;
        dragDistanceX = vv + addto;
      } else {
        var vv = widthx - widthx / 3;
        var uu = window.innerHeight - window.innerHeight / 3;
        dragDistanceY = OriginalImageHeight - uu + addto;
        dragDistanceX = OriginalImageWidth - vv + addto;
      }

      if (Drag) {
        if (crop.x > dragDistanceX) {
          setcrop({ ...crop, x: dragDistanceX });
        } else if (crop.x < -50) {
          setcrop({ ...crop, x: -50 });
        } else {
        }

        if (crop.y > dragDistanceY) {
          setcrop({ ...crop, y: dragDistanceY });
        } else if (crop.y < -50) {
          setcrop({ ...crop, y: -50 });
        } else {
        }
      }

      var text = "";

      if (text == "") {
        text = "Progress";
      }

      ctx.drawImage(superImageHolder, 0, 0);

      ctx.globalAlpha = 0.5;

      var fontsize: number = 80;

      ctx.font = `bold italic ${fontsize}px sans-serif`;

      var textWidth = ctx.measureText(text).width;

      //
      //
      var font = ctx.font;

      ctx.textBaseline = "top";

      ctx.fillRect(
        canvasRefsticker.current.width * 0.08,
        canvasRefsticker.current.height * 0.096,
        textWidth + 35,
        fontsize + 10
      );

      ctx.globalAlpha = 0.95;

      ctx.fillStyle = "rgba(000,000,005,0.7)";
      // ctx.shadowColor = "rgba(000,000,005,0.7)";
      /// ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.5)";

      ctx.fillText(
        text,
        canvasRefsticker.current.width * 0.1,
        canvasRefsticker.current.height * 0.1
      );
      ///ctx.strokeText(text, 50, 50);

      if (matchTabletMobile) {
        canvasRefsticker.current.style.width = `${window.innerWidth}px`;
        canvasRefsticker.current.style.height = `${heightx}px`;
      } else {
        canvasRefsticker.current.style.width = `${widthx}px`;
        canvasRefsticker.current.style.height = `${window.innerHeight}px`;
      }
    }
  }, [superImageHolder, OriginalImageWidth, OriginalImageHeight, crop]);

  const closeme = () => {
    setstartSuperSticker(false);
    setstartSuperStickerblur(false);
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          onClick={() => {
            closeme();
          }}
          xs={12}
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: "0vh",
            zIndex: 1,
          }}
        ></Grid>

        <canvas
          className={
            darkmodeReducer ? "turlightpostdarkx" : "turlightpostlightx"
          }
          onMouseOver={() => {
            /// mouseover(0);
          }}
          onMouseDown={(e: any) => {
            handleTouchStart(e, 0);
          }}
          onTouchStart={(e: any) => {
            handleTouchStart(e, 1);
          }}
          onMouseMove={(e: any) => {
            handleTouchDrag(e, 0);
          }}
          onTouchMove={(e: any) => {
            handleTouchDrag(e, 1);
          }}
          onMouseUp={handleTouchEnd}
          onTouchEnd={handleTouchEnd}
          ref={canvasRefsticker}
          style={{
            padding: "0px",
            margin: "auto",
            zIndex: 10,
            position: "relative",
          }}
        />
        <canvas
          className={
            darkmodeReducer ? "turlightpostdarkx" : "turlightpostlightx"
          }
          ref={canvasRefstickerimage}
          style={{
            padding: "0px",
            margin: "auto",
            zIndex: 10,
            position: "fixed",
            top: "-200px",
          }}
        />
      </Grid>
    </>
  );
}

export const Superstickers = React.memo(Superstickersx);
