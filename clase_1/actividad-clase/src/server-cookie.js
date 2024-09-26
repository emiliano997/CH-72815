import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Express Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.post("/set-user", (req, res) => {
  const { username, email } = req.body;

  res.cookie("user", email, {
    maxAge: 1000 * 5, // 5 seconds
  });

  res.redirect("/");
});

app.get("/get-cookie", (req, res) => {
  res.json({ cookie: req.cookies.user });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
