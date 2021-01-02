import { IsEnum, IsNotEmpty, MaxLength, Validate } from "class-validator";
import { Constants } from "../../../config/constants";
import { Enums } from "../../../config/Enum";
import { Model } from "../../../model";

export class ArticleCommentModel extends Model {

    @MaxLength(Constants.NICKNAME_MAX_LENGTH, { message: "ERR_MAX_LENGTH_NAME" })
    @IsNotEmpty({ message: "ERR_NAME_REQUIRED" })
    public nickName: string;

    @IsNotEmpty({ message: "ERR_CONTENT_REQUIRED" })
    public content: string;

    @IsEnum(Enums.COMMENT_TYPE, { message: "ERR_COMMENT_TYPE_INVALID" })
    @IsNotEmpty({ message: "ERR_COMMENT_TYPE_REQUIRED" })
    public type: string;

    constructor(body: any) {
        super();
        this.nickName = body.nickName;
        this.content = body.content;
        this.type = body.type;
    }

}

