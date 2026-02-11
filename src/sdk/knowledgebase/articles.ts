/*
 * Knowledgebase articles SDK.
 */

import { ClientSDK, RequestOptions } from "@ominity/api-typescript/lib/sdks";
import { unwrapAsync } from "@ominity/api-typescript/types/fp";
import * as operations from "../../models/operations/index.js";
import { articlesList } from "../../funcs/knowledgebase/articlesList.js";
import { articlesGet } from "../../funcs/knowledgebase/articlesGet.js";

export class Articles extends ClientSDK {
    async list(
        request?: operations.ListArticlesRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListArticlesResponse> {
        return unwrapAsync(articlesList(
            this,
            request,
            options,
        ));
    }

    async get(
        request: operations.GetArticleRequest,
        options?: RequestOptions,
    ): Promise<operations.GetArticleResponse> {
        return unwrapAsync(articlesGet(
            this,
            request,
            options,
        ));
    }
}
