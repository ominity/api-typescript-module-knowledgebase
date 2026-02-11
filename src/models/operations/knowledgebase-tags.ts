/*
 * Knowledgebase tags operations.
 */

import * as z from "zod/v4";
import {
    KnowledgebaseTag,
    KnowledgebaseTag$inboundSchema,
    KnowledgebaseTagsListResponse,
    KnowledgebaseTagsListResponse$inboundSchema,
} from "../knowledgebase/tag.js";

export type ListTagsRequest = {
    page?: number | undefined;
    limit?: number | undefined;
    include?: string | string[] | undefined;
    filter?: Record<string, unknown> | string | undefined;
    sort?: string | string[] | undefined;
};

export type ListTagsResponse = KnowledgebaseTagsListResponse;

export type GetTagRequest = {
    id: number;
    include?: string | string[] | undefined;
};

export type GetTagResponse = KnowledgebaseTag;

/** @internal */
export const ListTagsRequest$outboundSchema: z.ZodType<ListTagsRequest> = z
    .object({
        page: z.number().int().optional(),
        limit: z.number().int().optional(),
        include: z.union([z.string(), z.array(z.string())]).optional(),
        filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
        sort: z.union([z.string(), z.array(z.string())]).optional(),
    })
    .loose();

/** @internal */
export const ListTagsResponse$inboundSchema: z.ZodType<ListTagsResponse> = z.lazy(() => KnowledgebaseTagsListResponse$inboundSchema);

/** @internal */
export const GetTagRequest$outboundSchema: z.ZodType<GetTagRequest> = z
    .object({
        id: z.number().int(),
        include: z.union([z.string(), z.array(z.string())]).optional(),
    })
    .loose();

/** @internal */
export const GetTagResponse$inboundSchema: z.ZodType<GetTagResponse> = z.lazy(() => KnowledgebaseTag$inboundSchema);
