import { NextFunction, Request, Response } from "express";

export const contentTyé = (req: Request, res: Response, next: NextFunction) => {
  res.type("json");
  next();
};
