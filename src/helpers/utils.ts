import { Constants } from "../config/constants";

export class Utils {

    /**
     * 
     * @param page  per page
     * @param limit limit data of page
     */
    public static getPageSkipAndLimit(page: string, limit: string) {
        const limits = limit ? +limit : Constants.DEFAULT_LIMIT; // for paginate records
        const pages = page ? +page : Constants.DEFAULT_PAGE;
        return [pages > 1 ? (pages - 1) * limits : 0, limits];
    }
}
