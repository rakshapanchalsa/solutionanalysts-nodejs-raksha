import * as sql from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
export class ArticleUtils {
 
  /** 
   * this function should be post articles details
   * @param articleDetail articles details
   */
  public async addArticleDetails(articleDetail: Json) {
    return await sql.insert(Tables.ARTICLES, articleDetail);
  }

}
