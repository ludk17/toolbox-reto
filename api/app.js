import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import filesRouter from "./routes/files.js";
import { config } from "dotenv";
config();

var app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", filesRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
