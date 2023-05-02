require("dotenv").config();
const { PORT, SESSION_SECRET, SESSION_NAME } = process.env;
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./configs/mongoose");
const Mongostore = require("connect-mongo")(session);
const projectRoute = require("./routes/api/v1/project-route");
const issueRoute = require("./routes/api/v1/issue-route");
const app = express();

// +++++++++++++ MIDDLEWARES ++++++++++++++//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    store: new Mongostore({
      mongooseConnection: db,
      autoRemove: false,
    }),
    cookie: {
      maxAge: 360000,
    },
  })
);

app.use("/api/v1", projectRoute);
app.use("/api/v1", issueRoute);
// +++++++++++++++++++++++++++++++++++++++++++ //
app.listen(PORT, () => {
  console.log(`Server Started at PORT http://localhost:${PORT}`);
});
