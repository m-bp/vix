import { groq } from "next-sanity"
import { s } from "sanity-typed-schema-builder"
import { pageType, settingsType } from "schemas"

// const parseUrl = groq`
// "url": select(
//   !defined(url) => undefined,
//   defined(url.internal)  => url.internal->slug.current,
//   defined(url.external) => url.external,
//   "Error parsing URL!"
// )
// `

const parseUrl = groq`
url {
  defined(^) => {
    ...,
    "internal": internal->slug.current,
  },
}
`

const resolvedUrls = groq`
  content[] {
    ...,
    content[] {
      ...,

      // DynamicColumns
      ${parseUrl},

      // CardGroup
      // CTACardGroup
      // FeatureList
      // Pricing
      cta {
        ...,
        ${parseUrl}
      },

      // Columns
      content[] {
        ...,
        ${parseUrl}
      },
    },

    // CTABanner
    cta[] {
      ...,
      ${parseUrl}
    },
  }
`

const resolveParents = groq`
  "slug": slug.current,
  parent-> {
    title,
    "slug": slug.current,
    parent-> {
      title,
      "slug": slug.current,
      parent-> {
        title,
        "slug": slug.current,
        parent-> {
          title,
          "slug": slug.current,
        },
      },
    },
  },
  `

const pageFields = groq`
  ...,
  ${resolvedUrls},
  ${resolveParents}
`

export const settingsQuery = groq`
  *[_type == "settings" && locale == $locale][0] {
    ...,
    headerLinks[] {
      ...,
      ${parseUrl},
      dropdown {
        ...,
        columns[] {
          ...,
          items[] {
            ...,
            ${parseUrl},
          }
        },
        bottomLink[] {
          ...,
          ${parseUrl},
        }
      }
    },
    footerColumns[] {
      ...,
      content[] {
        ...,
        ${parseUrl},
      }
    },
    footerBottomLinks[] {
      ...,
      ${parseUrl},
    },
  }
`

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug && locale == $locale][0] {
    ${pageFields}

    // Get the translations metadata
    // And resolve the value field in each array item
    // "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    //   title,
    //   slug,
    //   language
    // },
  }
`

export const pageSlugsQuery = groq`
  *[_type == "page" && locale == $locale]{
    "slug": slug.current,
    "parent": parent->slug.current,
  }
`

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ${pageFields}
  }
`

export const pageMetaByIdQuery = groq`
  *[_type == "page" && _id == $id][0] {
    parent,
    slug
  }
`

export const pageWithSlugQuery = groq`
  count(
    *[
      _type == "page" &&
      _id != $self &&
      slug.current == $slug &&
      locale == $locale &&
      !(_id in path("drafts.**"))
    ]
  )
`

export const anyBySlugQuery = groq`
  *[slug.current == $slug][0] {
    "slug": slug.current,
  }
`

const testQuery = groq`
*[slug.current == 'pricing'][0] {
  ...,
  content[] {
    ...,
    content[] {
      ...,

      // DynamicColumns
      "url": select(
        !defined(url) => undefined,
        defined(url.internal)  => url.internal->slug.current,
        defined(url.external) => url.external,
        "Error parsing URL!"
      ),

      // CardGroup
      // CTACardGroup
      // FeatureList
      // Pricing
      cta {
        ...,
        "url": select(
          !defined(url) => undefined,
          defined(url.internal)  => url.internal->slug.current,
          defined(url.external) => url.external,
          "Error parsing URL!"
        )
      },

      // Columns
      content[] {
        ...,
        "url": select(
          !defined(url) => undefined,
          defined(url.internal)  => url.internal->slug.current,
          defined(url.external) => url.external,
          "Error parsing URL!"
        )
      },
    },

    // CTABanner
    cta[] {
      ...,
      url {
        defined(^) => {
          ...,
          "internal": internal->slug.current,
        },
      }
      // "url": select(
      //   !defined(url) => undefined,
      //   defined(url.internal)  => '/' + 'es-ES' + '/' + url.internal->slug.current,
      //   defined(url.external) => url.external,
      //   "Error parsing URL!"
      // )
    },
  },
  "slug": slug.current,
  parent-> {
    title,
    "slug": slug.current,
    parent-> {
      title,
      "slug": slug.current,
      parent-> {
        title,
        "slug": slug.current,
        parent-> {
          title,
          "slug": slug.current,
        },
      },
    },
  },
}
`

export type Page = s.resolved<typeof pageType>
export type Settings = s.infer<typeof settingsType>
