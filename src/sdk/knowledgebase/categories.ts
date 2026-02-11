/*
 * Knowledgebase categories SDK.
 */

import { ClientSDK, RequestOptions } from "@ominity/api-typescript/lib/sdks";
import { unwrapAsync } from "@ominity/api-typescript/types/fp";
import * as operations from "../../models/operations/index.js";
import { categoriesList } from "../../funcs/knowledgebase/categoriesList.js";
import { categoriesGet } from "../../funcs/knowledgebase/categoriesGet.js";

export class Categories extends ClientSDK {
    async list(
        request?: operations.ListCategoriesRequest | undefined,
        options?: RequestOptions,
    ): Promise<operations.ListCategoriesResponse> {
        return unwrapAsync(categoriesList(
            this,
            request,
            options,
        ));
    }

    async get(
        request: operations.GetCategoryRequest,
        options?: RequestOptions,
    ): Promise<operations.GetCategoryResponse> {
        return unwrapAsync(categoriesGet(
            this,
            request,
            options,
        ));
    }
}
