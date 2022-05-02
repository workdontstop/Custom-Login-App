import React, { useRef, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useSpring, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";

function ImageTobeFilteredx({
  itemUploadRef,
  FilterSliderWidth,
  FilterSliderHeight,
  index,
}: any): JSX.Element {
  ///
  ///
  ///
  const [imageHeight, setimageHeight] = useState(0);
  const [imageWidth, setimageWidth] = useState(0);
  const getimageDimensions: any = useRef<HTMLImageElement>(null);

  const [show, setshow] = useState(false);

  const [wideimage, setwideimage] = useState(false);

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (itemUploadRef.current[index]) {
      if (
        itemUploadRef.current[index].width > itemUploadRef.current[index].height
      ) {
        setwideimage(true);
        setshow(true);
      }
    }
  }, [itemUploadRef.current[index]]);

  return (
    <>
      {show ? (
        <img
          id={itemUploadRef.current[index]}
          src={
            itemUploadRef.current[index]
              ? itemUploadRef.current[index].src
              : null
          }
          style={{
            width: wideimage ? `${FilterSliderWidth}px` : "auto",
            height: wideimage ? "auto" : `${FilterSliderHeight}px`,
            position: "relative",
            margin: "auto",
          }}
        />
      ) : null}
    </>
  );
}

export const ImageTobeFiltered = React.memo(ImageTobeFilteredx);
