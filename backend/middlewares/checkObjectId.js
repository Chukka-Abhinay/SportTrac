import { isValidObjectId } from "mongoose";
export const checkObjectId = (name) => (req, res, next) => {
  if (!isValidObjectId(req.params[name])) {
    return res.status(404).json({ error: `Invalid ${name}` });
  }
  next();
};
