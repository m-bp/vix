/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

import { definePlugin, type DocumentDefinition } from "sanity"
import { type StructureResolver } from "sanity/desk"

export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: "settings",
    document: {
      // Hide 'Settings' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === "global") {
          return prev.filter(templateItem => templateItem.templateId !== type)
        }
        return prev
      },
      // Removes the "duplicate" action on the "settings" singleton
      actions: (prev, { schemaType }) => {
        if (schemaType === type) {
          return prev.filter(({ action }) => action !== "duplicate")
        }
        return prev
      },
    },
  }
})

// The StructureResolver is how we're changing the DeskTool structure to linking to a single "Settings" document, instead of rendering "settings" in a list
// like how "Post" and "Author" is handled.
export const settingsStructure = (
  typeDef: DocumentDefinition
): StructureResolver => {
  return S => {
    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      listItem =>
        ![
          // typeDef.name,
          "post",
          "author",
          "page",
          "translation.metadata",
        ].includes(listItem.getId())
    )

    return S.list()
      .title("Content")
      .items([
        ...["es-ES", "en-US"].map(locale =>
          S.listItem()
            .title(`Pages (${locale})`)
            .child(
              S.documentList()
                .title("Pages")
                .filter('_type == "page" && locale == $locale')
                .params({ locale })
                .defaultOrdering([{ field: "title", direction: "asc" }])
            )
        ),
        // In case there's pages with no locale
        S.listItem()
          .title(`Pages (other)`)
          .child(
            S.documentList()
              .title("Pages")
              .filter(
                '_type == "page" && locale != "en-US" && locale != "es-ES"'
              )
              .defaultOrdering([{ field: "title", direction: "asc" }])
          ),
        // S.listItem()
        //   .title('Blog')
        //   .child(
        //     S.list()
        //       .title('Blog')
        //       .items([
        //         ...S.documentTypeListItems().filter((x) =>
        //           ['post', 'author'].includes(x.getId())
        //         ),
        //       ])
        //   ),
        ...defaultListItems,
        S.divider(),
        //S.documentTypeListItem('translation.metadata'),
      ])
  }
}
