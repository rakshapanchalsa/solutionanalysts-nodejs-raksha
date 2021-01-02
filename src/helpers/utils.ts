import { Constants } from "../config/constants";

export class Utils {

    /**
     * @param page  per page
     * @param limit limit data of page
     */
    public static getPageSkipAndLimit(page: string, limit: string) {
        const limits = limit ? +limit : Constants.DEFAULT_LIMIT; // for paginate records
        const pages = page ? +page : Constants.DEFAULT_PAGE;
        return [pages > 1 ? (pages - 1) * limits : 0, limits];
    }

    // convert string object to array of objects
    public static formatStringObjectsToArrayObjects = (result: any, type: string) => {
        if (result[type]) {
            result[type] = JSON.parse(result[type]);
        } else {
            result[type] = [];
        }
        return result[type];
    }
}
