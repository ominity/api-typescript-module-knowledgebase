/*
 * Knowledgebase Article model.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "@ominity/api-typescript/lib/primitives";
import {
    HalLinks,
    HalLinks$inboundSchema,
    buildPaginated,
    Paginated,
} from "@ominity/api-typescript/models";
import {
    KnowledgebaseRoute,
    KnowledgebaseRoute$inboundSchema,
} from "./route.js";
import {
    KnowledgebaseCategory,
    KnowledgebaseCategory$inboundSchema,
} from "./category.js";
import { KnowledgebaseTag, KnowledgebaseTag$inboundSchema } from "./tag.js";

export type KnowledgebaseArticle = {
    resource: string;
    id: number;
    title: string;
    slug: string;
    status: string;
    content: string;
    categoryId: number;
    authorId: number;
    meta: {
        title: string;
        description: string;
        keywords: string;
        og: {
            title: string;
            description: string;
            image: string;
        };
    };
    tags: KnowledgebaseTag[];
    searches: any[];
    visbility: string;
    order: number;
    timeToRead: number;
    routes?: Record<string, KnowledgebaseRoute> | undefined;
    customFields?: any[] | undefined;
    publishedAt?: string | null | undefined;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks | undefined;
    category?: KnowledgebaseCategory | undefined; // Embedded
};

/** @internal */
export const KnowledgebaseArticle$inboundSchema: z.ZodType<
    KnowledgebaseArticle
> = z
    .object({
        resource: z.string(),
        id: z.number().int(),
        title: z.string(),
        slug: z.string(),
        status: z.string(),
        content: z.string(),
        categoryId: z.number().int(),
        authorId: z.number().int(),
        meta: z.object({
            title: z.string(),
            description: z.string(),
            keywords: z.string(),
            og: z.object({
                title: z.string(),
                description: z.string(),
                image: z.string(),
            }),
        }),
        tags: z.array(KnowledgebaseTag$inboundSchema),
        searches: z.array(z.any()),
        visbility: z.string(),
        order: z.number().int(),
        timeToRead: z.number().int(),
        routes: z.record(z.string(), KnowledgebaseRoute$inboundSchema).optional(),
        customFields: z.array(z.any()).optional(),
        publishedAt: z.string().nullable().optional(),
        updatedAt: z.string(),
        createdAt: z.string(),
        _links: HalLinks$inboundSchema.optional(),
        _embedded: z
            .object({
                category: KnowledgebaseCategory$inboundSchema.optional(),
            })
            .optional(),
    })
    .loose()
    .transform((v) => {
        return remap$(v, {
            _links: "links",
            "_embedded.category": "category",
        }) as KnowledgebaseArticle;
    });

export type KnowledgebaseArticlesListResponse = Paginated<KnowledgebaseArticle>;

/** @internal */
export const KnowledgebaseArticlesListResponse$inboundSchema: z.ZodType<
    KnowledgebaseArticlesListResponse
> = z
    .object({
        _embedded: z.object({
            articles: z.array(KnowledgebaseArticle$inboundSchema),
        }),
        count: z.number().int(),
        _links: HalLinks$inboundSchema.optional(),
    })
    .transform((v) => buildPaginated(v._embedded.articles, v.count, v._links));
