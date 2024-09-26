import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Express Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("s3cr3t"));

// Routes
// Set Cookie
app.get("/setCookie", (req, res) => {
  res.cookie("nombre", "Mister Coder", {
    maxAge: 1000 * 60 * 5, // 5 minutes
  });
  res.send("Cookie seteado");
});

// Get Cookie
app.get("/getCookie", (req, res) => {
  console.log(req.cookies);

  res.json({ cookies: req.cookies.nombre, signed: req.signedCookies });
});

// Delete Cookie
app.get("/deleteCookie", (req, res) => {
  res.clearCookie("nombre");

  res.json({ message: "Cookie borrado" });
});

// Set Cookie Signed (Firmada)
app.get("/setCookieSigned", (req, res) => {
  res.cookie("nombre-firmado", "MisterSuperSecret", {
    maxAge: 1000 * 60 * 5, // 5 minutes
    signed: true,
  });

  res.json({ message: "Cookie firmado" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
