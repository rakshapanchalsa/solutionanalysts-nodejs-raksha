import * as sql from "jm-ez-mysql";
import { CommentTable, Tables } from "../../../config/tables";
export class CommentUtils {

  /** 
   * this function should be post articles comments
   * @param commentDetail articles details
   */
  public async addArticleComment(commentDetail: Json) {
    return await sql.insert(Tables.COMMENTS, commentDetail);
  }

  /**
  *  this function should be get article comment details
  * @param commentId 
  */
  public async getArticleCommentById(commentId: Number) {
    const selectFields = [
      `${CommentTable.ID} AS commentId`,
      `${CommentTable.CONTENT}`,
      `${CommentTable.ARTICLEID}`,
      `${CommentTable.CREATED_AT}`
    ]
    return await sql.first(Tables.COMMENTS, selectFields, `${CommentTable.ID} = ?`, commentId);
  }

}
