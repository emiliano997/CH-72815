import { UserController } from "../controllers/user.controller.js";
import { Router } from "express";
import { idCheck } from "../middlewares/id-check.middleware.js";

const userRouter = Router();

userRouter.get("/", UserController.getAll);
userRouter.post("/", UserController.create);
userRouter.get("/:id", idCheck, UserController.getById);
userRouter.put("/:id", idCheck, UserController.update);
userRouter.delete("/:id", idCheck, UserController.delete);

export { userRouter };
