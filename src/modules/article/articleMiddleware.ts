import { ResponseBuilder } from "../../helpers/responseBuilder";
import { ArticleUtils } from "./articleUtils";
export class ArticleMiddleware {
  private articleUtils: ArticleUtils = new ArticleUtils();
  public doesIsValidArticle = async (req, res, next) => {
    const { articleId } = req.params;
    const result = await this.articleUtils.getArticleDetailById(articleId);
    if (result) {
      next();
    } else {
      const error = ResponseBuilder.badRequest(req.t("ERR_ARTICLE_NOT_FOUND"));
      res.status(error.code).json({ error: error.error });
      return;
    }
  }
}
