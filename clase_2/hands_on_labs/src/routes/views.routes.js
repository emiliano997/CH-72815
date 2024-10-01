import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  const isSession = req.session.user ? true : false;

  res.render("index", {
    title: "Inicio",
    isSession,
  });
});

router.get("/login", (req, res) => {
  const isSession = req.session.user ? true : false;

  if (isSession) return res.redirect("/profile");

  res.render("login", {
    title: "Login",
    isSession,
  });
});

router.get("/register", (req, res) => {
  const isSession = req.session.user ? true : false;

  if (isSession) return res.redirect("/profile");

  res.render("register", {
    title: "Registro",
    isSession,
  });
});

router.get("/profile", auth, (req, res) => {
  res.render("profile", {
    title: "Perfil",
    user: req.session.user,
  });
});

export default router;
