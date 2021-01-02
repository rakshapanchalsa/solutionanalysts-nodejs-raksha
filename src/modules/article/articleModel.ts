import { IsNotEmpty, MaxLength, Validate } from "class-validator";
import { Constants } from "./../../config/constants";
import { Model } from "./../../model";

export class ArticleModel extends Model {

    @MaxLength(Constants.NICKNAME_MAX_LENGTH, { message: "ERR_MAX_LENGTH_NAME" })
    @IsNotEmpty({ message: "ERR_NAME_REQUIRED" })
    public nickName: string;

    @IsNotEmpty({ message: "ERR_TITLE_REQUIRED" })
    public title: string;

    @IsNotEmpty({ message: "ERR_CONTENT_REQUIRED" })
    public content: string;

    constructor(body: any) {
        super();
        this.nickName = body.nickName;
        this.title = body.title;
        this.content = body.content;
    }

}

