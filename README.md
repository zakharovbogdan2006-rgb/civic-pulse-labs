# Civica Pulse Labs

Civica is a student prototype exploring how cities could discuss visible neighbourhood design features and community spaces.

## Run locally

```bash
bun install
cp .env.example .env
bun run dev
```

The access-request feature needs the existing Supabase variables. To enable the optional image analysis, set `OPENAI_API_KEY` only in the server environment. It is never sent to the browser.

## AI image analysis

The public endpoint accepts a PNG/JPEG under 5 MB and returns structured, tentative observations about visible urban design features. It is instructed not to identify people, infer demographics or claim a location. Results need human review and are not a measurement of social connectedness. When no server key is configured, the interface clearly reports that analysis is unavailable; the Rotterdam screen remains an illustrative sample.
