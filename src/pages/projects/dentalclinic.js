import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { ProjectsBanner } from "../../components/ProjectsBanner"
import { ProjectsContent } from "../../components/ProjectsContent"
import { TextBanner } from "../../components/TextBanner"

const Kitchens = () => {
  const { t } = useTranslation()
  const bgColor = "#1b1c22"

  return (
    <div style={{ backgroundColor: bgColor }}>
      <Layout
        header={t("header", { returnObjects: true })}
        footer={t("footer", { returnObjects: true })}
        bgColor={bgColor}
        dark
        orcamento={t("orcamento", { returnObjects: true })}
      >
        <Seo title="Dental Clinic" />
        <ProjectsBanner
          content={t("projects", { returnObjects: true }).project.dentalclinic}
        />
        <ProjectsContent
          content={t("projects", { returnObjects: true }).project.dentalclinic}
        />
        <TextBanner
          content={t("projects", { returnObjects: true }).textBanner}
          carpentry
          dark
        />
      </Layout>
    </div>
  )
}

export default Kitchens

export const pageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: {
        ns: { in: ["global", "projects", "orcamento"] }
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
