/*
 * Knowledgebase Articles operations.
 */

import * as z from "zod/v4";
import {
    KnowledgebaseArticle,
    KnowledgebaseArticlesListResponse,
} from "../knowledgebase/article.js";

export type ArticlesListParams = {
    page?: number | undefined;
    limit?: number | undefined;
    include?: string | string[] | undefined;
    filter?: Record<string, unknown> | string | undefined;
    sort?: string | string[] | undefined;
};

export type ArticleGetParams = {
    include?: string | string[] | undefined;
};

export type ListArticlesRequest = ArticlesListParams;
export type ListArticlesResponse = KnowledgebaseArticlesListResponse;

export type GetArticleRequest = ArticleGetParams & {
    id: number | string;
};

export type GetArticleResponse = KnowledgebaseArticle;

/** @internal */
export const ArticlesListParams$outboundSchema: z.ZodType<ArticlesListParams> =
    z
        .object({
            page: z.number().int().optional(),
            limit: z.number().int().optional(),
            include: z.union([z.string(), z.array(z.string())]).optional(),
            filter: z.union([z.string(), z.record(z.string(), z.any())]).optional(),
            sort: z.union([z.string(), z.array(z.string())]).optional(),
        })
        .loose();

/** @internal */
export const ArticleGetParams$outboundSchema: z.ZodType<ArticleGetParams> = z
    .object({
        include: z.union([z.string(), z.array(z.string())]).optional(),
    })
    .loose();

/** @internal */
export const GetArticleRequest$outboundSchema: z.ZodType<GetArticleRequest> = z
    .object({
        id: z.union([z.string(), z.number()]),
        include: z.union([z.string(), z.array(z.string())]).optional(),
    })
    .loose();
