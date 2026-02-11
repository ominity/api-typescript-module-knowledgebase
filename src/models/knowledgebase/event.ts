/*
 * Knowledgebase event model.
 *
 * Rename this resource and fields for your real module.
 */

import * as z from "zod/v4";
import { remap as remap$ } from "@ominity/api-typescript/lib/primitives";
import {
  HalLinks,
  HalLinks$inboundSchema,
  buildPaginated,
  Paginated,
} from "@ominity/api-typescript/models";

export type KnowledgebaseEvent = {
  resource: string;
  id: number | string;
  title: string;
  startsAt: string;
  endsAt?: string | null | undefined;
  links?: HalLinks;
};

/** @internal */
export const KnowledgebaseEvent$inboundSchema: z.ZodType<KnowledgebaseEvent> = z.object({
  resource: z.string(),
  id: z.union([z.number().int(), z.string()]),
  title: z.string(),
  startsAt: z.string(),
  endsAt: z.string().nullable().optional(),
  _links: HalLinks$inboundSchema.optional(),
})
  .loose()
  .transform((v) => remap$(v, { _links: "links" }) as KnowledgebaseEvent);

export type KnowledgebaseEventsListResponse = Paginated<KnowledgebaseEvent>;

/** @internal */
export const KnowledgebaseEventsListResponse$inboundSchema: z.ZodType<
  KnowledgebaseEventsListResponse
> = z.object({
  _embedded: z.object({
    events: z.array(KnowledgebaseEvent$inboundSchema),
  }),
  count: z.number(),
  _links: HalLinks$inboundSchema.optional(),
}).transform((v) => buildPaginated(v._embedded.events, v.count, v._links));
