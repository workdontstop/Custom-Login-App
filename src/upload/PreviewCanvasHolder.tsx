import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
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
import { PreviewCanvasCropAll } from "./PreviewCanvasCropAll";

function PreviewCanvasHolderx({
  setwaitONLOAD,
  cropCanvasRef,
  getpreviewFixedWidth,
  CropImageHolder,
  cropheight,
  cropwidth,
  BoxCropActivated,
  hdcanvasvalue,
  SourceWidthForCropX,
  SourceWidthForCropY,
  WideImageCheck,
  crop,
  getCropHeight,
  canvasToimage,
  refWithimageData,
  addUploadItemsRef,
  itemUploadRef,
  itemUploadRefThumb,
  itemUploadRefSD,
  setsuperCropLoadFade,
  length,
  filterImage,
  setfilterImage,
  setallowFilters,
  allowCropAllCanvas,
  cutOffLoader,
  setcutOffLoader,
  addUploadItemsRefThumb,
  addUploadItemsRefSD,
  zoom,
  selectedImage,
  myCropHeight,
  cropToo,
}: any): JSX.Element {
  const [waitcropall, setwaitcropall] = useState<number>(0);

  ///
  ///
  ///
  /// GET GLOBAL INNER NAVIGATION VARIABLE
  const { activatecropImage } = useSelector((state: RootStateOrAny) => ({
    ...state.GlobalNavuploadReducer,
  }));
  const activatecropImageReducer = activatecropImage;

  return (
    <>
      {/* SD IMAGE  CREATED  itemUploadRef */}
      {selectedImage.length > 0 ? (
        <div
          style={{
            overflowX: "hidden",
            zIndex: 2,
            position: activatecropImageReducer ? "fixed" : "relative",
            top: activatecropImageReducer ? "-800vh" : "0px",
            padding: "0px",
          }}
        >
          {selectedImage.map((photo: any, index: any) => {
            return (
              <div key={index} style={{ padding: "0px" }}>
                <PreviewCanvasCropAll
                  setwaitcropall={setwaitcropall}
                  waitcropall={waitcropall}
                  zoom={zoom}
                  setwaitONLOAD={setwaitONLOAD}
                  allowCropAllCanvas={allowCropAllCanvas}
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
                  myCropHeight={myCropHeight}
                  canvasToimage={canvasToimage}
                  refWithimageData={refWithimageData}
                  addUploadItemsRef={addUploadItemsRef}
                  itemUploadRef={itemUploadRef}
                  itemUploadRefSD={itemUploadRefSD}
                  itemUploadRefThumb={itemUploadRefThumb}
                  setsuperCropLoadFade={setsuperCropLoadFade}
                  length={selectedImage.length}
                  filterImage={filterImage}
                  setfilterImage={setfilterImage}
                  setallowFilters={setallowFilters}
                  cutOffLoader={cutOffLoader}
                  setcutOffLoader={setcutOffLoader}
                  addUploadItemsRefThumb={addUploadItemsRefThumb}
                  addUploadItemsRefSD={addUploadItemsRefSD}
                  type={2}
                />
              </div>
            );
          })}{" "}
        </div>
      ) : null}

      {/* SD IMAGE  CREATED  itemUploadRef */}
      {/* /////////////////// */}

      {/* HD IMAGE  CREATED  itemUploadRef */}
      <>
        {selectedImage.length > 0 ? (
          selectedImage.length === 1 ? (
            <>
              {selectedImage.map((photo: any, index: any) => {
                return (
                  <div key={index} style={{ padding: "0px" }}>
                    <PreviewCanvasCropAll
                      setwaitcropall={setwaitcropall}
                      waitcropall={waitcropall}
                      zoom={zoom}
                      setwaitONLOAD={setwaitONLOAD}
                      allowCropAllCanvas={allowCropAllCanvas}
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
                      myCropHeight={myCropHeight}
                      canvasToimage={canvasToimage}
                      refWithimageData={refWithimageData}
                      addUploadItemsRef={addUploadItemsRef}
                      itemUploadRef={itemUploadRef}
                      itemUploadRefSD={itemUploadRefSD}
                      itemUploadRefThumb={itemUploadRefThumb}
                      setsuperCropLoadFade={setsuperCropLoadFade}
                      length={selectedImage.length}
                      filterImage={filterImage}
                      setfilterImage={setfilterImage}
                      setallowFilters={setallowFilters}
                      cutOffLoader={cutOffLoader}
                      setcutOffLoader={setcutOffLoader}
                      addUploadItemsRefThumb={addUploadItemsRefThumb}
                      addUploadItemsRefSD={addUploadItemsRefSD}
                      type={1}
                    />
                  </div>
                );
              })}{" "}
            </>
          ) : (
            <>
              {" "}
              <div
                style={{
                  overflowX: "hidden",
                  zIndex: 2,
                  position: activatecropImageReducer ? "fixed" : "relative",
                  top: activatecropImageReducer ? "-800vh" : "0px",
                  padding: "0px",
                }}
              >
                {selectedImage.map((photo: any, index: any) => {
                  return (
                    <div key={index} style={{ padding: "0px" }}>
                      <PreviewCanvasCropAll
                        setwaitcropall={setwaitcropall}
                        waitcropall={waitcropall}
                        zoom={zoom}
                        setwaitONLOAD={setwaitONLOAD}
                        allowCropAllCanvas={allowCropAllCanvas}
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
                        myCropHeight={myCropHeight}
                        canvasToimage={canvasToimage}
                        refWithimageData={refWithimageData}
                        addUploadItemsRef={addUploadItemsRef}
                        itemUploadRef={itemUploadRef}
                        itemUploadRefSD={itemUploadRefSD}
                        itemUploadRefThumb={itemUploadRefThumb}
                        setsuperCropLoadFade={setsuperCropLoadFade}
                        length={selectedImage.length}
                        filterImage={filterImage}
                        setfilterImage={setfilterImage}
                        setallowFilters={setallowFilters}
                        cutOffLoader={cutOffLoader}
                        setcutOffLoader={setcutOffLoader}
                        addUploadItemsRefThumb={addUploadItemsRefThumb}
                        addUploadItemsRefSD={addUploadItemsRefSD}
                        type={1}
                      />
                    </div>
                  );
                })}{" "}
              </div>
            </>
          )
        ) : null}
      </>
      {/* HD IMAGE  CREATED  itemUploadRef */}
      {/* /////////////////// */}

      {/* /////////////////// */}
      {/* Thumb IMAGE  CREATED  itemUploadRefThumb */}
      <>
        {selectedImage.length > 0 ? (
          <div
            style={{
              overflowX: "hidden",
              zIndex: 2,
              position: activatecropImageReducer ? "fixed" : "relative",
              top: activatecropImageReducer ? "-800vh" : "0px",
              padding: "0px",
            }}
          >
            {selectedImage.map((photo: any, index: any) => {
              return (
                <div key={index} style={{ padding: "0px" }}>
                  <PreviewCanvasCropAll
                    zoom={zoom}
                    setwaitONLOAD={setwaitONLOAD}
                    allowCropAllCanvas={allowCropAllCanvas}
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
                    myCropHeight={myCropHeight}
                    canvasToimage={canvasToimage}
                    refWithimageData={refWithimageData}
                    addUploadItemsRef={addUploadItemsRef}
                    itemUploadRef={itemUploadRef}
                    itemUploadRefSD={itemUploadRefSD}
                    itemUploadRefThumb={itemUploadRefThumb}
                    setsuperCropLoadFade={setsuperCropLoadFade}
                    length={selectedImage.length}
                    filterImage={filterImage}
                    setfilterImage={setfilterImage}
                    setallowFilters={setallowFilters}
                    cutOffLoader={cutOffLoader}
                    setcutOffLoader={setcutOffLoader}
                    addUploadItemsRefThumb={addUploadItemsRefThumb}
                    addUploadItemsRefSD={addUploadItemsRefSD}
                    type={3}
                  />
                </div>
              );
            })}{" "}
          </div>
        ) : null}
      </>
      {/* Thumb IMAGE  CREATED  itemUploadRefThumb */}
    </>
  );
}

export const PreviewCanvasHolder = React.memo(PreviewCanvasHolderx);
