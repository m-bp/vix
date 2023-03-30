import bundleAnalyzer from "@next/bundle-analyzer"
import CopyPlugin from "copy-webpack-plugin"
import path from "path"
import { fileURLToPath } from "url"

import i18nConfig from "./next-i18next.config.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withBundleAnalyzer = bundleAnalyzer({ enabled: false })

/** @type {import('next').NextConfig} */
const config = {
  swcMinify: true,
  productionBrowserSourceMaps: true,

  images: {
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      { hostname: "source.unsplash.com" },
    ],
  },
  typescript: {
    // ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
    ignoreBuildErrors: true,
  },
  eslint: {
    // ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      // {
      //   source: "/en-US",
      //   destination: "/en-US/index",
      //   locale: false,
      // },
      // {
      //   source: "/es-ES",
      //   destination: "/es-ES/index",
      //   locale: false,
      // },
    ]
  },
  sassOptions: {
    includePaths: ["./src"],
    prependData: `@import "styles/variables.module.scss";`,
  },
  i18n: i18nConfig.i18n,
  // webpack(config) {
  //   config.plugins.push(
  //     require('unplugin-icons/webpack')({
  //       compiler: 'jsx',
  //       jsx: 'react',
  //     }),
  //   )

  //   return config
  // },
  webpack: config => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(
              __dirname,
              "node_modules/@material-design-icons/svg/filled"
            ),
            to: path.join(__dirname, "public/icons"),
          },
        ],
      })
    )

    return config
  },
}

export default withBundleAnalyzer(config)
