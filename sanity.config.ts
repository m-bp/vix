/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { colorInput } from "@sanity/color-input"
import { documentI18n } from "@sanity/document-internationalization"
import { visionTool } from "@sanity/vision"
import { apiVersion, dataset, previewSecretId, projectId } from "lib/sanity.api"
import { previewDocumentNode } from "plugins/previewPane"
import { productionUrl } from "plugins/productionUrl"
import { settingsPlugin, settingsStructure } from "plugins/settings"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash"
import { pageType, schemas, settingsSchema } from "schemas"

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title,
  // @ts-ignore
  schema: { types: schemas },
  plugins: [
    deskTool({
      structure: settingsStructure(settingsSchema),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),

    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settingsSchema.name }),

    // Add the "Open preview" action
    productionUrl({
      apiVersion,
      previewSecretId,
      types: [settingsSchema.name, pageType.name],
    }),

    // Add an image asset source for Unsplash
    unsplashImageAsset(),

    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),

    // Multi language support
    documentI18n({
      languages: [
        { id: "es", title: "Español" },
        { id: "en", title: "Inglés" },
      ],
      // schemaTypes: ['page', 'settings'],
      // fieldNames: 'locale',
      // bulkPublish: false,
    }),
    colorInput(),
  ],
})
