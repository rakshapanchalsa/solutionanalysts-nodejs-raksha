import * as sql from "jm-ez-mysql";
import { ArticleTable, Tables } from "../../../config/tables";
export class ArticleUtils {

  /** 
   * this function should be post articles details
   * @param articleDetail articles details
   */
  public async addArticleDetails(articleDetail: Json) {
    return await sql.insert(Tables.ARTICLES, articleDetail);
  }

  /**
   *  this function should be get article content details
   * @param articleId 
   */
  public async getArticleDetailById(articleId: Number) {
    const selectFields = [
      `${ArticleTable.ID}`,
      `${ArticleTable.TITLE}`,
      `${ArticleTable.CONTENT}`,
      `${ArticleTable.CREATED_AT}`
    ]
    return await sql.first(Tables.ARTICLES, selectFields, `${ArticleTable.ID} = ?`, articleId);
  }

}
