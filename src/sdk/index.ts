/*
 * Module entrypoint.
 *
 * Rename "knowledgebase" and types for your module.
 */

import type {
  Ominity,
  OminityModuleDefinition,
} from "@ominity/api-typescript";
import { Knowledgebase } from "./knowledgebase/index.js";

export { Knowledgebase } from "./knowledgebase/index.js";

export type KnowledgebaseModule = Knowledgebase;

export function knowledgebaseModule(): OminityModuleDefinition<
  Ominity,
  "knowledgebase",
  Knowledgebase
> {
  return {
    name: "knowledgebase",
    init(client: Ominity) {
      return new Knowledgebase(client._options);
    },
  };
}

export const KnowledgebaseModule = knowledgebaseModule();

declare module "@ominity/api-typescript" {
  interface OminityModules {
    knowledgebase: Knowledgebase;
  }
}
