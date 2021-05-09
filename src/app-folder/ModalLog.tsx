import React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import {
  Grid,
  DialogContent,
  Paper,
  makeStyles,
  createMuiTheme,
  TextField,
  Button,
} from "@material-ui/core";
import im1 from "./images/modalpic1.jpg";
import im2 from "./images/modalpic2.jpg";
import im3 from "./images/modalpic3.png";
import im4 from "./images/modalpic4.jpg";
import { ImodalLog, IGrid } from "./appFolder-Interfaces";
import "./ModalLog.css";
import Axios from "axios";
import ModalLogFormError from "./ModalLogFormError";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";

export default function Modalx({
  formtype,
  CloseModalForm,
  showModalForm,
  setShowModalForm,
  PaperStyle,
  signupclass,
  loginclass,
}: ImodalLog): JSX.Element {
  ///
  ///
  ///
  /// ALL VARIABLES ,ERROR VARIABLES,CONSTANT AND  STATES
  const initialLogValue = {
    inputedUsername: "",
    inputedPassword: "",
  };
  const initialRawSignValue = {
    inputedEmail: "",
    inputedUsername: "",
    inputedPassword: "",
  };
  const initialCleanSignValue = {
    inputedEmail: "",
    inputedUsername: "",
    inputedPassword: "",
  };
  const initialErrorSignValue = {
    inputedEmail: 0,
    inputedUsername: 0,
    inputedPassword: 0,
  };
  const [showimage, setShowimage] = useState<string>(" ");
  const [zoomedModal, setZoomedModal] = useState<boolean>(false);
  const [wideImage, setWideImage] = useState<boolean>(false);
  const EmailCheckingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const EmailErrorHider = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loginvalues, setLoginvalues] = useState(initialLogValue);
  const [cantPassBadEmail, setCantPassBadEmail] = useState<boolean>(false);
  const [rawSignupValues, setRawSignupValues] = useState(initialRawSignValue);
  const [cleanSignupValues, setCleanSignupValues] = useState(
    initialCleanSignValue
  );
  const [errorsSignupValues, setErrorsSignupValues] = useState(
    initialErrorSignValue
  );

  let usernameErrorData = null;
  let usernameErrorDisplay = 0;

  let emailErrorData = null;
  let emailErrorDisplay = 0;

  let passwordErrorData = null;
  let passwordErrorDisplay = 0;

  switch (errorsSignupValues.inputedUsername) {
    case 1:
      usernameErrorData =
        "Usernames can only use letters, numbers, underscores and periods";
      usernameErrorDisplay = 1;
      break;
    case 4:
      usernameErrorData = " Username  required ";
      usernameErrorDisplay = 1;
      break;

    default:
      usernameErrorData = null;
      usernameErrorDisplay = 0;
      break;
  }

  switch (errorsSignupValues.inputedPassword) {
    case 4:
      passwordErrorData = " Password  required ";
      passwordErrorDisplay = 1;
      break;

    default:
      passwordErrorData = null;
      passwordErrorDisplay = 0;
      break;
  }

  switch (errorsSignupValues.inputedEmail) {
    case 1:
      emailErrorData = "Checking...";
      emailErrorDisplay = 1;
      break;

    case 2:
      emailErrorData = "Email address is not valid";
      emailErrorDisplay = 1;
      break;

    case 3:
      emailErrorData = "Email is restricted to certain characters";
      emailErrorDisplay = 1;
      break;

    case 4:
      emailErrorData = "Email required";
      emailErrorDisplay = 1;
      break;

    default:
      emailErrorData = null;
      emailErrorDisplay = 0;
      break;
  }
  ///
  ///
  ///
  ///ALL VARIABLES ,ERROR VARIABLES,CONSTANT AND  STATES

  ///
  ///
  ///
  ///CREATE A SLIDE UP ANIMATION WITH  REACT SPRING
  const modalanimation = useSpring({
    config: {
      duration: 1000,
    },
    opacity: showModalForm ? 1 : 0.9,
    transform: showModalForm ? `translateY(0%)` : `translateY(100%)`,
  });

  ///
  ///
  ///
  /// USEREF TARGETS A DIV(BACKGROUND) AND CLOSES MODAL ON CLICK
  const ModalBackgroundRef = useRef<HTMLInputElement>(null);
  const onBackgroundFocus = (e: any): void => {
    if (ModalBackgroundRef.current === e.target) {
      CloseModalForm(0);
    }
  };

  ///
  ///
  ///
  /// ESCAPE KEY CLOSE MODAL
  const escapePress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModalForm) {
        CloseModalForm(0);
      }
    },
    [setShowModalForm, showModalForm]
  );
  useEffect(() => {
    document.addEventListener("keydown", escapePress);
    return () => document.removeEventListener("keydown", escapePress);
  }, [escapePress]);

  ///
  ///
  ///
  /// RANDOMISE IMAGE
  useEffect(() => {
    let imagecontrol: number[] = [1, 2, 3, 4];
    var randomimage =
      imagecontrol[Math.floor(Math.random() * imagecontrol.length)];

    if (randomimage == 1) {
      setShowimage(im1);
    } else if (randomimage == 2) {
      setShowimage(im2);
    } else if (randomimage == 3) {
      setShowimage(im3);
    } else {
      setShowimage(im4);
    }
  }, []);

  ///
  ///
  ///
  /// GET IMAGE WIDTH ,HEIGHT AND SET WIDE IMAGE
  const onimageload = (e: any) => {
    const imageHeight = e.target.clientHeight;
    const imageWidth = e.target.clientWidth;
    if (imageWidth > imageHeight) {
      setWideImage(true);
    }
  };

  ///
  ///
  ///
  /// SHOW A FULLSCREEN MODAL VIEW
  const zoomlogmodal = () => {
    setZoomedModal(!zoomedModal);
  };

  ///
  ///
  ///
  /// DYNAMIC MODAL LAYOUT VARIABLES
  const wideImageControlTrue: string = "75vw";
  const wideImageControlfalse: string = "70vw";
  const zoomImageControl: string = "100vw";
  const GridMiniAwide: IGrid = 8;
  const GridMiniBwide: IGrid = 4;
  const GridMiniAlong: IGrid = 7;
  const GridMiniBlong: IGrid = 5;
  const GridZoomAwide: IGrid = 8;
  const GridZoomBwide: IGrid = 4;
  const GridZoomAlong: IGrid = 6;
  const GridZoomBlong: IGrid = 6;

  let GridHolderA: IGrid = 7;
  let GridHolderB: IGrid = 5;

  let GridxA: IGrid = 7;
  let GridxB: IGrid = 5;

  let GridyA: IGrid = 7;
  let GridyB: IGrid = 5;

  let wideImageControl: string = "70vw";
  let imageReal: string = "75vw";

  let borderGrid: string = "11px";

  if (zoomedModal) {
    borderGrid = "0px";
    if (wideImage) {
      wideImageControl = wideImageControlTrue;
      GridxA = GridZoomAwide;
      GridxB = GridZoomBwide;
    } else {
      wideImageControl = wideImageControlfalse;
      GridxA = GridZoomAlong;
      GridxB = GridZoomBlong;
    }
    imageReal = zoomImageControl;
    GridHolderA = GridxA;
    GridHolderB = GridxB;
  } else {
    borderGrid = "11px";
    if (wideImage) {
      wideImageControl = wideImageControlTrue;
      GridyA = GridMiniAwide;
      GridyB = GridMiniBwide;
    } else {
      wideImageControl = wideImageControlfalse;
      GridyA = GridMiniAlong;
      GridyB = GridMiniBlong;
    }
    imageReal = wideImageControl;
    GridHolderA = GridyA;
    GridHolderB = GridyB;
  }
  ///
  ///
  ///
  /// DYNAMIC MODAL LAYOUT VARIABLES

  ///
  ///
  ///
  /// MATERIAL UI  CUSTOM STYLES
  let themeGeneralSettingsModal = createMuiTheme({});
  var useStyleModal = makeStyles((themeGeneralSettingsModal) => ({
    containerStyle: {
      width: imageReal,
      height: "auto",
      boxShadow: "0 5px 16px rgba(0, 0, 0, 0.2)",
      color: "#000000",
      position: "relative",
      zIndex: 10,
      borderRadius: borderGrid,
    },
    imageStyle: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
      borderRadius: `${borderGrid} 0 0 10px`,
      background: "#000000",
    },
  }));

  ///
  ///
  ///
  /// SANITISE SIGN UP FORM INPUT CLIENT SIDE
  const updateSignvalues = (e: any) => {
    const { name, value } = e.target;

    if (name === "inputedUsername") {
      let usernameCleaner = /[^a-z0-9áéíóúñü\.'_]/gim;
      let cleanValue = value.replace(usernameCleaner, "");

      let usernameLimiter = /^.{24}$/;
      let finalUsername = cleanValue.replace(usernameLimiter, "");

      let checkUsernameClean = usernameCleaner.test(value);
      let checkUsernameLimited = usernameLimiter.test(cleanValue);

      checkUsernameClean
        ? setErrorsSignupValues({ ...errorsSignupValues, [name]: 1 })
        : setErrorsSignupValues({ ...errorsSignupValues, [name]: 0 });
      if (!checkUsernameLimited) {
        setRawSignupValues({ ...rawSignupValues, [name]: finalUsername });
        setCleanSignupValues({ ...cleanSignupValues, [name]: finalUsername });
      }
      /////////
    } else if (name === "inputedEmail") {
      const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const emailCleaner = /[^*$%#+@a-z0-9áéíóúñü \.'_]/gim;
      let finalEmail = value.replace(emailCleaner, "");

      let checkEmailClean = emailCleaner.test(value);
      let checkEmailValidated = emailValidation.test(
        String(value).toLowerCase()
      );
      if (EmailCheckingTimer.current) {
        clearTimeout(EmailCheckingTimer.current);
      }
      if (!checkEmailValidated) {
        setErrorsSignupValues({ ...errorsSignupValues, [name]: 1 });
        EmailCheckingTimer.current = setTimeout(() => {
          setErrorsSignupValues({ ...errorsSignupValues, [name]: 2 });
          checkEmailClean &&
            setErrorsSignupValues({ ...errorsSignupValues, [name]: 3 });
        }, 2000);
      } else {
        if (EmailCheckingTimer.current) {
          clearTimeout(EmailCheckingTimer.current);
        }
        checkEmailClean
          ? setErrorsSignupValues({ ...errorsSignupValues, [name]: 3 })
          : setErrorsSignupValues({ ...errorsSignupValues, [name]: 0 });
      }

      setRawSignupValues({ ...rawSignupValues, [name]: finalEmail });
      setCleanSignupValues({ ...cleanSignupValues, [name]: finalEmail });
      ////////
    } else {
      setErrorsSignupValues({ ...errorsSignupValues, [name]: 0 });
      setRawSignupValues({ ...rawSignupValues, [name]: value });
      setCleanSignupValues({ ...cleanSignupValues, [name]: value });
    }
  };

  ///
  ///
  ///
  /// SANITISE LOG IN FORM INPUT CLIENT SIDE
  const updateLoginvalues = (e: any) => {
    const { name, value } = e.target;
    setLoginvalues({ ...loginvalues, [name]: value });
  };

  ///
  ///
  ///
  /// SENDING SIGN UP  DATA TO SERVER SIDE
  const signmeup = () => {
    if (
      cleanSignupValues.inputedEmail &&
      cleanSignupValues.inputedUsername &&
      cleanSignupValues.inputedPassword
    ) {
      if (errorsSignupValues.inputedEmail == 0) {
        Axios.post("http://localhost:3001/registration", {
          values: cleanSignupValues,
        })
          .then((response) => {
            if (response.data.message === "username not unique") {
              console.log("Username is Not Availabe");
              alert(response.data.message);
            } else {
              console.log(response.status);
              alert("REGISTRATION COMPLETE");
            }
          })
          .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              //express typo can activate this
              console.log(error.response);
            } else if (error.request) {
              // The request was made but no response was received Or request not made
              // Axios.post("http://localhost:3003/reg" can activate this error
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
          });
      } else {
        setCantPassBadEmail(true);
        setTimeout(() => {
          setCantPassBadEmail(false);
        }, 3000);
      }
    } else {
      let passwordErrorHolder = errorsSignupValues.inputedPassword;
      let emailErrorHolder = errorsSignupValues.inputedEmail;
      let usernameErrorHolder = errorsSignupValues.inputedUsername;

      if (!cleanSignupValues.inputedPassword) {
        passwordErrorHolder = 4;
      }
      if (!cleanSignupValues.inputedEmail) {
        emailErrorHolder = 4;
      }
      if (!cleanSignupValues.inputedUsername) {
        usernameErrorHolder = 4;
      }

      setErrorsSignupValues({
        ...errorsSignupValues,
        inputedPassword: passwordErrorHolder,
        inputedEmail: emailErrorHolder,
        inputedUsername: usernameErrorHolder,
      });
    }
  };

  ///
  ///
  ///
  /// SENDING LOG IN  DATA TO SERVER SIDE
  const logmein = () => {
    Axios.post("http://localhost:3001/logging", {
      values: loginvalues,
    })
      .then((response) => {
        console.log(response.status);
        if (
          response.data.message === "Wrong, Password and Username combination"
        ) {
          alert(response.data.message);
        } else {
          if (response.data.message === "Wrong username") {
            alert(response.data.message);
          } else {
            alert("LOGGED IN");
          }
        }
      })
      .catch(function (error) {
        if (error.response) {
          alert("1");
          // Request made and server responded
          //express typo can activate this
          console.log(error.response);
        } else if (error.request) {
          alert("2");
          // The request was made but no response was received Or request not made
          // Axios.post("http://localhost:3003/reg" can activate this error
          console.log(error.request);
        } else {
          alert("3");
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  var classes = useStyleModal();

  return (
    <>
      {showModalForm ? (
        <DialogContent
          className="FormDialog-container dontallowhighlighting "
          onClick={onBackgroundFocus}
          style={{ overflow: "hidden" }}
          ref={ModalBackgroundRef}
        >
          <animated.div style={modalanimation}>
            <Paper className={PaperStyle} style={{ borderRadius: borderGrid }}>
              <Grid container xs={12} className={classes.containerStyle}>
                <Grid item xs={GridHolderA}>
                  <img
                    onClick={zoomlogmodal}
                    onLoad={onimageload}
                    src={showimage}
                    className={classes.imageStyle}
                    alt="Login Image"
                  />
                </Grid>

                {formtype ? (
                  <Grid xs={GridHolderB} item className="formholder">
                    <Grid xs={12} className="vv">
                      <TextField
                        style={{
                          width: "82%",
                          paddingBottom: "30px",
                        }}
                        inputProps={{ style: { fontSize: "2.5vh" } }}
                        InputLabelProps={{ style: { fontSize: "1.8vh" } }}
                        label="Username"
                        onChange={updateLoginvalues}
                        name="inputedUsername"
                        value={loginvalues.inputedUsername}
                        variant="filled"
                      />
                      <TextField
                        style={{ width: "82%", paddingBottom: "30px" }}
                        inputProps={{ style: { fontSize: "2.5vh" } }}
                        InputLabelProps={{ style: { fontSize: "1.8vh" } }}
                        label="Password"
                        onChange={updateLoginvalues}
                        name="inputedPassword"
                        value={loginvalues.inputedPassword}
                        variant="filled"
                      />

                      <Grid container xs={12}>
                        <Grid xs={4}></Grid>
                        <Grid item className="buttonpad buttonshake" xs={4}>
                          <Button
                            onClick={logmein}
                            className={loginclass}
                            fullWidth={true}
                            variant="outlined"
                            size="large"
                            color="primary"
                          >
                            Log In
                          </Button>
                        </Grid>{" "}
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid xs={GridHolderB} item className="formholder">
                    <Grid xs={12} className="vv" style={{ padding: "0px" }}>
                      <ModalLogFormError
                        type={true}
                        cantPassBadEmail={cantPassBadEmail}
                        ErrorDisplay={emailErrorDisplay}
                        ErrorData={emailErrorData}
                      />
                      <TextField
                        style={{ width: "82%", paddingBottom: "35px" }}
                        inputProps={{ style: { fontSize: "2.5vh" } }}
                        InputLabelProps={{ style: { fontSize: "1.8vh" } }}
                        label="Email"
                        onChange={updateSignvalues}
                        name="inputedEmail"
                        value={rawSignupValues.inputedEmail}
                        variant="filled"
                      />
                      <ModalLogFormError
                        type={true}
                        cantPassBadEmail={cantPassBadEmail}
                        ErrorDisplay={usernameErrorDisplay}
                        ErrorData={usernameErrorData}
                      />
                      <TextField
                        style={{ width: "82%", paddingBottom: "30px" }}
                        inputProps={{ style: { fontSize: "2.5vh" } }}
                        InputLabelProps={{ style: { fontSize: "1.8vh" } }}
                        label="Username"
                        onChange={updateSignvalues}
                        name="inputedUsername"
                        value={rawSignupValues.inputedUsername}
                        variant="filled"
                      />

                      <TextField
                        style={{ width: "82%", paddingBottom: "30px" }}
                        inputProps={{ style: { fontSize: "2.5vh" } }}
                        InputLabelProps={{ style: { fontSize: "1.8vh" } }}
                        label="Password"
                        onChange={updateSignvalues}
                        name="inputedPassword"
                        value={rawSignupValues.inputedPassword}
                        variant="filled"
                      />
                      <ModalLogFormError
                        type={false}
                        cantPassBadEmail={cantPassBadEmail}
                        ErrorDisplay={passwordErrorDisplay}
                        ErrorData={passwordErrorData}
                      />

                      <Grid container xs={12} style={{ marginTop: "20px" }}>
                        <Grid xs={4}></Grid>
                        <Grid item className="buttonpad buttonshake" xs={4}>
                          <Button
                            className={signupclass}
                            onClick={signmeup}
                            fullWidth={true}
                            variant="contained"
                            size="large"
                            color="secondary"
                          >
                            Sign Up
                          </Button>
                        </Grid>{" "}
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </animated.div>
        </DialogContent>
      ) : null}
    </>
  );
}
