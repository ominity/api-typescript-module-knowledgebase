# Ominity API Module: Knowledgebase

This is a template repo for creating a modular Ominity API package that plugs into `@ominity/api-typescript`.

## Install

```bash
npm install @ominity/api-typescript @ominity/api-module-knowledgebase
```

## Usage (example)

```ts
import { Ominity } from "@ominity/api-typescript";
import { knowledgebaseModule, KnowledgebaseModule } from "@ominity/api-module-knowledgebase";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: { apiKey: process.env["OMINITY_API_KEY"] ?? "" },
});

// Either option is supported
ominity.use(KnowledgebaseModule);
// or
ominity.use(knowledgebaseModule());

// Constructor option
const ominity2 = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: { apiKey: process.env["OMINITY_API_KEY"] ?? "" },
  modules: [knowledgebaseModule()],
});

const res = await ominity.modules.knowledgebase.events.list({ page: 1, limit: 20 });
console.log(res.items);
```

## Structure

```
src/
  funcs/
  models/
  models/operations/
  sdk/
  index.ts
```

## Development

```bash
npm run lint
npm run build
```

## Notes

- This template mirrors the core SDK architecture (models, operations, funcs, sdk).
- HAL responses are transformed; public types should not expose `_links` or `_embedded`.
- Use `zod/v4` and `.loose()` for forward compatibility.
