const util = require("util");
const mysql = require("mysql");
import express = require("express");
const cookieParser = require("cookie-parser");

var app: Application = express();
app.use(cookieParser());
app.use(express.json());

const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("./jwt");

var cors = require("cors");
app.use(cors());

import { Request, Response, Application } from "express";
const CONNECTION_CONFIG = {
  user: "root",
  host: "localhost",
  password: "password",
  database: "superdata",
};

const register = `INSERT INTO members (username,password,email,color,status,notification,tutorial,date) VALUES (?,?,?,?,?,?,?,?)`;

const login = ` SELECT username,id,password FROM members WHERE username =?`;

app.post("/logging", async (req, res) => {
  const { values } = req.body;
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const loginQuery = util.promisify(connection.query.bind(connection));

  try {
    const logindata = await loginQuery(login, [values.inputedUsername]);

    const DatabasePassword = logindata[0].password;

    const PasswordMatchResult = await bcrypt.compare(
      values.inputedPassword,
      DatabasePassword
    );

    if (!PasswordMatchResult) {
      res.send({ message: "Wrong, Password and Username combination" });
      connection.end();
    } else {
      const days30inseconds = 60 * 60 * 24 * 30 * 1000;
      const accessToken = createTokens(logindata);

      ///setting the cookie
      res.cookie("access-token", accessToken, {
        maxAge: days30inseconds,
        httpOnly: true,
      });
      res.status(200).json("logged in");
      connection.end();
    }
  } catch {
    res.send({ message: "Wrong username" });
    res.status(400).json("error");

    connection.end();
  }
});

app.post("/registration", async (req, res) => {
  const { values } = req.body;
  const color: string = "#cccccc";
  var currentTime = new Date();
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  bcrypt.hash(values.inputedPassword, 10).then(async (hash: string) => {
    try {
      await execQuery(register, [
        values.inputedUsername,
        hash,
        values.inputedEmail,
        color,
        1,
        0,
        1,
        currentTime,
      ]);
      //console.log("success");
      res.status(200).json("good post");
      connection.end();
    } catch (err) {
      console.error(err.code);
      if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
        res.send({ message: "username not unique" });
      } else {
        console.error(err.message);
      }
      connection.end();
    }
  });
});

app.listen("3001", (): void => {
  console.log("runner");
});
