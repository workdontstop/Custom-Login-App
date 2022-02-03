import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
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
import { PreviewCanvas } from "./PreviewCanvas";
import { PreviewCanvasCropAll } from "./PreviewCanvasCropAll";
import CropIcon from "@mui/icons-material/Crop";
import CheckIcon from "@mui/icons-material/Check";

function SuperCropx({
  cropimage,
  selectedImage,
  setcropimage,
  cropTOPLEVELScrollRef,
  setshowCrop,
  refWithimageData,
}: any): JSX.Element {
  const cropCanvasRef: any = useRef(null);

  ////
  ////
  ////
  const [cropArea, setcropArea] = useState<any>(null);

  //
  const [crop, setcrop] = useState<any>({ x: 0, y: 0 });

  const [cropInitial, setcropInitial] = useState<any>({ x: 0, y: 0 });

  const [cropOffset, setcropOffset] = useState<any>({ x: 0, y: 0 });

  const [Drag, setDrag] = useState<boolean>(false);

  const [SourceWidthForCropX, setSourceWidthForCropX] = useState(0);

  const [SourceWidthForCropY, setSourceWidthForCropY] = useState(0);

  const [cropwidth, setcropwidth] = useState(0);
  const [cropheight, setcropheight] = useState(0);

  const [canvasToimage, setcanvasToimage] = useState<boolean>(false);

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

  const getpreviewFixedWidthRef = useRef<HTMLDivElement>(null);

  const getCropHeightRef: any = useRef<HTMLDivElement>(null);

  const getFixedCropWidthRef: any = useRef<HTMLDivElement>(null);

  const [getCropHeight, setgetCropHeight] = useState(0);

  const [getCropHeightRealImageRatio, setgetCropHeightRealImageRatio] =
    useState(0);

  const [getFixedCropWidth, setgetFixedCropWidth] = useState(0);

  const [getpreviewFixedWidth, setgetpreviewFixedWidth] = useState(0);

  const [CropImageHolder, setCropImageHolder] = useState<any>(null);

  const [OriginalImageWidth, setOriginalImageWidth] = useState<number>(0);
  const [OriginalImageHeight, setOriginalImageHeight] = useState<number>(0);

  const [WideImageCheck, setWideImageCheck] = useState<boolean>(false);

  const hdcanvasvalue = 2;

  const [BoxCropActivated, setBoxCropActivated] = useState<boolean>(true);

  const cropScrollRef: any = useRef(null);

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (
      getpreviewFixedWidthRef.current &&
      getpreviewFixedWidthRef.current.clientWidth
    ) {
      setgetpreviewFixedWidth(getpreviewFixedWidthRef.current.clientWidth);
    }

    if (getCropHeightRef.current && getCropHeightRef.current.clientWidth) {
      setgetCropHeight(getCropHeightRef.current.clientHeight * hdcanvasvalue);
      setgetCropHeightRealImageRatio(getCropHeightRef.current.clientHeight);
    }

    if (
      getFixedCropWidthRef.current &&
      getFixedCropWidthRef.current.clientWidth
    ) {
      setgetFixedCropWidth(getFixedCropWidthRef.current.clientWidth);
    }
  }, []);
  ///

  ///
  ///
  ///
  /// HANDLE TOUCH START EVENT
  const handleTouchStart = (e: any, type: any) => {
    if (BoxCropActivated) {
      if (type === 0) {
        setcropInitial({
          ...cropInitial,
          x: e.clientX * 2.8 - cropOffset.x,
          y: e.clientY * 3.3 - cropOffset.y,
        });
      } else {
        setcropInitial({
          ...cropInitial,
          x: e.touches[0].clientX * 2.8 - cropOffset.x,
          y: e.touches[0].clientY * 3.3 - cropOffset.y,
        });
      }
      if (e.target) {
        setDrag(true);
      }
    } else {
      setBoxCropActivated(true);
    }
  };

  const handleTouchEnd = () => {
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
          x: e.clientX * 2.8 - cropInitial.x,
          y: e.clientY * 3.3 - cropInitial.y,
        });
      } else {
        setcrop({
          ...crop,
          x: e.touches[0].clientX * 2.8 - cropInitial.x,
          y: e.touches[0].clientY * 3.3 - cropInitial.y,
        });
      }

      setcropOffset({
        ...cropOffset,
        x: crop.x,
        y: crop.y,
      });
    }
  };

  const draw = useCallback(
    (ctx: any, dimensions: any, type: number, axis: number) => {
      if (type === 1) {
        ctx.drawImage(CropImageHolder, axis, 0, dimensions, getCropHeight);
      } else if (type === 2) {
        ctx.drawImage(CropImageHolder, 0, axis, getCropHeight, dimensions);
      } else {
        ctx.drawImage(
          CropImageHolder,
          0,
          0,
          OriginalImageWidth,
          OriginalImageHeight
        );
      }
    },
    [OriginalImageWidth, OriginalImageHeight, CropImageHolder, getCropHeight]
  );

  useLayoutEffect(() => {
    const Newcropimage = new Image();
    Newcropimage.src = cropimage;
    Newcropimage.onload = function () {
      setCropImageHolder(Newcropimage);

      var data1 = Newcropimage.naturalWidth;
      var data2 = Newcropimage.naturalHeight;
      setOriginalImageWidth(data1);
      setOriginalImageHeight(data2);

      if (Newcropimage.naturalWidth > Newcropimage.naturalHeight) {
        setWideImageCheck(true);
      } else {
        setWideImageCheck(false);
      }

      setcropwidth(data1);
      setcropheight(data2);
    };
  }, [cropimage, BoxCropActivated]);

  useLayoutEffect(() => {
    if (CropImageHolder && cropCanvasRef.current) {
      const ctx = cropCanvasRef.current.getContext("2d");

      var RatiofromOriginalandfixedHeight = OriginalImageHeight / getCropHeight;
      var NewBoxRatioWidth_WIDEIMAGE =
        OriginalImageWidth / RatiofromOriginalandfixedHeight;

      setSourceWidthForCropX(NewBoxRatioWidth_WIDEIMAGE);

      var RatiofromOriginalandfixedHeightx = OriginalImageWidth / getCropHeight;
      var NewBoxRatioWidth_LONGIMAGE =
        OriginalImageHeight / RatiofromOriginalandfixedHeightx;

      setSourceWidthForCropY(NewBoxRatioWidth_LONGIMAGE);

      var ratioh = (OriginalImageWidth * 3) / OriginalImageWidth;
      var ratiow = (OriginalImageHeight * 3) / OriginalImageHeight;

      if (BoxCropActivated) {
        cropCanvasRef.current.width = getCropHeight;
        cropCanvasRef.current.height = getCropHeight;
      } else {
        cropCanvasRef.current.width = OriginalImageWidth;
        cropCanvasRef.current.height = OriginalImageHeight;
      }

      var centerpreview =
        cropCanvasRef.current.width / 1.5 - NewBoxRatioWidth_LONGIMAGE / 1.5;

      var xtraZoom = getCropHeight / NewBoxRatioWidth_WIDEIMAGE;

      var centerCropCanvas =
        cropCanvasRef.current.width / 2 - NewBoxRatioWidth_WIDEIMAGE / 2;

      var RatiofromOriginalandfixedHeight =
        OriginalImageHeight / getCropHeightRealImageRatio;
      var newcropCSSWidth =
        OriginalImageWidth / RatiofromOriginalandfixedHeight;

      if (BoxCropActivated) {
        var dragDistanceY = NewBoxRatioWidth_LONGIMAGE - getCropHeight;
        var dragDistanceX = NewBoxRatioWidth_WIDEIMAGE - getCropHeight;

        if (OriginalImageWidth > OriginalImageHeight) {
          if (crop.x < -dragDistanceX) {
            setcrop({ ...crop, x: -dragDistanceX });
          } else if (crop.x > 0) {
            setcrop({ ...crop, x: 0 });
          } else {
          }

          requestAnimationFrame(() => {
            draw(ctx, NewBoxRatioWidth_WIDEIMAGE, 1, crop.x);
          });
        } else {
          if (crop.y < -dragDistanceY) {
            setcrop({ ...crop, y: -dragDistanceY });
          } else if (crop.y > 0) {
            setcrop({ ...crop, y: 0 });
          } else {
          }

          requestAnimationFrame(() => {
            draw(ctx, NewBoxRatioWidth_LONGIMAGE, 2, crop.y);
          });
        }

        cropCanvasRef.current.style.width = `${
          getCropHeight / hdcanvasvalue
        }px`;
        cropCanvasRef.current.style.height = `${
          getCropHeight / hdcanvasvalue
        }px`;
      } else {
        requestAnimationFrame(() => {
          draw(ctx, 0, 3, 0);
        });

        cropCanvasRef.current.style.width = `${newcropCSSWidth}px`;
        cropCanvasRef.current.style.height = `${getCropHeightRealImageRatio}px`;
      }
    }
  }, [
    CropImageHolder,
    cropCanvasRef,
    BoxCropActivated,
    OriginalImageWidth,
    OriginalImageHeight,
    crop,
    draw,
  ]);
  const gg = () => {};

  const cropaspectchange = () => {
    setBoxCropActivated((BoxCropActivated) => !BoxCropActivated);
  };

  const complete = () => {
    setcanvasToimage(true);
  };

  return <></>;
}

export const SuperCrop = React.memo(SuperCropx);
