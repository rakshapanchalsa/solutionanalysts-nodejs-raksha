import bcryptjs = require("bcryptjs");
import { Request, Response } from "express";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { ArticleUtils } from "./articleUtils";
export class ArticleController {
    private articleUtils: ArticleUtils = new ArticleUtils();

    public postArticle = async (req: Request, res: Response) => {
        const { nickName, content, title } = req.body;
        const articleData: Json = { nickName, content, title };
        await this.articleUtils.addArticleDetails(articleData);
        const response = ResponseBuilder.successMessage(req.t("ARTICLE_POST_SUCCESS"));
        res.status(response.code).json(response);
    }

    public getArticleDetail = async (req: Request, res: Response) => {
        const { articleId } = req.params;
        const articleDetail = await this.articleUtils.getArticleDetailById(articleId);
        const response = ResponseBuilder.data(articleDetail);
        res.status(response.code).json(response);
    }

    public getArticles = async (req: Request, res: Response) => {
        const articlesData = await this.articleUtils.getAllArticles(req.query);
        const { result, count } = articlesData;
        const response = ResponseBuilder.dataWithPaginate(result, count);
        res.status(response.code).json(response);
    }

}
