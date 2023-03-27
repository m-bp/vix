import bundleAnalyzer from "@next/bundle-analyzer"

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
  i18n: {
    locales: ["default", "en-US", "es-ES"],
    defaultLocale: "default",
    ignoreRoutes: ["/studio"],
  },
  // webpack(config) {
  //   config.plugins.push(
  //     require('unplugin-icons/webpack')({
  //       compiler: 'jsx',
  //       jsx: 'react',
  //     }),
  //   )

  //   return config
  // },
}

export default withBundleAnalyzer(config)
