import { isValidObjectId } from "mongoose";

export function idCheck(req, res, next) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  next();
}
