/*
 * Knowledgebase Route model.
 */

import * as z from "zod/v4";

export type KnowledgebaseRoute = {
    resource: string;
    name: string;
    locale: string;
    parameters: Record<string, string | number>;
};

/** @internal */
export const KnowledgebaseRoute$inboundSchema: z.ZodType<KnowledgebaseRoute> = z
    .object({
        resource: z.string(),
        name: z.string(),
        locale: z.string(),
        parameters: z.record(z.string(), z.union([z.string(), z.number()])),
    })
    .loose();
