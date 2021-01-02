import bcryptjs = require("bcryptjs");
import { Request, Response } from "express";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Utils } from "../../../helpers/utils";
import { ArticleUtils } from "./articleUtils";
export class ArticleController {
    private articleUtils: ArticleUtils = new ArticleUtils();

}
