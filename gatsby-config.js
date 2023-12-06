const myCustomQueries = {
    xl: '(max-width: 1200px)',
    l: '(max-width: 1024px)',
    m: '(max-width: 700px)',
    s: '(max-width: 500px)'
}

module.exports = {
    siteMetadata: {
        title: `Lar Darte`,
        description: `Somos fábrica, Criamos soluções.`,
        author: `@hugomarquesdev | Invisual Branding Solutions`,
        siteUrl: `https://lardarte.pt/`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `images`,
              path: `${__dirname}/src/images`,
            },
          },
          {
              resolve: `gatsby-source-filesystem`,
              options: {
                  path: `${__dirname}/locales`,
                  name: `locale`,
              },
          },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Lar Darte`,
                short_name: `Lardarte`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`,
            },
        },
        `gatsby-plugin-gatsby-cloud`,
        `gatsby-plugin-styled-components`,
        {
            resolve: "gatsby-plugin-breakpoints",
            options: {
                queries: myCustomQueries,
            },
        },
        {
            resolve: `gatsby-plugin-react-i18next`,
            options: {
                localeJsonSourceName: `locale`,
                // languages: [`pt`, `en`, `fr`],
                languages: [`pt`],
                defaultLanguage: `pt`,
                siteUrl: `https://lardarte.pt/`,
                i18nextOptions: {
                interpolation: {
                    escapeValue: false, // not needed for react as it escapes by default
                },
                keySeparator: false,
                nsSeparator: false,
              },
            },
        },
        {
            resolve: `gatsby-source-wordpress`,
            options: {
                url: `https://news.lardarte.pt/graphql`,
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
              rule: {
                include: /images/
              }
            }
        },
        "gatsby-plugin-use-query-params",
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
              id: "GTM-M6NXFDQ",
              includeInDevelopment: false,
              defaultDataLayer: {
                platform: "gatsby",
              },
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: ["UA-33769392-1"],
                gtagConfig: {
                    anonymize_ip: true,
                    cookie_expires: 0,
                },
                pluginConfig: {
                    head: true,
                    respectDNT: true,
                    exclude: ["/404/**"],
                },
            },
        },
        'gatsby-plugin-htaccess',
        `gatsby-plugin-sitemap`
    ]
}