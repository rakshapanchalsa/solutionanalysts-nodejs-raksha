import * as sql from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
export class CommentUtils {

  /** 
   * this function should be post articles comments
   * @param commentDetail articles details
   */
  public async addArticleComment(commentDetail: Json) {
    return await sql.insert(Tables.COMMENTS, commentDetail);
  }
}
