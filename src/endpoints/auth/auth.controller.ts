import { Request, Response } from "express";

export default class ContactController {
  public login(req: Request, res: Response) {
    res.json({ YES: "yes" });
  }
}
