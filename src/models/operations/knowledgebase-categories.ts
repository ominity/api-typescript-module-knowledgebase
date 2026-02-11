/*
 * Knowledgebase categories operations.
 */

import * as z from "zod/v4";
import {
    KnowledgebaseCategory,
    KnowledgebaseCategory$inboundSchema,
    KnowledgebaseCategoriesListResponse,
    KnowledgebaseCategoriesListResponse$inboundSchema,
} from "../knowledgebase/category.js";

export type ListCategoriesRequest = {
    page?: number | undefined;
    limit?: number | undefined;
    include?: string | string[] | undefined;
    filter?: Record<string, unknown> | string | undefined;
    sort?: string | string[] | undefined;
};

export type ListCategoriesResponse = KnowledgebaseCategoriesListResponse;

export type GetCategoryRequest = {
    id: number;
    include?: string | string[] | undefined;
};

export type GetCategoryResponse = KnowledgebaseCategory;

/** @internal */
export const ListCategoriesRequest$outboundSchema: z.ZodType<ListCategoriesRequest> = z
    .object({
        page: z.number().int().optional(),
        limit: z.number().int().optional(),
        include: z.union([z.string(), z.array(z.string())]).optional(),
        filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
        sort: z.union([z.string(), z.array(z.string())]).optional(),
    })
    .loose();

/** @internal */
export const ListCategoriesResponse$inboundSchema: z.ZodType<ListCategoriesResponse> = z.lazy(() => KnowledgebaseCategoriesListResponse$inboundSchema);

/** @internal */
export const GetCategoryRequest$outboundSchema: z.ZodType<GetCategoryRequest> = z
    .object({
        id: z.number().int(),
        include: z.union([z.string(), z.array(z.string())]).optional(),
    })
    .loose();

/** @internal */
export const GetCategoryResponse$inboundSchema: z.ZodType<GetCategoryResponse> = z.lazy(() => KnowledgebaseCategory$inboundSchema);
