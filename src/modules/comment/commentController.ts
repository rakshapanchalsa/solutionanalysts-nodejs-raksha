import { Request, Response } from "express";
import { ResponseBuilder } from "./../../helpers/responseBuilder";
import { CommentUtils } from "./commentUtils";
export class CommentController {
    private commentUtils: CommentUtils = new CommentUtils();

    public postArticleComments = async (req: Request, res: Response) => {
        const { nickName, content, type } = req.body;
        const { articleId } = req.params;
        const commentDetail: Json = { nickName, content, type, articleId };
        await this.commentUtils.addArticleComments(commentDetail);
        const response = ResponseBuilder.successMessage(req.t("ARTICLE_COMMENT_POST_SUCCESS"));
        res.status(response.code).json(response);
    }

    public postComments = async (req: Request, res: Response) => {
        const { nickName, content, type } = req.body;
        const { commentId } = req.params;
        const commentDetail: Json = { nickName, content, type, commentId };
        await this.commentUtils.addArticleComments(commentDetail);
        const response = ResponseBuilder.successMessage(req.t("COMMENT_POST_SUCCESS"));
        res.status(response.code).json(response);
    }

    public getComments = async (req: Request, res: Response) => {
        const { articleId } = req.params;
        const commentsData = await this.commentUtils.getAllArticleComments(articleId);
        const { result, count } = commentsData;
        const response = ResponseBuilder.dataWithPaginate(result, count);
        res.status(response.code).json(response);
    }
}
