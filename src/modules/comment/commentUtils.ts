import * as sql from "jm-ez-mysql";
import { CommentTable, Tables } from "./../../config/tables";
import { Utils } from "./../../helpers/utils";
export class CommentUtils {

  /** 
   * this function should be post articles comments
   * @param commentDetail articles details
   */
  public async addArticleComments(commentDetail: Json) {
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

  /**
   *  this function should be get all article
   * @param articleId 
   */
  public async getAllArticleComments(articleId: number) {
    const tables = `${Tables.COMMENTS} as c
    LEFT JOIN ${Tables.COMMENTS} sc on sc.${CommentTable.COMMENTID} = c.${CommentTable.ID}`
    const selectFields = [
      `c.${CommentTable.ID} AS commentId`,
      `c.${CommentTable.NICKNAME}`,
      `c.${CommentTable.CONTENT}`,
      `c.${CommentTable.CREATED_AT}`,
      `CONCAT('[',
             IF(sc.${CommentTable.COMMENTID} != 'NULL',GROUP_CONCAT(DISTINCT
              JSON_OBJECT(
                'id', sc.${CommentTable.ID},
                'name', sc.${CommentTable.NICKNAME},
               'content', sc.${CommentTable.CONTENT},
               'createdAt', sc.${CommentTable.CREATED_AT}
            )),''),
            ']') AS subComments`
    ]
    const result = await sql.findAllWithCount(tables, [`DISTINCT c.${CommentTable.ID} `], selectFields, `c.${CommentTable.ARTICLEID} = ${articleId} `, `GROUP BY c.${CommentTable.ID}`);
    const newArray = result.result.map((data) => {
      data.subComments = data && data.subComments ? Utils.formatStringObjectsToArrayObjects(data, "subComments") : null;
      return data;
    })
    return { result: newArray, count: result.count };
  }

}
