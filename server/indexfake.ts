import { Request, Response, Application } from "express";
import express = require("express");
var app: Application = express();

const util = require("util");
const mysql = require("mysql");
app.use(express.json());

const bcrypt = require("bcrypt");

const CONNECTION_CONFIG = {
  user: "root",
  host: "localhost",
  password: "password",
  database: "loginsystem",
};

const login = ` SELECT * FROM members WHERE username =?`;
const register = `INSERT INTO members (username,password) VALUES (?,?)`;
const update = `UPDATE members SET  username = ?  WHERE username = "tanu";`;
const del = `DELETE FROM members  WHERE id = ?`;

app.get("/select", async (req: Request, res: Response): Promise<void> => {
  const username: string = "tanu";

  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const loginQuery = util.promisify(connection.query.bind(connection));

  try {
    const logindata = await loginQuery(login, [username]);

    res.json(logindata[0].username);
    connection.end();
  } catch {
    res.status(400).json("error");

    connection.end();
  }
});

app.post("/reg", async (req, res) => {
  const { username, password } = req.body;
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  bcrypt.hash(password, 10).then(async (hash: string) => {
    try {
      await execQuery(register, [username, hash]);
      console.log("success");
      res.status(200).json("good post");
      connection.end();
    } catch (err) {
      console.error(err.message);
      connection.end();
    }
  });
});

app.put("/update", async (req, res) => {
  const { username } = req.body;
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    await execQuery(update, [username]);

    res.json("we updated it , bro");
    connection.end();
  } catch {
    res.status(400).json("that shit failed bro");
    connection.end();
  }
});

app.delete("/delete/:id", async (req, res) => {
  console.log("jiiii");
  const id = req.params.id;
  console.log(id);
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    await execQuery(del, [id]);

    res.json("removed it , bro");
    connection.end();
  } catch {
    res.status(400).json("coudnt do it sorry  bro");
    connection.end();
  }
});

app.listen("3002", (): void => {
  console.log("running");
});
