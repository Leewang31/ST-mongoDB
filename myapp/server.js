const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/build")));

const MongoClient = require("mongodb").MongoClient;

let db;
MongoClient.connect(
  "mongodb+srv://admin:qwer1234@cluster0.f7tq4ev.mongodb.net/?retryWrites=true&w=majority",
  function (e, client) {
    if (e) return console.log(e);
    db = client.db("todoApp");

    app.get("/apple", (req, res) => {
      res.send("APPLE");
    });

    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);
app.get("/data", (req, res) => {
  db.collection("post")
    .find()
    .toArray((error, result) => {
      if (error) return console.log("error");
      console.log(result);
    });
});
app.post("/add", (req, res) => {
  res.send("전송완료");
  db.collection("post").insertOne(
    { 제목: req.body.title, 날짜: req.body.date },
    (error, result) => {
      console.log("저장완료");
    }
  );
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
