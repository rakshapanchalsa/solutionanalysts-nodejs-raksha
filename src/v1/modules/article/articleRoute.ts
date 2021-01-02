// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { ArticleController } from "./articleController";
import { ArticleModel } from "./articleModel";
// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const articleController = new ArticleController();

// Export the express.Router() instance to be used by server.ts
export const ArticleRoute: Router = router;
