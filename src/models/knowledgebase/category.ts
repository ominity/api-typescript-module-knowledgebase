/*
 * Knowledgebase Category model.
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

export type KnowledgebaseCategory = {
    resource: string;
    id: number;
    name: string;
    slug: string;
    description: string;
    icon?: string | null | undefined;
    isVisible: boolean;
    parentId?: number | null | undefined;
    order: number;
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
    routes?: Record<string, KnowledgebaseRoute> | undefined;
    articlesCount?: number | null | undefined;
    childrenCount?: number | null | undefined;
    customFields?: any[] | undefined;
    updatedAt: string;
    createdAt: string;
    links?: HalLinks | undefined;
    children?: KnowledgebaseCategory[] | undefined;
};

/** @internal */
export const KnowledgebaseCategory$inboundSchema: z.ZodType<
    KnowledgebaseCategory
> = z
    .object({
        resource: z.string(),
        id: z.number().int(),
        name: z.string(),
        slug: z.string(),
        description: z.string(),
        icon: z.string().nullable().optional(),
        isVisible: z.boolean(),
        parentId: z.number().int().nullable().optional(),
        order: z.number().int(),
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
        routes: z.record(z.string(), KnowledgebaseRoute$inboundSchema).optional(),
        articlesCount: z.number().int().nullable().optional(),
        childrenCount: z.number().int().nullable().optional(),
        customFields: z.array(z.any()).optional(),
        updatedAt: z.string(),
        createdAt: z.string(),
        _links: HalLinks$inboundSchema.optional(),
        _embedded: z
            .object({
                children: z
                    .array(z.lazy(() => KnowledgebaseCategory$inboundSchema))
                    .optional(),
            })
            .optional(),
    })
    .loose()
    .transform((v) => {
        return remap$(v, {
            _links: "links",
            "_embedded.children": "children",
        }) as KnowledgebaseCategory;
    });

export type KnowledgebaseCategoriesListResponse =
    Paginated<KnowledgebaseCategory>;

/** @internal */
export const KnowledgebaseCategoriesListResponse$inboundSchema: z.ZodType<
    KnowledgebaseCategoriesListResponse
> = z
    .object({
        _embedded: z.object({
            knowledgebase_categories: z.array(
                z.lazy(() => KnowledgebaseCategory$inboundSchema),
            ),
        }),
        count: z.number().int(),
        _links: HalLinks$inboundSchema.optional(),
    })
    .transform((v) =>
        buildPaginated(v._embedded.knowledgebase_categories, v.count, v._links),
    );
