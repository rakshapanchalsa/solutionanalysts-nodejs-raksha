import * as sql from "jm-ez-mysql";
import { ArticleTable, Tables } from "./../../config/tables";
import { Utils } from "./../../helpers/utils";
export class ArticleUtils {

  /** 
   * this function should be post article details
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
      `${ArticleTable.ID} AS articleId`,
      `${ArticleTable.TITLE}`,
      `${ArticleTable.CONTENT}`,
      `${ArticleTable.CREATED_AT}`
    ]
    return await sql.first(Tables.ARTICLES, selectFields, `${ArticleTable.ID} = ?`, articleId);
  }

  /**
  * this function should be getting all article
  * @param articleId 
  */
  public async getAllArticles(filterData: any) {
    const { skip, limit, searchString } = filterData;
    const [page, pageLimit] = Utils.getPageSkipAndLimit(skip, limit);
    let condition = '';
    if (searchString) {
      condition += `(${ArticleTable.TITLE} LIKE '%${searchString}%' OR  ${ArticleTable.NICKNAME} LIKE  '%${searchString}%')`;
    }
    const selectFields = [
      `${ArticleTable.ID} AS articleId`,
      `${ArticleTable.TITLE}`,
      `${ArticleTable.CONTENT}`,
      `${ArticleTable.CREATED_AT}`
    ]
    return await sql.findAllWithCount(Tables.ARTICLES, [`DISTINCT ${ArticleTable.ID}`], selectFields, condition, ` GROUP BY ${ArticleTable.ID} ORDER BY ${ArticleTable.CREATED_AT} ASC LIMIT ? OFFSET ? `, [pageLimit, page]);
  }
}
