import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { TextField } from "@material-ui/core";
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
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import UndoIcon from "@mui/icons-material/Undo";
import LayersIcon from "@mui/icons-material/Layers";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightModeIcon from "@mui/icons-material/LightMode";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import HighlightIcon from "@mui/icons-material/Highlight";
import Slider from "@material-ui/core/Slider";
import { HexColorPicker } from "react-colorful";
import ColorizeIcon from "@mui/icons-material/Colorize";
import EditIcon from "@mui/icons-material/Edit";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import CloseIcon from "@mui/icons-material/Close";
import RestoreIcon from "@mui/icons-material/Restore";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";

function Superstickersx({
  setstartSuperStickerblur,
  setstartSuperSticker,
  startSuperSticker,
  itemUploadRef,
  index,
  setsuperStickerActivated,
  setduplicateItemupload,
  duplicateItemupload,
  setactiveSticker,
  effectMode,
  seteffectMode,
  regimageholdfilter,
  setcallfilter,
  callfilter,
  setFilterUnderStickerStopFiltering,
  superzeroeffect,
  setsuperzeroeffect,
  superzeroeffectonce,
  setsuperzeroeffectonce,
}: any): JSX.Element {
  const [superundoArray, setsuperundoArray] = useState<any>([]);

  const superundoArrayxx = [...superundoArray];
  const duplicateItemuploadxx = [...duplicateItemupload];
  const effectModexx = [...effectMode];

  const [matchTabletMobile, setmatchTabletMobile] = useState<boolean>(false);

  var extendxy = 1;
  extendxy = matchTabletMobile ? 2.5 : 2.4;

  var pcfont = 2.9;

  var mobilefont = 4.8;

  var sizex: "small" | "medium" | undefined = undefined;

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

  const aRef: any = useRef(null);

  const [superImageHolderxDrawn, setsuperImageHolderxDrawn] =
    useState<boolean>(false);

  const [superImageHolder, setsuperImageHolder] = useState<any>(null);

  const [superImageHolderx, setsuperImageHolderx] = useState<any>(null);

  const [OriginalImageHeightx, setOriginalImageHeightx] = useState<number>(0);

  const [OriginalImageWidthx, setOriginalImageWidthx] = useState<number>(0);

  const [OriginalImageHeight, setOriginalImageHeight] = useState<number>(0);

  const [OriginalImageWidth, setOriginalImageWidth] = useState<number>(0);

  const [heightx, setheightx] = useState<number>(0);

  const [longmobileimage, setlongmobileimage] = useState<number>(0);

  const [widthx, setwidthx] = useState<number>(0);

  const [iconpositionY, seticonpositionY] = useState<number>(0);

  const [iconpositionX, seticonpositionX] = useState<number>(0);

  const [iconpositionBottom, seticonpositionBottom] = useState<number>(0);

  const canvasRefsticker: any = useRef(null);

  const canvasRefstickerimage: any = useRef(null);

  const canvasRefstickerimagex: any = useRef(null);

  const [crop, setcrop] = useState<any>({ x: 0, y: 0 });

  const [croptex, setcroptex] = useState<any>({ x: 0, y: 0 });

  const [cropsticker, setcropsticker] = useState<any>({ x: 0, y: 0 });

  const [superDragAcivated, setsuperDragAcivated] = useState<boolean>(false);

  const [cropInitial, setcropInitial] = useState<any>({ x: 0, y: 0 });

  const [optionscropshow, setoptionsStickershow] = useState<boolean>(true);

  const [cropOffset, setcropOffset] = useState<any>({ x: 0, y: 0 });

  const [Drag, setDrag] = useState<boolean>(false);

  const [dd, setdd] = useState<any>(0);

  const allowscrolltimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [textStyle, settextStyle] = useState<number>(0);

  const [stickerOPtionsDefault, setstickerOPtionsDefault] = useState(0);

  const [stickerOPtionsTextType, setstickerOPtionsTextType] = useState(0);

  const [textzoom, settextzoom] = useState<any>(68);
  const [stickersizezoom, setstickersizezoom] = useState<any>(1);

  const [stickerrotatezoom, setstickerrotatezoom] = useState<any>(1);

  const [shinezoom, setshinezoom] = useState<any>(0);

  const [stickerOPtionsTextfont, setstickerOPtionsTextfont] = useState(0);

  const [showSliderText, setshowSliderText] = useState<boolean>(false);

  const [showSliderstickersize, setshowSliderstickersize] =
    useState<boolean>(false);

  const [showSliderstickerRotate, setshowSliderstickerRotate] =
    useState<boolean>(false);

  const [showshowstickerComplete, setshowshowstickerComplete] =
    useState<boolean>(false);

  const [showalloptions, setshowalloptions] = useState<boolean>(true);

  const [showSliderShine, setshowSliderShine] = useState<boolean>(false);

  const [showTextOptions, setshowTextOptions] = useState<boolean>(true);

  const [showstickerOptions, setshowstickerOptions] = useState<boolean>(true);

  const [showTextField, setshowTextField] = useState<boolean>(false);

  const [Textwidthx, setTextwidthx] = useState(0);

  const [canvaswidth, setcanvaswidth] = useState(0);

  const [colorx, setColorx] = useState("#c524ad");

  const [colorstroke, setColorstroke] = useState("#aac9cc");

  const [usecolorstroke, setusecolorstroke] = useState<boolean>(false);

  const [showColorPicker, setshowColorPicker] = useState<boolean>(false);

  const [textvalue, settextvalue] = useState("");

  const [superundoArrayHolder, setsuperundoArrayHolder] = useState<any>([]);

  const [undoswitcher, setundoswitcher] = useState(0);

  const [restoreswitcher, setrestoreswitcher] = useState(0);

  var width = " ";
  var sizex: "small" | "medium" | undefined = undefined;

  var zIndex = 0;
  var zindexU = 0;
  var zindexBackPlateU = 0;
  var displayBackPlateU = "none";
  var zindexBackPlateP = 0;
  var displayBackPlateP = "none";

  const [stickersize, setstickersize] = useState<number>(1);

  const [addedImagex, setaddedImagex] = useState<any>(null);

  var transform = "";
  var font1 = "";
  var font2 = "";
  var paddingbutU = "";

  ///
  ///
  ///
  if (matchPc) {
    sizex = "medium";
    width = "20%";
    transform = "scale(1)";
    zIndex = 1;
    font1 = "2.7vh";
    font2 = "2.1vh";
    paddingbutU = "70px";
  } else if (matchTablet) {
    sizex = "small";
    width = "62%";
    transform = "scale(1)";
    zIndex = 0;
    font1 = "2.6vh";
    font2 = "2vh";
    paddingbutU = "100px";
  } else {
    sizex = "small";
    width = "100%";
    transform = "scale(0.94)";
    zIndex = 0;
    font1 = "";
    font2 = "";
    paddingbutU = "80px";
  }

  const updatetextzoom = (e: any, data: any) => {
    settextzoom(data);
  };

  const updatestickerRotatezoom = (e: any, data: any) => {
    setstickerrotatezoom(data);
  };

  const updatestickerzoom = (e: any, data: any) => {
    setstickersizezoom(data);
  };

  const updateshinezoom = (e: any, data: any) => {
    setshinezoom(data);
  };

  const handleTouchStart = (e: any, type: any) => {
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
      setshowalloptions(false);
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
    setshowalloptions(true);
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

  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (matchTabletMobile && longmobileimage === 0) {
      seticonpositionY(window.innerHeight - heightx);
      seticonpositionX(window.innerWidth - window.innerWidth);
      seticonpositionBottom(heightx);
    } else {
      var xtra;
      if (OriginalImageWidth > OriginalImageHeight) {
        xtra = 80;
      } else {
        xtra = 74;
      }
      seticonpositionY(window.innerHeight - window.innerHeight + 5);
      var qq = window.innerWidth - widthx;
      seticonpositionX(qq / 2 + widthx - xtra);
      seticonpositionBottom(window.innerHeight - 90);
    }
  }, [
    heightx,
    longmobileimage,
    widthx,
    OriginalImageHeight,
    OriginalImageWidth,
  ]);

  //
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (matchMobile || matchTablet) {
      setmatchTabletMobile(true);
    }
  }, []);

  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (Drag) {
      if (stickerOPtionsDefault === 1) {
        setcroptex({
          ...croptex,
          x: crop.x * 10,
          y: crop.y * 10,
        });
      }

      setcropsticker({
        ...cropsticker,
        x: crop.x,
        y: crop.y,
      });
    }
  }, [crop]);

  const clearFilterDrag = () => {
    setcroptex({
      ...croptex,
      x: 0,
      y: 0,
    });

    setcrop({
      ...crop,
      x: 0,
      y: 0,
    });

    setcropInitial({
      ...cropInitial,
      x: 0,
      y: 0,
    });

    setcropOffset({
      ...cropOffset,
      x: 0,
      y: 0,
    });
  };

  ///
  ////
  ///
  ///
  const drawText = (
    ctx: any,
    canvasRefsticker: any,
    widthx: any,
    heightx: any
  ) => {
    var fonttype = "";
    if (stickerOPtionsTextfont === 0) {
      fonttype = "sans-serif";
    } else if (stickerOPtionsTextfont === 1) {
      fonttype = "Big Shoulders Display";
    } else if (stickerOPtionsTextfont === 2) {
      fonttype = "Loved by the King";
    } else if (stickerOPtionsTextfont === 3) {
      fonttype = "kaushan_scriptregular";
    } else if (stickerOPtionsTextfont === 4) {
      fonttype = "Dancing Script";
    } else {
      fonttype = "Oleo Script";
    }

    var dragDistanceX;
    var dragDistanceY;
    var fontsize;

    if (Textwidthx > canvaswidth) {
      settextzoom((textzoom: number) => textzoom - 2);
      fontsize = textzoom - 2;
    } else {
      fontsize = textzoom;
    }

    if (stickerOPtionsTextType === 2 || stickerOPtionsTextType === 3) {
      ctx.font = `bold italic ${fontsize}px sans-serif`;
    } else {
      if (stickerOPtionsTextfont === 0) {
        ctx.font = `bold italic ${fontsize}px ${fonttype}`;
      } else {
        ctx.font = `bold  ${fontsize}px ${fonttype}`;
      }
    }

    ///
    ///
    ctx.textBaseline = "top";
    var text = textvalue;
    var zz: number = 0;
    if (text == "") {
      text = "SuperstarZ";
    }
    var textWidth = ctx.measureText(text).width;
    setTextwidthx(textWidth);

    if (longmobileimage === 1) {
      zz = 140;
    } else {
      zz = 20;
    }
    dragDistanceX = OriginalImageWidth - textWidth - 15;
    dragDistanceY = OriginalImageHeight - fontsize - zz;

    if (Drag) {
      if (crop.x > dragDistanceX) {
        setcrop({ ...crop, x: dragDistanceX });
      } else if (crop.x < 17) {
        setcrop({ ...crop, x: 17 });
      } else {
      }

      if (crop.y > dragDistanceY) {
        setcrop({ ...crop, y: dragDistanceY });
      } else if (crop.y < 17) {
        setcrop({ ...crop, y: 17 });
      } else {
      }
    }

    if (stickerOPtionsTextType === 2) {
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.shadowColor = "rgba(255,255,255,0.8)";
      ctx.fillRect(
        croptex.x * 0.1 - 11,
        croptex.y * 0.1 - 14,
        textWidth + 24,
        fontsize + 20
      );
      ///
      ///
      ///
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(000,000,005,0.5)";
    } else if (stickerOPtionsTextType === 3) {
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "rgba(000,000,005,0.7)";
      ctx.shadowColor = "rgba(000,000,005,0.7)";
      ctx.fillRect(
        croptex.x * 0.1 - 11,
        croptex.y * 0.1 - 10,
        textWidth + 24,
        fontsize + 20
      );
      ///
      ///
      ///
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(255,255,255,0.5)";
    } else if (stickerOPtionsTextType === 0) {
      //
      ctx.globalAlpha = 1;
      ctx.fillStyle = colorx;
      ctx.lineWidth = 13;
      ctx.strokeStyle = colorstroke;
      ctx.shadowColor = colorstroke;
      ctx.shadowBlur = shinezoom;

      ctx.strokeText(text, croptex.x * 0.1, croptex.y * 0.1);
    } else {
      ctx.globalAlpha = 1;
      ctx.fillStyle = colorx;
      ctx.shadowColor = colorx;
      ctx.shadowBlur = shinezoom;
    }

    ctx.fillText(text, croptex.x * 0.1, croptex.y * 0.1);

    ///
  };

  useLayoutEffect(() => {
    const Newstickfilterx: any = new Image();

    Newstickfilterx.src = addedImagex;

    Newstickfilterx.onload = function () {
      if (superImageHolderx === Newstickfilterx) {
      } else {
        setsuperImageHolderx(Newstickfilterx);
      }

      if (OriginalImageHeightx === Newstickfilterx.naturalHeight) {
      } else {
        setOriginalImageHeightx(Newstickfilterx.naturalHeight);
      }
      //
      if (OriginalImageWidthx === Newstickfilterx.naturalWidth) {
      } else {
        setOriginalImageWidthx(Newstickfilterx.naturalWidth);
      }
    };
  }, [addedImagex]);

  useLayoutEffect(() => {
    if (superImageHolderx && canvasRefsticker.current) {
      const ctxMini = canvasRefstickerimage.current.getContext("2d");
      var newh;
      var neww;
      var quality = 700;
      if (OriginalImageWidthx > OriginalImageHeightx) {
        var ratio = quality / OriginalImageHeightx;
        neww = ratio * OriginalImageWidthx;
        canvasRefstickerimage.current.width = neww;
        canvasRefstickerimage.current.height = quality;
        var rot = 30;
        ///ctxMini.translate(neww / 2, quality / 2);

        //ctxMini.rotate((-rot * Math.PI) / 180);
        ctxMini.drawImage(superImageHolderx, 0, 0, neww, quality);
        setTimeout(function () {
          runBigdraw(0);
        }, 1100);
      } else {
        var ratiox = quality / OriginalImageWidthx;
        newh = ratiox * OriginalImageHeightx;
        canvasRefstickerimage.current.width = quality;
        canvasRefstickerimage.current.height = newh;
        var rot = 1;
        ///ctxMini.translate(quality / 2, newh / 2);

        //ctxMini.rotate((-rot * Math.PI) / 180);
        ctxMini.drawImage(superImageHolderx, 0, 0, quality, newh);
        setTimeout(function () {
          runBigdraw(0);
        }, 1100);
      }
    }
  }, [superImageHolderx, OriginalImageWidthx, OriginalImageHeightx]);

  ///////////////////////////////////////////////////////////////////////////////////////////

  useLayoutEffect(() => {
    const Newstickfilter: any = new Image();
    var inde;
    if (restoreswitcher > 1) {
      setrestoreswitcher(0);
    }

    if (superundoArray.length === 0) {
      if (duplicateItemupload[index]) {
        if (restoreswitcher === 1) {
          Newstickfilter.src = itemUploadRef.current[index].src;
        } else {
          Newstickfilter.src = duplicateItemupload[index];
        }
      } else {
        if (effectMode[index] === "normal" || effectMode[index] === "normalx") {
          Newstickfilter.src = itemUploadRef.current[index].src;
        } else {
          Newstickfilter.src = regimageholdfilter[index];
        }
      }
    } else {
      inde = superundoArray.length - 1 - undoswitcher;
      if (inde < 0) {
        setundoswitcher(0);
        inde = superundoArray.length - 1;
      }

      if (restoreswitcher === 1) {
        Newstickfilter.src = itemUploadRef.current[index].src;
      } else {
        Newstickfilter.src = superundoArray[inde];
      }
    }

    Newstickfilter.onload = function () {
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

      var scalehh = window.innerHeight / Newstickfilter.naturalHeight;
      var widthxx = Newstickfilter.naturalWidth * scalehh;

      var scalehhr = window.innerWidth / Newstickfilter.naturalWidth;
      var heightxx = Newstickfilter.naturalHeight * scalehhr;

      setheightx(heightxx);
      setwidthx(widthxx);

      if (heightxx > window.innerHeight && matchTabletMobile) {
        setlongmobileimage(1);
      }
    };
  }, [
    startSuperSticker,
    superundoArray,
    undoswitcher,
    restoreswitcher,
    regimageholdfilter,
  ]);

  useLayoutEffect(() => {
    runBigdraw(0);
  }, [
    superImageHolder,
    OriginalImageWidth,
    OriginalImageHeight,
    crop,
    croptex,
    heightx,
    widthx,
    stickerOPtionsDefault,
    stickerOPtionsTextType,
    textzoom,
    stickerOPtionsTextfont,
    showSliderText,
    shinezoom,
    colorx,
    colorstroke,
    textvalue,
    stickersizezoom,
  ]);

  const runBigdraw = (save: number) => {
    if (superImageHolder && canvasRefsticker.current) {
      const ctx = canvasRefsticker.current.getContext("2d");
      const ctxMini = canvasRefstickerimage.current.getContext("2d");

      canvasRefsticker.current.width = OriginalImageWidth;
      canvasRefsticker.current.height = OriginalImageHeight;

      ctx.drawImage(superImageHolder, 0, 0);

      if (stickerOPtionsDefault === 1) {
        if (matchTabletMobile) {
          drawText(ctx, canvasRefsticker, window.innerWidth, heightx);
        } else {
          drawText(ctx, canvasRefsticker, widthx, window.innerHeight);
        }
      }

      if (stickerOPtionsDefault === 2) {
        if (addedImagex) {
          var dragDistanceY;
          var dragDistanceX;

          var addto;
          if (matchTabletMobile && OriginalImageHeight === OriginalImageWidth) {
            addto = 120;
          } else {
            addto = 0;
          }

          dragDistanceY = OriginalImageHeight - 100;
          dragDistanceX = OriginalImageWidth - 100;

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

          var scalehhc = window.innerHeight / OriginalImageHeight;
          var widthxxc = OriginalImageWidth * scalehhc;

          var scalehhrc = widthx / OriginalImageWidth;
          var heightxxc = OriginalImageHeight * scalehhrc;

          var rr = canvasRefstickerimage.current.width / widthx;
          var tt = rr * window.innerHeight;

          var rr = canvasRefstickerimage.current.width / widthx;
          var tt = rr * window.innerHeight;

          var rrw = canvasRefstickerimage.current.height / window.innerHeight;
          var qq = rrw * widthx;

          if (matchTabletMobile) {
            ctx.drawImage(
              canvasRefstickerimage.current,
              0,
              0,
              window.innerWidth,
              heightx,
              crop.x,
              crop.y,
              window.innerWidth,
              heightx
            );
          } else {
            if (OriginalImageWidth > OriginalImageHeight) {
              ctx.drawImage(
                canvasRefstickerimage.current,
                0,
                0,
                (qq * 3) / stickersizezoom,
                (canvasRefstickerimage.current.height * 3) / stickersizezoom,
                crop.x,
                crop.y,
                widthx,
                window.innerHeight
              );
            } else {
              ctx.drawImage(
                canvasRefstickerimage.current,
                0,
                0,
                (canvasRefstickerimage.current.width * 2) / stickersizezoom,
                (tt * 2) / stickersizezoom,
                crop.x,
                crop.y,
                widthx,
                window.innerHeight
              );
            }
          }
        }
      }

      if (matchTabletMobile && longmobileimage === 0) {
        setcanvaswidth(OriginalImageWidth * 0.97);
        canvasRefsticker.current.style.width = `${window.innerWidth}px`;
        canvasRefsticker.current.style.height = `${heightx}px`;
      } else {
        setcanvaswidth(OriginalImageWidth * 0.97);
        canvasRefsticker.current.style.width = `${widthx}px`;
        canvasRefsticker.current.style.height = `${window.innerHeight}px`;
      }

      if (save === 1) {
        var ccc = superundoArray.length;

        superundoArrayxx[ccc] = canvasRefsticker.current.toDataURL();
        setsuperundoArray(superundoArrayxx);
      } else if (save === 2 && restoreswitcher === 0) {
        duplicateItemuploadxx[index] = canvasRefsticker.current.toDataURL();
        setduplicateItemupload(duplicateItemuploadxx);

        if (effectMode[index] === "normal") {
        } else {
          setFilterUnderStickerStopFiltering(true);

          effectModexx[index] = "normalx";
          seteffectMode(effectModexx);
        }
      } else if (save === 2 && restoreswitcher === 1) {
        superzeroeffectoncexx[index] = false;
        setsuperzeroeffectonce(superzeroeffectoncexx);

        superzeroeffectxx[index] = false;
        setsuperzeroeffect(superzeroeffectxx);

        setFilterUnderStickerStopFiltering(false);

        effectModexx[index] = "normal";
        seteffectMode(effectModexx);
      } else {
      }
    }
  };

  const confirmUndo = () => {
    var l = superundoArray.length - undoswitcher;
    const superundoArrayxx = [...superundoArray];
    const superundoArrayxxz = [];
    setsuperundoArray([]);
    for (let i = 0; i < l; i++) {
      superundoArrayxxz[i] = superundoArrayxx[i];
      if (l - 1 === i) {
        setsuperundoArray(superundoArrayxxz);
        setundoswitcher(0);
      }
    }
  };
  const addedimage = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const FileArray = Array.from(e.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );

      setaddedImagex(FileArray[0]);

      setstickerOPtionsDefault(2);
      setcropsticker({
        ...cropsticker,
        x: crop.x * 100,
        y: crop.y * 100,
      });
      clearFilterDrag();
    }
  };

  const closeme = () => {};

  const changetextstyle = () => {
    if (stickerOPtionsTextType === 0) {
      setstickerOPtionsTextType(1);
    } else if (stickerOPtionsTextType === 1) {
      setstickerOPtionsTextType(2);
    } else if (stickerOPtionsTextType === 2) {
      setstickerOPtionsTextType(3);
    } else {
      setstickerOPtionsTextType(0);
    }
  };

  const changetextfont = () => {
    if (stickerOPtionsTextfont === 0) {
      setstickerOPtionsTextfont(1);
    } else if (stickerOPtionsTextfont === 1) {
      setstickerOPtionsTextfont(2);
    } else if (stickerOPtionsTextfont === 2) {
      setstickerOPtionsTextfont(3);
    } else if (stickerOPtionsTextfont === 3) {
      setstickerOPtionsTextfont(4);
    } else if (stickerOPtionsTextfont === 4) {
      setstickerOPtionsTextfont(5);
    } else {
      setstickerOPtionsTextfont(0);
    }
    settextzoom((textzoom: number) => textzoom);
  };

  const changestickersize = () => {
    setshowstickerOptions(false);
    setshowSliderstickersize(true);
  };

  const opencolorpicker = () => {
    setshowTextOptions(false);
    setshowColorPicker(true);

    if (stickerOPtionsTextType === 2) {
      //
      setusecolorstroke(true);
    } else {
      setusecolorstroke(false);
    }
  };

  ///
  ///
  ///
  ///
  const updateText = useCallback(
    (e: any) => {
      settextvalue(e.target.value);
    },

    [textvalue]
  );

  const superzeroeffectxx = [...superzeroeffect];
  const superzeroeffectoncexx = [...superzeroeffectonce];

  const savesticker = () => {
    const duplicateItemuploadxx = [...duplicateItemupload];
    duplicateItemuploadxx[index] = null;
    setduplicateItemupload(duplicateItemuploadxx);
    setactiveSticker(index);

    if (restoreswitcher !== 1) {
      if (effectMode[index] === "normal") {
        superzeroeffectoncexx[index] = true;
        setsuperzeroeffectonce(superzeroeffectoncexx);
      } else {
        if (superzeroeffectonce[index]) {
        } else {
          if (superzeroeffect[index]) {
          } else {
            superzeroeffectxx[index] = true;
            setsuperzeroeffect(superzeroeffectxx);
          }
          superzeroeffectoncexx[index] = true;
          setsuperzeroeffectonce(superzeroeffectoncexx);
        }
      }
    }

    runBigdraw(2);
    setstartSuperSticker(false);
    setstartSuperStickerblur(false);
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: "0vh",
            zIndex: 1,
          }}
        ></Grid>

        {showSliderShine ? (
          <>
            {" "}
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                padding: "0px",
                position: "fixed",
                top: "4vh",
                zIndex: 26,
              }}
            >
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  padding: "0px",
                  height: "0px",
                  margin: "auto",
                  display: "grid",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  paddingLeft: "2vw",
                  padding: matchTabletMobile ? "50px" : "20px",
                  height: "0px",
                  margin: "auto",

                  opacity: 0.8,
                  display: "grid",
                  alignItems: "center",
                }}
              >
                <Slider
                  value={shinezoom}
                  onChange={updateshinezoom}
                  defaultValue={0}
                  max={70}
                  min={0}
                  step={0.000001}
                />
              </Grid>
            </Grid>
          </>
        ) : null}

        {showSliderText ? (
          <>
            {" "}
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                padding: "0px",
                position: "fixed",
                top: "4vh",
                zIndex: 26,
              }}
            >
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  padding: "0px",
                  height: "0px",
                  margin: "auto",
                  display: "grid",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  paddingLeft: "2vw",
                  padding: matchTabletMobile ? "50px" : "20px",
                  height: "0px",
                  margin: "auto",

                  opacity: 0.8,
                  display: "grid",
                  alignItems: "center",
                }}
              >
                <Slider
                  value={textzoom}
                  onChange={updatetextzoom}
                  defaultValue={80}
                  max={200}
                  min={50}
                  step={0.000001}
                />
              </Grid>
            </Grid>
          </>
        ) : null}

        {showSliderstickersize ? (
          <>
            {" "}
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                padding: "0px",
                position: "fixed",
                top: "4vh",
                zIndex: 26,
              }}
            >
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  padding: "0px",
                  height: "0px",
                  margin: "auto",
                  display: "grid",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  paddingLeft: "2vw",
                  padding: matchTabletMobile ? "50px" : "20px",
                  height: "0px",
                  margin: "auto",

                  opacity: 0.8,
                  display: "grid",
                  alignItems: "center",
                }}
              >
                <Slider
                  value={stickersizezoom}
                  onChange={updatestickerzoom}
                  defaultValue={1}
                  max={16}
                  min={1}
                  step={0.000001}
                />
              </Grid>
            </Grid>
          </>
        ) : null}

        {showSliderstickerRotate ? (
          <>
            {" "}
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                padding: "0px",
                position: "fixed",
                top: "4vh",
                zIndex: 26,
              }}
            >
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  padding: "0px",
                  height: "0px",
                  margin: "auto",
                  display: "grid",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  paddingLeft: "2vw",
                  padding: matchTabletMobile ? "50px" : "20px",
                  height: "0px",
                  margin: "auto",

                  opacity: 0.8,
                  display: "grid",
                  alignItems: "center",
                }}
              >
                <Slider
                  value={stickerrotatezoom}
                  onChange={updatestickerRotatezoom}
                  defaultValue={1}
                  max={70}
                  min={1}
                  step={0.000001}
                />
              </Grid>
            </Grid>
          </>
        ) : null}

        {showColorPicker ? (
          <>
            {" "}
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                height: "0px",
                padding: "0px",
                position: "fixed",
                bottom: "36vh",
                zIndex: 26,
                left: "42.5%",
              }}
            >
              <HexColorPicker
                className="your-component"
                color={usecolorstroke ? colorstroke : colorx}
                onChange={usecolorstroke ? setColorstroke : setColorx}
                style={{ opacity: 0.96 }}
              />
            </Grid>
          </>
        ) : null}

        <Grid
          className="zuperxyinfo"
          item
          xs={12}
          style={{
            position: "absolute",
            top: `${iconpositionBottom}px`,
            zIndex: 20,
            padding: "0px",
            opacity: 0.98,
            width: "100%",
            height: "0px",
          }}
        >
          {
            ///////////////////////////////////////////////////////////UPDATE TEXT
          }

          <>
            {stickerOPtionsDefault === 1 &&
            showalloptions &&
            showTextOptions ? (
              <>
                {" "}
                <Grid
                  item
                  xs={12}
                  style={{
                    textAlign: "center",
                    height: "0px",
                    width: "100%",
                  }}
                >
                  <CheckIcon
                    onClick={() => {
                      runBigdraw(1);
                      setstickerOPtionsDefault(0);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                      marginRight: "5vw",
                    }}
                  />
                  <EditIcon
                    onClick={() => {
                      setshowTextOptions(false);
                      setshowTextField(true);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                      marginLeft: "5vw",
                    }}
                  />
                </Grid>
              </>
            ) : null}
          </>

          {
            ///////////////////////////////////////////////////////////UPDATE TEXT
          }
        </Grid>

        <Grid
          className="zuperxyinfo"
          item
          xs={12}
          style={{
            position: "absolute",
            zIndex: 20,
            bottom: "46vh",
            padding: "0px",
            opacity: 0.98,
            width: "100%",
            height: "0px",
          }}
        >
          {
            ///////////////////////////////////////////////////////////CHECK MODE FOR COLOR PICKER
          }

          <>
            <Grid
              item
              xs={4}
              style={{
                padding: "0px",
                height: "0px",
              }}
            ></Grid>

            {showColorPicker ? (
              <>
                {" "}
                <Grid
                  item
                  xs={4}
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    height: "0px",
                  }}
                >
                  <CheckIcon
                    onClick={() => {
                      setshowColorPicker(false);
                      setshowTextOptions(true);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                </Grid>
              </>
            ) : null}
          </>

          {
            ///////////////////////////////////////////////////////////CHECK MODE FOR COLOR PICKER
          }
        </Grid>

        <Grid
          className="zuperxyinfo"
          item
          xs={12}
          style={{
            position: "absolute",
            zIndex: 20,
            top: `${iconpositionBottom}px`,
            padding: "0px",
            opacity: 0.98,
            width: "100%",
            height: "0px",
          }}
        >
          {
            ///////////////////////////////////////////////////////////CHECK MODE
          }
          <>
            <Grid
              item
              xs={4}
              style={{
                padding: "0px",
                height: "0px",
              }}
            ></Grid>
            {showSliderShine ? (
              <>
                {" "}
                <Grid
                  item
                  xs={4}
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    height: "0px",
                  }}
                >
                  <CheckIcon
                    onClick={() => {
                      setshowSliderShine(false);
                      setshowTextOptions(true);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                </Grid>
              </>
            ) : null}
            {showSliderText ? (
              <>
                {" "}
                <Grid
                  item
                  xs={4}
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    height: "0px",
                  }}
                >
                  <CheckIcon
                    onClick={() => {
                      setshowSliderText(false);
                      setshowTextOptions(true);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                </Grid>
              </>
            ) : null}
            {
              //////////////////////////STICKER CHECK
            }
            {stickerOPtionsDefault === 2 && showstickerOptions ? (
              <>
                {" "}
                <Grid
                  item
                  xs={4}
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    height: "0px",
                  }}
                >
                  <CheckIcon
                    onClick={() => {
                      runBigdraw(1);
                      setstickerOPtionsDefault(0);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                </Grid>
              </>
            ) : null}
            {
              //////////////////////////STICKER CHECK}
            }
            {
              //////////////////////////STICKER SIZE CHECK
            }
            {showSliderstickersize ? (
              <>
                {" "}
                <Grid
                  item
                  xs={4}
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    height: "0px",
                  }}
                >
                  <CheckIcon
                    onClick={() => {
                      setshowSliderstickersize(false);
                      setshowstickerOptions(true);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                </Grid>
              </>
            ) : null}
            {
              //////////////////////////STICKER SIZE CHECK}
            }

            {
              //////////////////////////STICKER ROTATE CHECK
            }
            {showSliderstickerRotate ? (
              <>
                {" "}
                <Grid
                  item
                  xs={4}
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    height: "0px",
                  }}
                >
                  <CheckIcon
                    onClick={() => {
                      setshowSliderstickerRotate(false);
                      setshowstickerOptions(true);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                </Grid>
              </>
            ) : null}
            {
              //////////////////////////STICKER ROTATE CHECK}
            }

            {
              //////////////////////////UNDO CHECK
            }
            {stickerOPtionsDefault === 3 ? (
              <>
                {" "}
                <Grid
                  item
                  xs={4}
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    height: "0px",
                  }}
                >
                  <CheckIcon
                    onClick={() => {
                      confirmUndo();
                      setstickerOPtionsDefault(0);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                </Grid>
              </>
            ) : null}
            {
              //////////////////////////UNDO CHECK}
            }
          </>

          {
            ///////////////////////////////////////////////////////////CHECK MODE
          }

          {
            ////////////////////////// ACCEPT SUPERMERGE AND CANCEL SUPERSTICKER
          }
          {stickerOPtionsDefault === 0 ? (
            <>
              {" "}
              <Grid
                item
                xs={4}
                style={{
                  margin: "auto",
                  textAlign: "center",
                  height: "0px",
                }}
              >
                {superundoArray.length === 0 && restoreswitcher === 0 ? (
                  <CloseIcon
                    onClick={() => {
                      setstartSuperSticker(false);
                      setstartSuperStickerblur(false);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                ) : (
                  <CheckIcon
                    onClick={savesticker}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                )}
              </Grid>
            </>
          ) : null}
          {
            ////////////////////////// ACCEPT SUPERMERGE AND CANCEL SUPERSTICKER}
          }
        </Grid>

        <Grid
          className="zuperxyinfo"
          item
          xs={12}
          style={{
            position: "absolute",
            zIndex: 20,
            top: `${iconpositionY}px`,
            left: `${iconpositionX}px`,
            padding: "0px",
            opacity: 0.9,
          }}
        >
          {
            ///////////////////////////////////////////////////////////DEFAULT MODE
          }
          {stickerOPtionsDefault === 0 ? (
            <>
              {" "}
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <FormatColorTextIcon
                  onClick={() => {
                    setstickerOPtionsDefault(1);
                    clearFilterDrag();
                  }}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: "#ffffff",
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <label htmlFor="filewwy">
                  <InsertPhotoIcon
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                  <input
                    onChange={addedimage}
                    type="file"
                    name="superImages"
                    accept="image/*"
                    id="filewwy"
                    style={{ visibility: "hidden" }}
                  />
                </label>
              </Grid>
              {superundoArray.length > 1 ? (
                <Grid
                  item
                  xs={12}
                  style={{
                    padding: "20px",
                  }}
                >
                  <UndoIcon
                    onClick={() => {
                      setstickerOPtionsDefault(3);
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                </Grid>
              ) : null}
              {duplicateItemupload[index] || superundoArray.length > 0 ? (
                <Grid
                  item
                  xs={12}
                  style={{
                    padding: "20px",
                  }}
                >
                  <SettingsBackupRestoreIcon
                    onClick={() => {
                      setrestoreswitcher(
                        (restoreswitcher: number) => restoreswitcher + 1
                      );
                    }}
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                        : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                    }
                    style={{
                      margin: "auto",
                      color: "#ffffff",
                      fontSize: matchTabletMobile
                        ? `${mobilefont}vh`
                        : `${pcfont}vw`,
                    }}
                  />
                </Grid>
              ) : null}
            </>
          ) : null}
          {
            ///////////////////////////////////////////////////////////DEFAULT MODE
          }

          {
            ///////////////////////////////////////////////////////////UNDO MODE
          }
          {stickerOPtionsDefault === 3 ? (
            <>
              {" "}
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <UndoIcon
                  onClick={() => {
                    setundoswitcher(0);
                    setstickerOPtionsDefault(0);
                  }}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: "#ffffff",
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <RestoreIcon
                  onClick={() => {
                    setundoswitcher((undoswitcher: number) => undoswitcher + 1);
                  }}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: "#ffffff",
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                  }}
                />
              </Grid>
            </>
          ) : null}
          {
            ///////////////////////////////////////////////////////////UNDO MODE
          }

          {
            ///////////////////////////////////////////////////////////TEXT MODE
          }
          {stickerOPtionsDefault === 1 && showTextOptions && showalloptions ? (
            <>
              {" "}
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <FormatColorTextIcon
                  onClick={() => {
                    setstickerOPtionsDefault(0);
                  }}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: "#ffffff",
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <LayersIcon
                  onClick={changetextstyle}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: "#ffffff",
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <FormatSizeIcon
                  onClick={() => {
                    setshowTextOptions(false);
                    setshowSliderText(true);
                  }}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: "#ffffff",
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                  }}
                />
              </Grid>
              {stickerOPtionsTextType === 0 || stickerOPtionsTextType === 1 ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={12}
                    style={{
                      padding: "20px",
                    }}
                  >
                    <FontDownloadIcon
                      onClick={changetextfont}
                      className={
                        darkmodeReducer
                          ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                          : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                      }
                      style={{
                        margin: "auto",
                        color: "#ffffff",
                        fontSize: matchTabletMobile
                          ? `${mobilefont}vh`
                          : `${pcfont}vw`,
                      }}
                    />
                  </Grid>
                </>
              ) : null}
              {stickerOPtionsTextType === 0 || stickerOPtionsTextType === 1 ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={12}
                    style={{
                      padding: "20px",
                    }}
                  >
                    <ColorizeIcon
                      onClick={() => {
                        opencolorpicker();
                      }}
                      className={
                        darkmodeReducer
                          ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                          : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                      }
                      style={{
                        margin: "auto",
                        color: "#ffffff",
                        fontSize: matchTabletMobile
                          ? `${mobilefont}vh`
                          : `${pcfont}vw`,
                      }}
                    />
                  </Grid>
                </>
              ) : null}
              {stickerOPtionsTextType === 0 ||
              stickerOPtionsTextType === 1 ||
              stickerOPtionsTextType === 4 ? (
                <>
                  {" "}
                  <Grid
                    item
                    xs={12}
                    style={{
                      padding: "20px",
                    }}
                  >
                    <LightModeIcon
                      onClick={() => {
                        setshowTextOptions(false);
                        setshowSliderShine(true);
                      }}
                      className={
                        darkmodeReducer
                          ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                          : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                      }
                      style={{
                        margin: "auto",
                        color: "#ffffff",
                        fontSize: matchTabletMobile
                          ? `${mobilefont}vh`
                          : `${pcfont}vw`,
                      }}
                    />
                  </Grid>
                </>
              ) : null}
            </>
          ) : null}
          {
            ///////////////////////////////////////////////////////////TEXT MODE
          }

          {
            ///////////////////////////////////////////////////////////STICKER MODE
          }
          {stickerOPtionsDefault === 2 && showstickerOptions ? (
            <>
              {" "}
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <InsertPhotoIcon
                  onClick={() => {
                    setstickerOPtionsDefault(0);
                  }}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: "#ffffff",
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <PhotoSizeSelectLargeIcon
                  onClick={changestickersize}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: "#ffffff",
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <CropRotateIcon
                  onClick={() => {
                    /// setshowstickerOptions(false);
                    /// setshowSliderstickerRotate(true);
                  }}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: "#ffffff",
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                    cursor: "default",
                    opacity: 0,
                  }}
                />
              </Grid>
            </>
          ) : null}
          {
            ///////////////////////////////////////////////////////////STICKER MODE
          }

          {
            ///////////////////////////////////////////////////////////STROKE COLOR SELECT MODE
          }
          {showColorPicker && stickerOPtionsTextType === 0 ? (
            <>
              {" "}
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <TextFormatIcon
                  onClick={() => {
                    setusecolorstroke(true);
                  }}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: colorstroke,
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <TextFormatIcon
                  onClick={() => {
                    setusecolorstroke(false);
                  }}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    color: colorx,
                    fontSize: matchTabletMobile
                      ? `${mobilefont}vh`
                      : `${pcfont}vw`,
                  }}
                />
              </Grid>
            </>
          ) : null}
          {
            ///////////////////////////////////////////////////////////STROKE COLOR SELECT MODE
          }
        </Grid>

        <canvas
          onClick={() => {
            if (showTextField) {
              setshowTextOptions(true);
              setshowTextField(false);
            }
          }}
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

            position: "fixed",
            top: "200000px",
          }}
        />

        <img
          ref={aRef}
          src={addedImagex ? addedImagex : null}
          style={{
            width: "30%",
            height: "auto",
            cursor: "pointer",
            position: "fixed",
            top: "20000vh",
            backgroundColor: "#00ccff",
          }}
        />

        {showTextField ? (
          <>
            {" "}
            <Grid
              className={
                darkmodeReducer
                  ? "mobileTextfield-backplateColorDark"
                  : "mobileTextfield-backplateColorLight"
              }
              item
              xs={12}
              style={{
                width: "100%",
                padding: "0px",
                position: "fixed",
                height: "13vh",
                bottom: "0vh",
                zIndex: 20,
              }}
            ></Grid>
            <TextField
              size={sizex}
              inputProps={{ style: { fontSize: font1 } }}
              InputLabelProps={{ style: { fontSize: font2 } }}
              onChange={updateText}
              value={textvalue}
              style={{
                transform: transform,
                width: width,
                paddingBottom: "0px",
                position: "fixed",
                bottom: "3.5vh",
                left: "40vw",
                zIndex: 26,
              }}
              label="Input Text"
              type="text"
              name="inputedPassword"
              variant="standard"
            />{" "}
          </>
        ) : null}
      </Grid>
    </>
  );
}

export const Superstickers = React.memo(Superstickersx);
