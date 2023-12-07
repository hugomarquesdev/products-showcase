import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { About } from "../components/About"

const AboutPage = () => {
  const { t } = useTranslation()
  const bgColor = "#cdd1c4"

  return (
    <div style={{ backgroundColor: bgColor }}>
      <Layout
        header={t("header", { returnObjects: true })}
        footer={t("footer", { returnObjects: true })}
        bgColor={bgColor}
        orcamento={t("orcamento", { returnObjects: true })}
      >
        <Seo title="About" />
        <About content={t("about", { returnObjects: true })} />
      </Layout>
    </div>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: {
        ns: { in: ["global", "about", "orcamento"] }
        language: { eq: $language }
      }
    ) {
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
