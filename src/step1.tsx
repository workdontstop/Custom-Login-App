import React, { useState } from "react";

import { TextField } from "@material-ui/core";

export default function Step1() {
  const [name, setName] = useState<string>();

  const initialRawLogValue = {
    inputedUsername: "",
    inputedEmail: "",
    inputedPassword: "",
  };

  const initialCleanLogValue = {
    inputedUsername: "",
    inputedEmail: "",
    inputedPassword: "",
  };

  const initialErrorLogValue = {
    inputedUsername: 0,
    inputedEmail: 0,
  };

  const [rawLoginValues, setRawLoginValues] = useState(initialRawLogValue);

  const [cleanLoginValues, setCleanLoginValues] = useState(
    initialCleanLogValue
  );

  const [errorsLoginValues, setErrorsLoginValues] = useState(
    initialErrorLogValue
  );

  const updateLoginvalues = (e: any) => {
    const { name, value } = e.target;

    if (name === "inputedUsername") {
      let gg = /[^a-z0-9áéíóúñü \.'_]/gim;
      let val = value.replace(gg, "");
      let gg1 = /^.{24}$/;

      let valu = val.replace(gg1, "");
      let vv = gg.test(value);
      let vvx = gg1.test(val);

      vv
        ? setErrorsLoginValues({ ...errorsLoginValues, [name]: 1 })
        : setErrorsLoginValues({ ...errorsLoginValues, [name]: 0 });

      if (!vvx) {
        setRawLoginValues({ ...rawLoginValues, [name]: valu });
      } else {
        setErrorsLoginValues({ ...errorsLoginValues, [name]: 3 });
      }
    } else if (name === "inputedEmail") {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let vaa = re.test(String(value).toLowerCase());
      if (!vaa) {
        setErrorsLoginValues({ ...errorsLoginValues, [name]: 1 });
      } else {
        setErrorsLoginValues({ ...errorsLoginValues, [name]: 0 });
      }
      setRawLoginValues({ ...rawLoginValues, [name]: value });
    } else {
      setRawLoginValues({ ...rawLoginValues, [name]: value });
    }
  };

  const onSubmit = () => {
    alert(rawLoginValues.inputedUsername);
  };

  let qa = "";
  let za = "";

  switch (errorsLoginValues.inputedUsername) {
    case 1:
      qa = "wrong input";
      break;

    case 2:
      qa = "letter start not num";
      break;

    case 3:
      qa = "maximun limit reached";
      break;

    default:
      qa = "";
      break;
  }

  switch (errorsLoginValues.inputedEmail) {
    case 1:
      za = "Not An Email Yet";
      break;

    default:
      za = "";
      break;
  }

  return (
    <div>
      {qa}
      <TextField
        style={{ width: "82%", paddingBottom: "30px" }}
        inputProps={{ style: { fontSize: "2.5vh" } }}
        InputLabelProps={{ style: { fontSize: "1.8vh" } }}
        label="name"
        name="inputedUsername"
        variant="filled"
        type="text"
        onChange={updateLoginvalues}
        value={rawLoginValues.inputedUsername}
      />
      <TextField
        style={{ width: "82%", paddingBottom: "30px" }}
        inputProps={{ style: { fontSize: "2.5vh" } }}
        InputLabelProps={{ style: { fontSize: "1.8vh" } }}
        label="password"
        name="inputedPassword"
        variant="filled"
        type="password"
        onChange={updateLoginvalues}
        value={rawLoginValues.inputedPassword}
      />
      {za}
      <TextField
        style={{ width: "82%", paddingBottom: "30px" }}
        inputProps={{ style: { fontSize: "2.5vh" } }}
        InputLabelProps={{ style: { fontSize: "1.8vh" } }}
        label="email"
        name="inputedEmail"
        variant="filled"
        type="email"
        onChange={updateLoginvalues}
        value={rawLoginValues.inputedEmail}
      />
      <button onMouseDown={onSubmit}>SUBMIT</button>
    </div>
  );
}
