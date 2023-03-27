/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://vixiees.com',
    generateIndexSitemap: false,
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/studio/*']
        },
      ],
    },
    // alternateRefs: [
    //   {
    //     href: 'https://vixiees.com/es-ES',
    //     hreflang: 'es',
    //   },
    //   {
    //     href: 'https://vixiees.com/en-US',
    //     hreflang: 'en',
    //   },
    // ],
  }
