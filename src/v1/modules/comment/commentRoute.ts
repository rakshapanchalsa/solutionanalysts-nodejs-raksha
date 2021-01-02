// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { ArticleMiddleware } from "../article/articleMiddleware";
import { CommentController } from "./commentController";
import { ArticleCommentModel } from "./commentModel";
// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const commentController = new CommentController();
const articleMiddleware = new ArticleMiddleware();

// post comment on article API
const postCommentOnArticleRoutePath = [
    v.validate(ArticleCommentModel),
    articleMiddleware.doesIsValidArticle,
    commentController.postArticleComments];
router.post("/:articleId", postCommentOnArticleRoutePath);

// Export the express.Router() instance to be used by server.ts
export const CommentRoute: Router = router;
