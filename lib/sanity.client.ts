import "server-only"

import { apiVersion, dataset, projectId, useCdn } from "lib/sanity.api"
import {
  type Page,
  pageBySlugQuery,
  type Settings,
  settingsQuery,
} from "lib/sanity.queries"
import { createClient } from "next-sanity"

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null

export async function getSettings(): Promise<Settings> {
  if (client) {
    return (await client.fetch(settingsQuery)) || {}
  }
  return {}
}

export async function getPageBySlug(
  slug: string,
  locale: string
): Promise<Page> {
  if (client) {
    return (
      (await client.fetch(pageBySlugQuery, { slug, locale })) || ({} as any)
    )
  }
  return {} as any
}
