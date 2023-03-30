const path = require("path")

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  defaultNS: "common",
  ns: ["common"],
  localePath: path.resolve('./public/locales'),
  i18n: {
    locales: ["en-US", "es-ES"],
    defaultLocale: "es-ES",
    ignoreRoutes: ["/studio"],
  },
}
