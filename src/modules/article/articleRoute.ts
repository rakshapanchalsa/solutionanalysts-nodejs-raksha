// Import only what we need from express
import { Router } from "express";
import { Validator } from "./../../validate";
import { ArticleController } from "./articleController";
import { ArticleMiddleware } from "./articleMiddleware";
import { ArticleModel } from "./articleModel";
// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const articleController = new ArticleController();
const articleMiddleware = new ArticleMiddleware();
// post article API
const postArticleRoutePath = [
    v.validate(ArticleModel),
    articleController.postArticle];
router.post("/", postArticleRoutePath);

// get article content API
router.get("/:articleId", articleMiddleware.doesIsValidArticle, articleController.getArticleDetail);

// get All articles API
router.get("/", articleController.getArticles);

// Export the express.Router() instance to be used by server.ts
export const ArticleRoute: Router = router;
