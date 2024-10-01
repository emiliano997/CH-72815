import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";

const fileStorage = FileStore(session);
const app = express();

// Express Config
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// File Storage
// app.use(
//   session({
//     // Configuración del almacenamiento de la sesión
//     store: new fileStorage({
//       path: "./sessions",
//       ttl: 2,
//       retries: 0,
//     }),

//     // Configuración de la sesión
//     secret: "s3cr3t",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// MongoDB Storage
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "",
      ttl: 15,
    }),
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);

// Endpoints
app.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    return res.json({ counter: req.session.counter });
  }

  req.session.counter = 1;
  return res.json({ counter: req.session.counter, message: "Sesión iniciada" });
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:${5000}`);
});
