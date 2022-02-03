import React, { useRef, useState, useCallback, useEffect } from "react";
import { Ispinnerinterface, IFormHolder } from "../log/log-Interfaces";
import Axios from "axios";
import SuperstarzIconLight from "./../images/ssmall.png";
import SuperstarzIconDark from "./../images/sdsmall.png";
import { TextFieldLogin } from "../log/TextFieldLogin";
import { TextFieldSignup } from "../log/TextFieldSignup";
import { ModalFormSignupError } from "../log/ModalFormSignupError";
import { ModalFormLoginError } from "../log/ModalFormLoginError";
import { Button, Grid } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { IsLoggedAction } from "../log/actions/IsLoggedAction";
import { UserdataAction } from "../log/actions/UserdataAction";
import { ActivateLoaderAction, HideLoaderAction } from "../GlobalActions";
//////import { useHistory } from "react-router-dom";
import { PasswordCheck } from "../log/PasswordCheck";
import { UpdateColorAction } from "../GlobalActions";
import { UserInfoUpdateAction } from "../log/actions/UserdataAction";

Axios.defaults.withCredentials = true;

function AboutFormHolderx({
  zoomedModal,
  WidthHolder,
  loginForm,
  setServerErrorData,
  setServerErrorDisplay,
  setserverEmojiplain,
  checkSignupPasswordACTIVATE,
  setcheckSignupPasswordACTIVATE,
}: IFormHolder) {
  const dispatch = useDispatch();

  const [focusUsernameSign, setFocusUsernameSign] = useState<boolean>(false);

  const [bopUsername, setbopUsername] = useState<boolean>(false);

  const [showFocusTextFieldByHidePadding, setShowFocusTextFieldByHidePadding] =
    useState<boolean>(false);

  const [responseErrorConfirmPassword, setresponseErrorConfirmPassword] =
    useState<boolean>(false);

  var buttonFont = "";
  var buttonTransform = " ";
  var pad = "";

  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  if (matchPc) {
    buttonFont = "1vw";
    buttonTransform = " ";
    pad = "14.5px";

    ///
  } else if (matchTablet) {
    pad = "16px";
    buttonFont = "2vw";
    buttonTransform = " ";
    ///
  } else {
    buttonFont = "";
    buttonTransform = "scale(0.95)";
    pad = "16px";
  }

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
  /// GET  SIGNUP BUTTON AND LOGIN BUTTON STYLE FROM REDUX
  const { MozBoxShadowSD, WebkitBoxShadowSD, boxShadowSD } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.ButtonsSignUpReducerDark,
    })
  );

  const { MozBoxShadowSL, WebkitBoxShadowSL, boxShadowSL } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.ButtonsSignUpReducerLight,
    })
  );

  const { MozBoxShadowLD, WebkitBoxShadowLD, boxShadowLD } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.ButtonsLoginReducerDark,
    })
  );

  const { MozBoxShadowLL, WebkitBoxShadowLL, boxShadowLL } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.ButtonsLoginReducerLight,
    })
  );

  var MozBoxShadowReducerLogin = " ";
  var WebkitBoxShadowReducerLogin = " ";
  var boxShadowReducerLogin = " ";

  var MozBoxShadowReducerSign = " ";
  var WebkitBoxShadowReducerSign = " ";
  var boxShadowReducerSign = " ";

  if (darkmodeReducer) {
    MozBoxShadowReducerLogin = MozBoxShadowLD;
    WebkitBoxShadowReducerLogin = WebkitBoxShadowLD;
    boxShadowReducerLogin = boxShadowLD;

    MozBoxShadowReducerSign = MozBoxShadowSD;
    WebkitBoxShadowReducerSign = WebkitBoxShadowSD;
    boxShadowReducerSign = boxShadowSD;
  } else {
    MozBoxShadowReducerLogin = MozBoxShadowLL;
    WebkitBoxShadowReducerLogin = WebkitBoxShadowLL;
    boxShadowReducerLogin = boxShadowLL;

    MozBoxShadowReducerSign = MozBoxShadowSL;
    WebkitBoxShadowReducerSign = WebkitBoxShadowSL;
    boxShadowReducerSign = boxShadowSL;
  }

  ///
  ///
  ///
  ///HISTORY VARIABLE
  ////const history = useHistory();
  ///

  ///
  ///
  ///SUPERSTARZ ICON SELECT
  var SuperIcon = "";
  darkmodeReducer
    ? (SuperIcon = SuperstarzIconDark)
    : (SuperIcon = SuperstarzIconLight);

  const { REACT_APP_SUPERSTARZ_URL } = process.env;
  ///
  ///
  ///
  /// GET LOGGED USER DATA FROM REDUX STORE
  interface RootStateReducerImage {
    UserdataReducer: {
      id: number;
      username: string;
      quote: string;
      biography: string;
    };
  }
  const { id, username, quote, biography } = useSelector(
    (state: RootStateReducerImage) => ({
      ...state.UserdataReducer,
    })
  );
  const idReducer = id;
  const usernameReducer = username;
  const quoteReducer = quote;
  const biographyReducer = biography;
  ///
  ///
  ///UPDATE SIGN UP DETAILS
  ///
  ///
  ///
  /// SANITISE SIGN UP FORM INPUT CLIENT
  const initialRawSignValue = {
    inputedQuote: "",
    inputedUsername: "",
    inputedDescription: "",
    id: idReducer,
  };
  const initialCleanSignValue = {
    inputedQuote: "",
    inputedUsername: "",
    inputedDescription: "",
    id: idReducer,
  };

  const initialErrorSignValue = {
    inputedQuote: 0,
    inputedUsername: 0,
    inputedDescription: 0,
  };

  const [rawSignupValues, setRawSignupValues] = useState(initialRawSignValue);
  const [cleanSignupValues, setCleanSignupValues] = useState(
    initialCleanSignValue
  );
  const [errorsSignupValues, setErrorsSignupValues] = useState(
    initialErrorSignValue
  );

  const EmailCheckingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const UsernameCheckingTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const initialspinner: any = {
    inputedUsername: false,
    inputedquote: false,
    inputeddescription: false,
  };

  const [errorFormChecking, setErrorFormChecking] = useState(initialspinner);
  const PasswordCheckingTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [signupShowPassword, setSignupShowPassword] = useState<boolean>(false);
  const signupShowPasswordTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  ///
  ///
  ///
  ///SIGN UP ERROR VARIABLES
  let usernameErrorData = null;
  let usernameErrorDisplay = 0;

  switch (errorsSignupValues.inputedUsername) {
    case 1:
      usernameErrorData =
        "usernames can only use letters, numbers, underscores and periods ";
      usernameErrorDisplay = 1;
      break;
    case 2:
      usernameErrorData = "username is taken";
      usernameErrorDisplay = 1;
      break;
    case 3:
      usernameErrorData = "username is available";
      usernameErrorDisplay = 1;
      break;
    case 4:
      usernameErrorData = "username  required";
      usernameErrorDisplay = 1;
      break;

    default:
      usernameErrorData = null;
      usernameErrorDisplay = 0;
      break;
  }

  ///
  ///
  ///
  ///SIGN UP ERROR VARIABLES

  ///
  ///
  ///
  /// SHOW  SIGNUP PASSWORD FOR A WHILE
  const ShowSignupPasswordForaWhile = useCallback(() => {
    if (signupShowPasswordTimer.current) {
      clearTimeout(signupShowPasswordTimer.current);
    }
    setSignupShowPassword(!signupShowPassword);
    signupShowPasswordTimer.current = setTimeout(() => {
      setSignupShowPassword(false);
    }, 2000);
  }, [signupShowPassword]);

  /// SANITISE LOG IN FORM INPUT CLIENT SIDE
  const updateSignvalues = useCallback(
    (e: any) => {
      const { name, value } = e.target;

      if (name === "inputedUsername") {
        let usernameCleaner = /[^a-z0-9áéíóúñü\._]/gim;
        let cleanValue = value.replace(usernameCleaner, "");

        let usernameLimiter = /^.{26}$/;
        let finalUsername = cleanValue.replace(usernameLimiter, "");

        let checkUsernameClean = usernameCleaner.test(value);
        let checkUsernameLimited = usernameLimiter.test(cleanValue);

        if (checkUsernameClean) {
          if (UsernameCheckingTimer.current) {
            clearTimeout(UsernameCheckingTimer.current);
          }
          setErrorsSignupValues({ ...errorsSignupValues, [name]: 1 });
        } else {
          setErrorsSignupValues({ ...errorsSignupValues, [name]: 0 });
        }

        let userNameLength = finalUsername.length;

        if (checkUsernameClean) {
        } else {
          if (checkUsernameLimited || userNameLength > 26) {
          } else {
            setRawSignupValues({
              ...rawSignupValues,
              [name]: finalUsername,
            });
            setCleanSignupValues({
              ...cleanSignupValues,
              [name]: finalUsername,
            });
            /// AXIOS REQUEST FOR CHECK USERNAME
            if (UsernameCheckingTimer.current) {
              clearTimeout(UsernameCheckingTimer.current);

              setErrorsSignupValues({ ...errorsSignupValues, [name]: 0 });
            }

            if (errorFormChecking.inputedUsername) {
            } else {
              setErrorFormChecking({ ...errorFormChecking, [name]: true });
            }

            setErrorsSignupValues({ ...errorsSignupValues, [name]: 2 });
            UsernameCheckingTimer.current = setTimeout(() => {
              if (value.length === 0) {
                setErrorsSignupValues({
                  ...errorsSignupValues,
                  [name]: 0,
                });
                setErrorFormChecking({
                  ...errorFormChecking,
                  [name]: false,
                });
              } else {
                Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/usernamecheck`, {
                  value: finalUsername,
                })
                  .then((response) => {
                    if (response.data.message === "username is not unique") {
                      setErrorsSignupValues({
                        ...errorsSignupValues,
                        [name]: 2,
                      });
                      setErrorFormChecking({
                        ...errorFormChecking,
                        [name]: false,
                      });
                    } else if (
                      response.data.message === "username is available"
                    ) {
                      setErrorsSignupValues({
                        ...errorsSignupValues,
                        [name]: 3,
                      });
                      setErrorFormChecking({
                        ...errorFormChecking,
                        [name]: false,
                      });
                    } else {
                      setErrorsSignupValues({
                        ...errorsSignupValues,
                        [name]: 0,
                      });
                      setErrorFormChecking({
                        ...errorFormChecking,
                        [name]: false,
                      });
                    }
                  })
                  .catch(function (error) {
                    if (error.response) {
                      setErrorsSignupValues({
                        ...errorsSignupValues,
                        [name]: 0,
                      });
                      setErrorFormChecking({
                        ...errorFormChecking,
                        [name]: false,
                      });
                    } else if (error.request) {
                      setErrorsSignupValues({
                        ...errorsSignupValues,
                        [name]: 0,
                      });
                      setErrorFormChecking({
                        ...errorFormChecking,
                        [name]: false,
                      });
                    } else {
                      setErrorsSignupValues({
                        ...errorsSignupValues,
                        [name]: 0,
                      });
                      setErrorFormChecking({
                        ...errorFormChecking,
                        [name]: false,
                      });
                    }
                  });
              }
            }, 3000);
            /// AXIOS REQUEST FOR CHECK USERNAME
          }
        }
        ///
      } else if (name === "inputedQuote") {
        let dataCleaner = /[^a-z0-9áéíóúñü\._ ]/gim;
        let cleanValue = value.replace(dataCleaner, "");

        let dataLimiter = /^.{70}$/;
        let finaldata = cleanValue.replace(dataLimiter, "");

        let checkdataClean = dataCleaner.test(value);
        let checkdataLimited = dataLimiter.test(cleanValue);

        let dataLength = finaldata.length;

        if (checkdataClean) {
        } else {
          if (checkdataLimited || dataLength > 70) {
          } else {
            setRawSignupValues({
              ...rawSignupValues,
              [name]: finaldata,
            });
            setCleanSignupValues({
              ...cleanSignupValues,
              [name]: finaldata,
            });
          }
        }
      } else {
        let dataCleaner = /[^a-z0-9áéíóúñü\._ ]/gim;
        let cleanValue = value.replace(dataCleaner, "");

        let dataLimiter = /^.{500}$/;
        let finaldata = cleanValue.replace(dataLimiter, "");

        let checkdataClean = dataCleaner.test(value);
        let checkdataLimited = dataLimiter.test(cleanValue);

        let dataLength = finaldata.length;

        if (checkdataClean) {
        } else {
          if (checkdataLimited || dataLength > 500) {
          } else {
            setRawSignupValues({
              ...rawSignupValues,
              [name]: finaldata,
            });
            setCleanSignupValues({
              ...cleanSignupValues,
              [name]: finaldata,
            });
          }
        }
      }
    },
    [
      cleanSignupValues,
      rawSignupValues,
      errorsSignupValues,
      errorFormChecking,
      REACT_APP_SUPERSTARZ_URL,
    ]
  );

  var updatebuttonShow: any = "hidden";
  if (
    cleanSignupValues.inputedUsername ||
    cleanSignupValues.inputedQuote ||
    cleanSignupValues.inputedDescription
  ) {
    updatebuttonShow = "visible";
  } else {
    updatebuttonShow = "hidden";
  }

  var aboutboy: any = {
    inputedUsername: "",
    inputedQuote: "",
    inputedDescription: 0,
    id: idReducer,
  };

  ///
  ///
  ///
  /// SENDING SIGN UP  DATA TO SERVER SIDE

  const signmeup = useCallback(() => {
    if (
      cleanSignupValues.inputedUsername ||
      cleanSignupValues.inputedQuote ||
      cleanSignupValues.inputedDescription
    ) {
      var T1 = "";
      var donetext1 = "";
      if (cleanSignupValues.inputedUsername) {
        T1 = cleanSignupValues.inputedUsername;
        donetext1 = "username ";
      } else {
        T1 = usernameReducer;
      }
      var T2 = "";
      var donetext2 = "";
      if (cleanSignupValues.inputedQuote) {
        T2 = cleanSignupValues.inputedQuote;
        donetext2 = "quote ";
      } else {
        T2 = quoteReducer;
      }
      var T3 = "";
      var donetext3 = "";
      if (cleanSignupValues.inputedDescription) {
        T3 = cleanSignupValues.inputedDescription;
        donetext3 = "description ";
      } else {
        T3 = biographyReducer;
      }

      var done: any = `${donetext1}  ${donetext2}   ${donetext3} `;

      aboutboy = {
        inputedUsername: T1,
        inputedQuote: T2,
        inputedDescription: T3,
        id: idReducer,
      };

      if (
        (cleanSignupValues.inputedUsername &&
          errorsSignupValues.inputedUsername === 3) ||
        !cleanSignupValues.inputedUsername
      ) {
        Axios.put(
          `http://${REACT_APP_SUPERSTARZ_URL}/update_basic`,
          { values: aboutboy },
          {
            withCredentials: true,
          }
        )
          .then((response) => {
            if (response.data.message === "username updated") {
              setServerErrorData(`${done} UPDATED`);
              setServerErrorDisplay(1);
              setserverEmojiplain(true);
              const data = {
                username: T1,
                quote: T2,
                describe: T3,
              };
              dispatch(UserInfoUpdateAction(data));
              setRawSignupValues({
                ...rawSignupValues,
                inputedUsername: "",
                inputedQuote: "",
                inputedDescription: "",
              });
              setCleanSignupValues({
                ...cleanSignupValues,
                inputedUsername: "",
                inputedQuote: "",
                inputedDescription: "",
              });
              setErrorsSignupValues({
                ...errorsSignupValues,
                inputedUsername: 0,
              });
            } else {
              setServerErrorData(
                "something went wrong while updating your username , please try again"
              );
              setServerErrorDisplay(1);
              setserverEmojiplain(false);
            }
          })
          .catch(function (error) {
            setServerErrorData(
              "something went wrong while updating your username, please try again"
            );
            setServerErrorDisplay(1);
            setserverEmojiplain(false);
          });
      } else {
        alert("no");
      }
    } else {
    }
  }, [
    REACT_APP_SUPERSTARZ_URL,
    cleanSignupValues,
    errorsSignupValues,
    checkSignupPasswordACTIVATE,
    dispatch,
    aboutboy,
    setServerErrorData,
    setServerErrorDisplay,
    setcheckSignupPasswordACTIVATE,
    setserverEmojiplain,
    usernameReducer,
    quoteReducer,
    biographyReducer,
  ]);

  ///
  ///
  ///
  ///ENTER KEY EMULATE FORM ACTION
  const enterPress = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        signmeup();
      }
    },
    [signmeup]
  );
  useEffect(() => {
    document.addEventListener("keydown", enterPress);
    return () => document.removeEventListener("keydown", enterPress);
  }, [enterPress]);

  ///
  ///
  ///
  ///
  ///
  /// UPDATE SIGN UP DETAILS

  ///
  ///
  ///

  return (
    <>
      {matchPc /*PC PC PC PC PC PC PC PC  SIGNUP  PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC */ ? (
        <>
          <Grid container>
            <Grid item xs={12} style={{ width: "150%" }}>
              <ModalFormSignupError
                focus={focusUsernameSign}
                device="pc"
                ErrorType={errorsSignupValues.inputedUsername}
                textField="username"
                errorFormChecking={errorFormChecking.inputedUsername}
                WidthHolder={WidthHolder}
                type={true}
                ErrorDisplay={usernameErrorDisplay}
                ErrorData={usernameErrorData}
                bop={bopUsername}
                checkSignupPasswordACTIVATE={checkSignupPasswordACTIVATE}
              />
              <TextFieldSignup
                sourceType="ABOUT"
                showFocusTextFieldByHidePadding={
                  showFocusTextFieldByHidePadding
                }
                setShowFocusTextFieldByHidePadding={
                  setShowFocusTextFieldByHidePadding
                }
                focus={focusUsernameSign}
                setFocus={setFocusUsernameSign}
                updateSignvalues={updateSignvalues}
                rawSignupValues={rawSignupValues}
                ShowSignupPasswordForaWhile={ShowSignupPasswordForaWhile}
                signupShowPassword={signupShowPassword}
                size="medium"
                emailType={false}
                passwordType={false}
                withHolder={WidthHolder}
                checkSignupPasswordACTIVATE={checkSignupPasswordACTIVATE}
              />
              <TextFieldSignup
                sourceType="ABOUT"
                showFocusTextFieldByHidePadding={
                  showFocusTextFieldByHidePadding
                }
                setShowFocusTextFieldByHidePadding={
                  setShowFocusTextFieldByHidePadding
                }
                focus={focusUsernameSign}
                setFocus={setFocusUsernameSign}
                updateSignvalues={updateSignvalues}
                rawSignupValues={rawSignupValues}
                ShowSignupPasswordForaWhile={ShowSignupPasswordForaWhile}
                signupShowPassword={signupShowPassword}
                size="medium"
                emailType={true}
                passwordType={false}
                withHolder={WidthHolder}
                checkSignupPasswordACTIVATE={checkSignupPasswordACTIVATE}
              />
              <TextFieldSignup
                sourceType="ABOUT"
                showFocusTextFieldByHidePadding={
                  showFocusTextFieldByHidePadding
                }
                setShowFocusTextFieldByHidePadding={
                  setShowFocusTextFieldByHidePadding
                }
                focus={focusUsernameSign}
                setFocus={setFocusUsernameSign}
                updateSignvalues={updateSignvalues}
                rawSignupValues={rawSignupValues}
                ShowSignupPasswordForaWhile={ShowSignupPasswordForaWhile}
                signupShowPassword={signupShowPassword}
                size="medium"
                emailType={false}
                passwordType={true}
                withHolder={WidthHolder}
                checkSignupPasswordACTIVATE={checkSignupPasswordACTIVATE}
              />
            </Grid>
          </Grid>
          <Grid
            container
            style={{
              opacity: checkSignupPasswordACTIVATE ? 0 : 1,
              marginTop: "-20px",
            }}
            className="modal-hold-signup"
          >
            <Grid item xs={4}></Grid>
            <Grid item className="buttonpad buttonshake" xs={4} style={{}}>
              <Button
                style={{
                  fontSize: buttonFont,
                  transform: buttonTransform,
                  padding: pad,
                  borderRadius: "50px",
                  MozBoxShadow: MozBoxShadowReducerSign,
                  WebkitBoxShadow: WebkitBoxShadowReducerSign,
                  boxShadow: boxShadowReducerSign,
                  visibility: updatebuttonShow,
                }}
                onClick={signmeup}
                fullWidth={true}
                variant="contained"
                size="large"
                color="secondary"
              >
                Update
              </Button>
            </Grid>{" "}
          </Grid>{" "}
        </> /*PC PC PC PC   SIGN UP PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC */
      ) : (
        /*MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE*/
        <>
          <Grid container>
            <Grid item xs={12} style={{ width: "150%" }}>
              <ModalFormSignupError
                focus={focusUsernameSign}
                device="pc"
                ErrorType={errorsSignupValues.inputedUsername}
                textField="username"
                errorFormChecking={errorFormChecking.inputedUsername}
                WidthHolder={WidthHolder}
                type={true}
                ErrorDisplay={usernameErrorDisplay}
                ErrorData={usernameErrorData}
                bop={bopUsername}
                checkSignupPasswordACTIVATE={checkSignupPasswordACTIVATE}
              />
              <TextFieldSignup
                sourceType="ABOUT"
                showFocusTextFieldByHidePadding={
                  showFocusTextFieldByHidePadding
                }
                setShowFocusTextFieldByHidePadding={
                  setShowFocusTextFieldByHidePadding
                }
                focus={focusUsernameSign}
                setFocus={setFocusUsernameSign}
                updateSignvalues={updateSignvalues}
                rawSignupValues={rawSignupValues}
                ShowSignupPasswordForaWhile={ShowSignupPasswordForaWhile}
                signupShowPassword={signupShowPassword}
                size="medium"
                emailType={false}
                passwordType={false}
                withHolder={WidthHolder}
                checkSignupPasswordACTIVATE={checkSignupPasswordACTIVATE}
              />
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              opacity: checkSignupPasswordACTIVATE ? 0 : 1,
            }}
            className="modal-hold-signup"
          >
            <Grid item xs={4}></Grid>
            <Grid item className="buttonpad buttonshake" xs={4}>
              <Button
                style={{
                  fontSize: buttonFont,
                  transform: buttonTransform,
                  padding: pad,
                  borderRadius: "50px",
                  MozBoxShadow: MozBoxShadowReducerSign,
                  WebkitBoxShadow: WebkitBoxShadowReducerSign,
                  boxShadow: boxShadowReducerSign,
                }}
                onClick={signmeup}
                fullWidth={true}
                variant="contained"
                size="large"
                color="secondary"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
    /*MOBILE  MOBILE  MOBILE  MOBILE  SIGNUP MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE*/
  );
}

export const AboutFormHolder = React.memo(AboutFormHolderx);
