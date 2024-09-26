import express from "express";
import session from "express-session";
import { auth } from "./middlewares/auth.js";

const app = express();

// Express Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/session", (req, res) => {
  if (req.session.contador) {
    req.session.contador++;
    return res.json({ contador: req.session.contador });
  }

  req.session.contador = 1;
  return res.json({
    contador: req.session.contador,
    message: "Session iniciada",
  });
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;

  if (username !== "emipe" || password !== "1234") {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  req.session.user = username;
  req.session.admin = true;
  return res.json({ message: "Sesión iniciada" });
});

app.get("/admin", auth, (req, res) => {
  return res.json({ admin: req.session.admin, data: "Información privada" });
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
