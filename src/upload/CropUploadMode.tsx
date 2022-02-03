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

function CropUploadModex({
  CropSaved,
  ActiveSlide,
  handleTouchStartOptions,
  handleTouchMoveOptions,
  optionsCollectImageRef,
  modalanimation,
  getSliderWidthNew,
  optionsClickType,
  clickOptions,
  optionsImages,
  optionsNameData,
  cropTOPLEVELScrollRef,
  refWithimageData,
  filterImage,
  setfilterImage,
  setActivatefilterImage,
}: any): JSX.Element {
  const [selectedImage, setselectedImage] = useState<Array<any>>([]);
  const [superCropLoadFade, setsuperCropLoadFade] = useState<boolean>(false);

  const [allowFilters, setallowFilters] = useState<boolean>(false);

  var k1 = CropSaved ? 3 : 2;
  var k2 = CropSaved ? 4 : 3;

  ///
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

  const { REACT_APP_SUPERSTARZ_URL } = process.env;

  ///
  ///
  /// GET COLOR FROM REDUX STORE
  interface RootStateReducerColor {
    GlobalReducerColor: {
      color: string;
      colordark: string;
      colortype: number;
    };
  }
  const { color, colordark, colortype } = useSelector(
    (state: RootStateReducerColor) => ({
      ...state.GlobalReducerColor,
    })
  );
  const colorReducer = color;
  const colorReducerdark = colordark;
  const colortypeReducer = colortype;

  const [cropimage, setcropimage] = useState<string | undefined>("");
  const [showCrop, setshowCrop] = useState<boolean>(false);

  const [selectedImageUpload, setselectedImageUpload] = useState<any>(null);

  const updateColor = useCallback(
    (formData: any) => {
      Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/upload`, formData)
        .then((response) => {
          if (response.data.message === "ok") {
          }
        })
        .catch(function (error) {
          alert("about color error");
        });
    },
    [REACT_APP_SUPERSTARZ_URL]
  );

  const itemUploadRef = useRef<any>([]);
  ///
  ///
  ///
  ///CREATE REFS FROM POSTS AND ADD THEM TO ARRAY
  const addUploadItemsRef = (UploadRef: any) => {
    if (UploadRef && !itemUploadRef.current.includes(UploadRef)) {
      itemUploadRef.current.push(UploadRef);
    }
    ////console.log(postItemsRef.current[1]);
  };

  const imageHandleChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const FileArray = Array.from(e.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );

      setselectedImage((prevImages: any) => prevImages.concat(FileArray));

      setcropimage(FileArray[0]);

      const formData = new FormData();

      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("superImages", e.target.files[i]);
      }

      setshowCrop(true);
    }
  };

  ///////////////////////////////////////////////////////SUPER CROP ///////////////////////////////////

  const cropCanvasRef: any = useRef(null);

  ////
  ////
  ////
  const [cropArea, setcropArea] = useState<any>(null);

  //
  const [crop, setcrop] = useState<any>({ x: 0, y: 0 });

  const [cropToo, setcropToo] = useState<any>({ x: 0, y: 0 });

  const [cropInitial, setcropInitial] = useState<any>({ x: 0, y: 0 });

  const [cropOffset, setcropOffset] = useState<any>({ x: 0, y: 0 });

  const [Drag, setDrag] = useState<boolean>(false);

  const [SourceWidthForCropX, setSourceWidthForCropX] = useState(0);

  const [SourceWidthForCropY, setSourceWidthForCropY] = useState(0);

  const [cropwidth, setcropwidth] = useState(0);
  const [cropheight, setcropheight] = useState(0);

  const [canvasToimage, setcanvasToimage] = useState<boolean>(false);

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
          x: e.clientX * 1.6 - cropOffset.x,
          y: e.clientY * 1.6 - cropOffset.y,
        });
      } else {
        setcropInitial({
          ...cropInitial,
          x: e.touches[0].clientX * 1.6 - cropOffset.x,
          y: e.touches[0].clientY * 1.6 - cropOffset.y,
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
          x: e.clientX * 1.6 - cropInitial.x,
          y: e.clientY * 1.6 - cropInitial.y,
        });
      } else {
        setcrop({
          ...crop,
          x: e.touches[0].clientX * 1.6 - cropInitial.x,
          y: e.touches[0].clientY * 1.6 - cropInitial.y,
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
    const Newcropimage: any = new Image();
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
  }, [cropimage, BoxCropActivated, showCrop]);

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
  ]);
  const gg = () => {};

  const cropaspectchange = () => {
    setBoxCropActivated((BoxCropActivated) => !BoxCropActivated);
  };

  const complete = () => {
    setTimeout(function () {
      setcropToo({
        ...cropToo,
        x: crop.x,
        y: crop.y,
      });
      setsuperCropLoadFade(true);
      setTimeout(function () {
        setshowCrop(false);
        setcanvasToimage(true);
      }, 500);
    }, 500);
  };

  const blank = () => {};

  ///
  ///
  ///
  /// CLOSE MODAL (STARTS AN ONPOPSTATE EVENT)
  const ClickMonster = useCallback(
    (ii: any) => {
      clickOptions(ii, optionsClickType, "");
      if (ActiveSlide === 3 && ii === 3) {
        if (allowFilters) {
          setActivatefilterImage(true);
        }
      }
    },
    [allowFilters, ActiveSlide, optionsClickType]
  );

  return (
    <>
      {superCropLoadFade ? (
        <>
          <Grid
            container
            style={{
              backgroundColor: darkmodeReducer
                ? "rgba(50,50,50,0.62)"
                : "rgba(250,250,250,0.6)",
              position: "fixed",
              top: "0px",
              width: "100%",
              height: "100%",
              zIndex: 10,
            }}
          ></Grid>{" "}
        </>
      ) : null}

      <Grid
        container
        style={{
          backgroundColor: "rgba(20,20,20,0.3)",
          position: showCrop ? "relative" : "fixed",
          top: showCrop ? "0px" : "-800vh",
          width: "100%",
          height: "70%",
        }}
      >
        <canvas
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
          className={
            darkmodeReducer ? "turdarkCrop topcanvas" : "turdarkCrop topcanvas"
          }
          ref={cropCanvasRef}
          style={{
            padding: "0px",
            margin: "auto",
            cursor: "pointer",
          }}
        />

        <Grid
          container
          style={{
            padding: "0px",
            bottom: "13.6vh",
            margin: "auto",
            width: `100%`,
            height: "0px",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <Grid
            item
            xs={6}
            style={{
              padding: "0px",
              height: "0px",
              margin: "auto",
              display: "grid",
              alignItems: "center",
            }}
          >
            <CropIcon
              onClick={cropaspectchange}
              className={
                darkmodeReducer
                  ? "make-small-icons-clickable-lightCrop turdark dontallowhighlighting zuperkingIcon "
                  : "make-small-icons-clickable-darkCrop  turdark dontallowhighlighting zuperkingIcon  "
              }
              style={{
                margin: "auto",
                marginRight: "9%",
                fontSize: "2.9vw",
              }}
            />
          </Grid>

          <Grid
            item
            xs={6}
            style={{
              padding: "0px",
              height: "0px",
              margin: "auto",
              display: "grid",
              alignItems: "center",
            }}
          >
            <CheckIcon
              onClick={complete}
              className={
                darkmodeReducer
                  ? "make-small-icons-clickable-lightCrop turdark dontallowhighlighting zuperkingIcon "
                  : "make-small-icons-clickable-darkCrop  turdark dontallowhighlighting zuperkingIcon  "
              }
              style={{
                margin: "auto",
                marginLeft: "9%",
                fontSize: "2.9vw",
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {showCrop ? null : (
        <>
          {" "}
          <input
            onChange={imageHandleChange}
            type="file"
            name="superImages"
            accept="image/*"
            multiple
            id="file"
            style={{ visibility: "hidden" }}
          />
          <Grid
            container
            onTouchStart={handleTouchStartOptions}
            onTouchMove={handleTouchMoveOptions}
            style={{
              zIndex: 1,
              padding: "0px",
              top: matchPc ? "-2vh" : "0vh",
              position: "relative",
              margin: "0 auto",
              overflow: "hidden",
              left: "0px",
              height: matchPc ? "24.4vh" : "20.5vh",
              paddingBottom: "1px",
            }}
          >
            <animated.div ref={optionsCollectImageRef} style={modalanimation}>
              {optionsImages.map((im: any, i: any) => (
                <Grid key={i} item xs={12}>
                  {ActiveSlide === 1 && i === 1 ? (
                    <label htmlFor="file">
                      <div
                        onClick={() => {
                          clickOptions(i, optionsClickType, "");
                        }}
                        style={{
                          cursor: ActiveSlide === i ? "pointer" : "alias",
                          width: `${getSliderWidthNew}px`,
                          height: `${getSliderWidthNew}px`,
                          backgroundColor: darkmodeReducer
                            ? "rgba(010,010,010, 0.68)"
                            : "rgba(220,220,220, 0.7)",
                          borderRadius: "50%",
                          marginTop: "2.15vh",
                          textAlign: "center",
                          alignItems: "center",
                          display: "grid",
                          justifyContent: "center",
                          boxShadow: darkmodeReducer
                            ? ActiveSlide === i
                              ? colortypeReducer === 0
                                ? `0 0 5.5px ${colorReducerdark}`
                                : `0 0 5.5px ${colorReducer}`
                              : "0 0 5.5px#aaaaaa"
                            : ActiveSlide === i
                            ? `0 0 5.5px ${colorReducer}`
                            : "0 0 5.45px#222222",
                        }}
                      >
                        <PhotoIcon
                          style={{
                            fontSize: matchPc ? "2vw" : "5vh",
                            color: darkmodeReducer ? "#eeeeee" : "#222222",
                          }}
                          className="zuperkinginfo"
                        />
                      </div>
                    </label>
                  ) : (
                    <>
                      {" "}
                      <span onClick={blank}>
                        <div
                          onClick={() => {
                            ClickMonster(i);
                          }}
                          style={{
                            cursor: ActiveSlide === i ? "pointer" : "alias",
                            width: `${getSliderWidthNew}px`,
                            height: `${getSliderWidthNew}px`,
                            backgroundColor: darkmodeReducer
                              ? "rgba(010,010,010, 0.68)"
                              : "rgba(220,220,220, 0.7)",
                            borderRadius: "50%",
                            marginTop: "2.15vh",
                            textAlign: "center",
                            alignItems: "center",
                            display: "grid",

                            justifyContent: "center",
                            boxShadow: darkmodeReducer
                              ? ActiveSlide === i
                                ? colortypeReducer === 0
                                  ? `0 0 5.5px ${colorReducerdark}`
                                  : `0 0 5.5px ${colorReducer}`
                                : "0 0 5.5px#aaaaaa"
                              : ActiveSlide === i
                              ? `0 0 5.5px ${colorReducer}`
                              : "0 0 5.45px#222222",
                          }}
                        >
                          {i === 0 ? (
                            <MusicNoteIcon
                              style={{
                                fontSize: matchPc ? "2vw" : "5vh",
                                color: darkmodeReducer ? "#eeeeee" : "#222222",
                              }}
                              className="zuperkinginfo"
                            />
                          ) : null}
                          {i === 1 ? (
                            <PhotoIcon
                              style={{
                                fontSize: matchPc ? "2vw" : "5vh",
                                color: darkmodeReducer ? "#eeeeee" : "#222222",
                              }}
                              className="zuperkinginfo"
                            />
                          ) : null}

                          {i === 2 ? (
                            <GifIcon
                              style={{
                                fontSize: matchPc ? "2.5vw" : "5vh",
                                color: darkmodeReducer ? "#eeeeee" : "#222222",
                              }}
                              className="zuperkinginfo"
                            />
                          ) : null}
                          {i === 3 ? (
                            <ChevronRightIcon
                              style={{
                                fontSize: matchPc ? "2.3vw" : "5vh",
                                color: darkmodeReducer ? "#eeeeee" : "#222222",
                              }}
                              className="zuperkinginfo"
                            />
                          ) : null}
                        </div>
                      </span>
                    </>
                  )}
                  <Grid
                    item
                    xs={12}
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      position: "relative",
                      bottom: "-0.5em",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{
                        fontSize: matchPc ? "1.1vw" : "2vh",
                        fontWeight: "bolder",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        visibility: ActiveSlide === i ? "visible" : "hidden",
                        color: darkmodeReducer ? "#dddddd" : "#0b111b",
                      }}
                    >
                      {" "}
                      {optionsNameData[i]}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </animated.div>
          </Grid>{" "}
        </>
      )}

      <Grid container>
        <Grid item xs={12}>
          {showCrop ? (
            <>
              {" "}
              {selectedImage.length > 0 ? (
                <Masonry
                  columns={matchPc ? (selectedImage.length > 2 ? 3 : 2) : 1}
                  spacing={0}
                  style={{
                    overflowX: "hidden",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {selectedImage.map((photo: any, index: any) => {
                    return (
                      <div key={index}>
                        <PreviewCanvas
                          image={photo}
                          cropTOPLEVELScrollRef={cropTOPLEVELScrollRef}
                          index={index}
                          setcropimage={setcropimage}
                          setcrop={setcrop}
                          crop={crop}
                        />
                      </div>
                    );
                  })}{" "}
                </Masonry>
              ) : null}{" "}
            </>
          ) : null}

          <>
            {selectedImage.length > 0 ? (
              <Masonry
                columns={matchPc ? 3 : 1}
                spacing={0}
                style={{
                  overflowX: "hidden",
                  zIndex: 2,
                  position: showCrop ? "fixed" : "relative",
                  top: showCrop ? "-800vh" : "0px",
                }}
              >
                {selectedImage.map((photo: any, index: any) => {
                  return (
                    <div key={index}>
                      <PreviewCanvasCropAll
                        showCrop={showCrop}
                        WideImageCheck={WideImageCheck}
                        SourceWidthForCropX={SourceWidthForCropX}
                        SourceWidthForCropY={SourceWidthForCropY}
                        hdcanvasvalue={hdcanvasvalue}
                        BoxCropActivated={BoxCropActivated}
                        cropheight={cropheight}
                        cropwidth={cropwidth}
                        CropImageHolder={CropImageHolder}
                        cropCanvasRef={cropCanvasRef}
                        crop={cropToo}
                        image={photo}
                        index={index}
                        getpreviewFixedWidth={getpreviewFixedWidth}
                        getCropHeight={getCropHeight}
                        canvasToimage={canvasToimage}
                        refWithimageData={refWithimageData}
                        addUploadItemsRef={addUploadItemsRef}
                        itemUploadRef={itemUploadRef}
                        setsuperCropLoadFade={setsuperCropLoadFade}
                        length={selectedImage.length}
                        filterImage={filterImage}
                        setfilterImage={setfilterImage}
                        setallowFilters={setallowFilters}
                      />
                    </div>
                  );
                })}{" "}
              </Masonry>
            ) : null}
          </>
        </Grid>
      </Grid>

      <Grid
        container
        style={{ height: "100%", position: "fixed", top: "-800vh" }}
      >
        <Grid
          item
          xs={12}
          style={{
            padding: "0px",
          }}
        >
          <Grid
            item
            ref={getpreviewFixedWidthRef}
            xs={5}
            style={{
              padding: "0px",
              height: "40%",
            }}
          ></Grid>

          <Grid
            item
            ref={getFixedCropWidthRef}
            xs={4}
            style={{
              padding: "0px",
              height: "35%",
            }}
          ></Grid>

          <Grid
            item
            ref={getCropHeightRef}
            xs={12}
            style={{ height: "70%" }}
          ></Grid>
        </Grid>
      </Grid>
    </>
  );
}

export const CropUploadMode = React.memo(CropUploadModex);
