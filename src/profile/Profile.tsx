import React, { useRef, useState, useEffect, useCallback } from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { RootStateOrAny, useSelector } from "react-redux";
import "./profile.css";
import { Billboard } from "./Billboard";
import { OptionsSlider } from "./OptionsSlider";
import { CommentTemplate } from "../CommentTemplate";

function Profilex() {
  const getSliderWidthRef = useRef<HTMLDivElement>(null);

  const [formtype, setFormtype] = useState<number>(1);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);

  const [getSliderWidth, setgetSliderWidth] = useState(0);

  const [aboutTemplateGo, setAboutTemplateGo] = useState<boolean>(true);
  const [commentTemplateGo, setCommentTemplateGo] = useState<boolean>(false);

  ///
  ///
  ///
  ///CLOSE LOG MODAL
  const [OpenModalFormOnce, setOpenModalFormOnce] = useState<boolean>(false);
  const CloseModalForm = useCallback((DeviceBackButtonClicked: number) => {
    ///onpopstate fires when back and forward buttons used
    if (DeviceBackButtonClicked === 1) {
      window.onpopstate = () => {
        setShowModalForm(false);
        setOpenModalFormOnce(false);
      };
    } else {
      setShowModalForm(false);
      setOpenModalFormOnce(false);
      ///Replace modal history state with previous history state
      window.history.back();
    }
  }, []);

  const OpenModalForm = useCallback(
    (formtypedata: number) => {
      setShowModalForm(true);
      ///Replace current history state (since opening a modal Level 2 grid)...
      /// if this was a level 1 grid (profile-info page use Pushstate to create new history state)
      let modalName = "Biography";

      if (!OpenModalFormOnce) {
        window.history.pushState(null, "", modalName);
        setOpenModalFormOnce(true);
        CloseModalForm(1);
      }
    },
    [OpenModalFormOnce, CloseModalForm]
  );

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (getSliderWidthRef.current && getSliderWidthRef.current.clientWidth) {
      setgetSliderWidth(getSliderWidthRef.current.clientWidth);
    }
  }, []);

  ///
  ///
  ///
  /// GET DARKMODE FROM REDUX STORE
  interface RootStateGlobalReducer {
    GlobalReducer: {
      darkmode: boolean;
    };
  }
  const { darkmode } = useSelector((state: RootStateGlobalReducer) => ({
    ...state.GlobalReducer,
  }));

  const darkmodeReducer = darkmode;

  ///
  ///
  ///
  ///MUI PAPER STYLES FROM REDUX
  const { PaperStyleLight, PaperStyleDark } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.PaperReducerLightnDark,
    })
  );
  var PaperStyleReducer = "";

  if (darkmodeReducer) {
    PaperStyleReducer = PaperStyleDark;
  } else {
    PaperStyleReducer = PaperStyleLight;
  }

  ///

  ///
  ///
  ///
  return (
    <>
      <Paper
        style={{
          backgroundImage: PaperStyleReducer,
          height: "200vh",
          borderRadius: "0px",
        }}
      >
        {" "}
        <Billboard OpenModalForm={OpenModalForm} />
        <Grid container className="dontallowhighlighting">
          <Grid
            item
            component={Box}
            display={{ xs: "none", md: "block" }}
            md={3}
          ></Grid>

          <Grid
            ref={getSliderWidthRef}
            xs={2}
            md={1}
            style={{ padding: "0px" }}
          ></Grid>

          <Grid xs={3} md={2} style={{ padding: "0px" }}></Grid>
          <Grid
            item
            xs={7}
            md={4}
            style={{
              height: "150px",
              paddingLeft: matchPc ? "20px" : matchTablet ? "42px" : "24px",
              marginTop: "-4px",
            }}
          >
            <OptionsSlider getSliderWidth={getSliderWidth} />
          </Grid>
        </Grid>
        <CommentTemplate
          formtype={formtype}
          showModalForm={showModalForm}
          CloseModalForm={CloseModalForm}
          aboutTemp={aboutTemplateGo}
          commentTemp={commentTemplateGo}
        />
      </Paper>
    </>
  );
}

export const Profile = React.memo(Profilex);
