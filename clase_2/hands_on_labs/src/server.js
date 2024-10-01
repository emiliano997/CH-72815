import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import path from "path";
import __dirname from "./dirname.js";

import sessionRoutes from "./routes/session.routes.js";
import viewsRoutes from "./routes/views.routes.js";

const app = express();

// Express Config
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Handlebars Config
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// MongoDB Storage
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://test_admin:1234@curso-nodejs.de1bv.gcp.mongodb.net/CH-72815",
      ttl: 15,
    }),
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);

// Mongoose Config
mongoose
  .connect("mongodb://localhost:27017/CH-72815")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Endpoints
app.use("/api/sessions", sessionRoutes);
app.use("/", viewsRoutes);

app.listen(5000, () => {
  console.log(`Server running on http://localhost:${5000}`);
});
