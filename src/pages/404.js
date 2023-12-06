import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { useTranslation } from 'gatsby-plugin-react-i18next'

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { t } = useTranslation()

  return (
    <Layout 
        location={location} 
        title={siteTitle}
        header={t("header", { returnObjects: true })}
        footer={t("footer", { returnObjects: true })}
    >
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query($language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    locales: allLocale(filter: {ns: {in: ["global"]}, language: {eq: $language}}) {
        edges {
          node {
            ns
            data
            language
          }
        }
    }
  }
`
