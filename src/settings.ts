import express, { Request, Response } from "express";

// import bodyParser from "body-parser";

export const app = express();

app.get("/", (req: Request, res: Response) => {
  let helloMessage = "version 1.00!!!";
  res.send(helloMessage);
});
