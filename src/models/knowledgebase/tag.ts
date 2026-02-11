/*
 * Knowledgebase Tag model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "@ominity/api-typescript/lib/primitives";
import {
    HalLinks,
    HalLinks$inboundSchema,
    Paginated,
    buildPaginated,
} from "@ominity/api-typescript/models";
import {
    KnowledgebaseRoute,
    KnowledgebaseRoute$inboundSchema,
} from "./route.js";
import {
    KnowledgebaseArticle,
    KnowledgebaseArticle$inboundSchema,
} from "./article.js";

export type KnowledgebaseTag = {
    resource: string;
    id: number;
    name: string;
    slug: string;
    isVisible: boolean;
    routes?: Record<string, KnowledgebaseRoute> | undefined;
    articlesCount?: number | null | undefined;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks | undefined;
    articles?: KnowledgebaseArticle[] | undefined;
};

/** @internal */
export const KnowledgebaseTag$inboundSchema: z.ZodType<KnowledgebaseTag> = z
    .object({
        resource: z.string(),
        id: z.number().int(),
        name: z.string(),
        slug: z.string(),
        isVisible: z.boolean(),
        routes: z.record(z.string(), KnowledgebaseRoute$inboundSchema).optional(),
        articlesCount: z.number().int().nullable().optional(),
        updatedAt: z.string(),
        createdAt: z.string(),
        _links: HalLinks$inboundSchema.optional(),
        _embedded: z
            .object({
                articles: z
                    .array(z.lazy(() => KnowledgebaseArticle$inboundSchema))
                    .optional(),
            })
            .optional(),
    })
    .loose()
    .transform((v) => {
        return remap$(v, {
            _links: "links",
            "_embedded.articles": "articles",
        }) as KnowledgebaseTag;
    });

export type KnowledgebaseTagsListResponse = Paginated<KnowledgebaseTag>;

/** @internal */
export const KnowledgebaseTagsListResponse$inboundSchema: z.ZodType<
    KnowledgebaseTagsListResponse
> = z
    .object({
        _embedded: z.object({
            knowledgebase_tags: z.array(z.lazy(() => KnowledgebaseTag$inboundSchema)),
        }),
        count: z.number().int(),
        _links: HalLinks$inboundSchema.optional(),
    })
    .transform((v) =>
        buildPaginated(v._embedded.knowledgebase_tags, v.count, v._links),
    );
