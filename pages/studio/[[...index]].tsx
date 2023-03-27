/**
 * This route is responsible for the built-in authoring environment using Sanity Studio v3.
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import Head from "next/head"
import { NextStudio } from "next-sanity/studio"
import { NextStudioHead } from "next-sanity/studio/head"
import config from "sanity.config"

export default function StudioPage() {
  return (
    <>
      <Head>
        <NextStudioHead />
      </Head>
      <NextStudio config={config} />
    </>
  )
}
