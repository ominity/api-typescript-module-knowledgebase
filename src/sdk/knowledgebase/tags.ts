/*
 * Knowledgebase tags SDK.
 */

import { ClientSDK, RequestOptions } from "@ominity/api-typescript/lib/sdks";
import { unwrapAsync } from "@ominity/api-typescript/types/fp";
import * as operations from "../../models/operations/index.js";
import { tagsList } from "../../funcs/knowledgebase/tagsList.js";
import { tagsGet } from "../../funcs/knowledgebase/tagsGet.js";

export class Tags extends ClientSDK {
    async list(
        request?: operations.ListTagsRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListTagsResponse> {
        return unwrapAsync(tagsList(
            this,
            request,
            options,
        ));
    }

    async get(
        request: operations.GetTagRequest,
        options?: RequestOptions,
    ): Promise<operations.GetTagResponse> {
        return unwrapAsync(tagsGet(
            this,
            request,
            options,
        ));
    }
}
