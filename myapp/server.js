const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/build")));

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

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
      res.send(result);
    });
});
app.post("/add", (req, res) => {
  let postCount;
  res.send("전송완료");
  db.collection("counter").findOne({ name: "postCount" }, (error, result) => {
    postCount = result.totalPost;
    db.collection("post").insertOne(
      { _id: postCount + 1, 제목: req.body.title, 날짜: req.body.date },
      (error, result) => {
        console.log("저장완료");

        //데이터 수정
        db.collection("counter").updateOne(
          { name: "postCount" },
          //몽고 db operator $set:값을 완전 변경 $inc:값을 더 함
          {
            $inc: {
              totalPost: 1,
            },
          }
        );
      }
    );
  });
});
app.delete("/delete/:id", (req, res) => {
  db.collection("post").deleteOne(
    { _id: parseInt(req.params.id) },
    (error, result) => {
      console.log("삭제완료");
    }
  );
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
