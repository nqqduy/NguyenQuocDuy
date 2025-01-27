import { Response } from "express";

const successResponse = (data: any, res: Response, message = "Successfully") => {
  res.status(200).json({ data, message });
};

export { successResponse };
