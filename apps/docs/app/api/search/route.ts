/**
 * S1: Orama static search index route.
 *
 * With output:'export', Next.js does not run route handlers at request time.
 * Fumadocs generates the search index as a static JSON file during `next build`.
 * This route is included for dev server search (hot-reload) but is excluded
 * from the static export via the export config below.
 *
 * For static export search: fumadocs-ui's <SearchDialog> fetches /api/search
 * in dev; for the static build it reads the pre-generated index from
 * /_next/static/... automatically — no additional config required.
 */
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source);

// Tell Next.js static export to skip this route handler
export const dynamic = 'force-dynamic';
