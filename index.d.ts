//index.d.ts
import "express";

declare global {
  namespace Express {
    export interface Request {
      userId: string | null;
    }
  }
}
