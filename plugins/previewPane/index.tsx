// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import PagePreviewPane from "plugins/previewPane/PagePreviewPane"
import { DefaultDocumentNodeResolver } from "sanity/desk"
import DocumentsPane from "sanity-plugin-documents-pane"
import { pageType } from "schemas"

import AuthorAvatarPreviewPane from "./AuthorAvatarPreviewPane"
import PostPreviewPane from "./PostPreviewPane"

export const previewDocumentNode = ({
  apiVersion,
  previewSecretId,
}: {
  apiVersion: string
  previewSecretId: `${string}.${string}`
}): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    switch (schemaType) {
      // case authorType.name:
      //   return S.document().views([
      //     S.view.form(),
      //     S.view
      //       .component(({ document }) => (
      //         <AuthorAvatarPreviewPane
      //           name={document.displayed.name as any}
      //           picture={document.displayed.picture as any}
      //         />
      //       ))
      //       .title('Preview'),
      //   ])

      // case postType.name:
      //   return S.document().views([
      //     S.view.form(),
      //     S.view
      //       .component(({ document }) => (
      //         <PostPreviewPane
      //           locale={document.displayed.locale}
      //           slug={document.displayed.slug?.current}
      //           apiVersion={apiVersion}
      //           previewSecretId={previewSecretId}
      //         />
      //       ))
      //       .title('Preview'),
      //   ])

      case pageType.name:
        return S.document().views([
          S.view.form(),
          // S.view
          //   .component(DocumentsPane)
          //   .options({
          //     query: `*[parent._ref == $id]`,
          //     params: { id: '_id' },
          //   })
          //   .title('Children'),
          S.view
            .component(({ document }) => (
              // <pre>
              //   {JSON.stringify(document.displayed.locale, null, 2)}
              // </pre>
              <PagePreviewPane
                locale={document.displayed.locale}
                slug={document.displayed.slug?.current}
                apiVersion={apiVersion}
                previewSecretId={previewSecretId}
              />
            ))
            .title("Preview"),
        ])

      default:
        return null
    }
  }
}
