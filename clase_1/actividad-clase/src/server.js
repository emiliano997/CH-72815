import express from "express";
import session from "express-session";
import { auth } from "./middlewares/auth.js";
import path from "path";
import __dirname from "./dirname.js";

const app = express();

// Express Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  session({
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

// DB
const users = [
  { id: 1, username: "emipe", password: "1234", admin: true },
  { id: 2, username: "arturito", password: "1234", admin: false },
  { id: 3, username: "obiwan", password: "1234", admin: false },
  { id: 4, username: "chewie", password: "1234", admin: true },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // DB Query
  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  req.session.user = user.username;
  req.session.admin = user.admin;
  return res.json({ message: "Sesión iniciada" });
});

app.get("/admin", auth, (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../public/admin.html"));
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) return res.json({ message: "Session destruida" });
    res.json({ error });
  });
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:${5000}`);
});
