import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Utils } from "../../../helpers/utils";
import { CommentUtils } from "./commentUtils";
export class CommentMiddleware {
  private commentUtils: CommentUtils = new CommentUtils();
  public doesIsValidArticleComment = async (req, res, next) => {
    const { commentId } = req.params;
    const result = await this.commentUtils.getArticleCommentById(commentId);
    if (result) {
      next();
    } else {
      const error = ResponseBuilder.badRequest(req.t("ERR_ARTICLE_COMMENT_NOT_FOUND"));
      res.status(error.code).json({ error: error.error });
      return;
    }
  }
}
