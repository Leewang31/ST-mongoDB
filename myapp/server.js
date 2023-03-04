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
app.get("/detail/:id", (req, res) => {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    (error, result) => {
      res.send(result);
    }
  );
});
app.put("/edit/:id", (req, res) => {
  db.collection("post").updateOne(
    { _id: parseInt(req.params.id) },
    { $set: { 제목: req.body.title, 날짜: req.body.time } },
    () => {
      res.send("HI");
    }
  );
});

// 로그인 구현
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");
//
// app.use(
//   session({
//     name: "mysession",
//     secret: "비밀코드",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
//
// app.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/fail" }),
//   function (req, res) {
//     res.send("로그인 성공");
//   }
// );
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "id", //요기는 사용자가 제출한 아이디가 어디 적혔는지
//       passwordField: "pw", //요기는 사용자가 제출한 비번이 어디 적혔는지
//       session: true, //요기는 세션을 만들건지
//       passReqToCallback: false, //요기는 아이디/비번말고 다른 정보검사가 필요한지
//     },
//     function (newId, newPw, done) {
//       db.collection("login").findOne({ id: newId }, function (e, result) {
//         if (e) return done(e);
//         if (!result)
//           return done(null, false, { message: "존재하지않는 아이디요" });
//         if (newPw === result.pw) {
//           return done(null, result);
//         } else {
//           return done(null, false, { message: "비번틀렸어요" });
//         }
//       });
//     }
//   )
// );
// /*serializeUser 라는 함수가 바로 그 역할을 합니다.
// - 유저의 id 데이터를 바탕으로 세션데이터를 만들어주고
// - 그 세션데이터의 아이디를 쿠키로 만들어서 사용자의 브라우저로 보내줍니다.
// deserializeUser 라는 함수는 다음 시간에 알아보도록 합시다.
// - 얘는 이제 로그인 된 유저가 마이페이지 등을 접속했을 때 실행되는 함수입니다.*/
//
// passport.serializeUser((user, done) => {
//   return done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
//   done(null, {});
// });
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
