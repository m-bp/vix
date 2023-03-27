import Component, {
  getPagePaths,
  getPageStaticProps,
  type StaticProps,
} from "lib/pageHelpers"

const locale = "es"

export const getStaticProps = getPageStaticProps(locale)
export const getStaticPaths = getPagePaths(locale)

export default function Index(props: StaticProps) {
  return <Component {...props} locale={locale} />
}
