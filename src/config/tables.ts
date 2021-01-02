export class Tables {
  public static readonly ARTICLES = "articles";
  public static readonly COMMENTS = "comments";
}

export enum ArticleTable {
  ID = 'id',
  TITLE = 'title',
  NICKNAME = 'nickName',
  CONTENT = 'content',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

export enum CommentTable {
  ID = 'id',
  TITLE = 'title',
  NICKNAME = 'nickName',
  CONTENT = 'content',
  ARTICLEID = 'articleId',
  COMMENTID = 'commentId',
  TYPE = 'type',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}