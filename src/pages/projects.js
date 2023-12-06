import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { MainBanner } from '../components/MainBanner'
import { Projects } from '../components/Projects'

const ProjectsPage = () => {
    const { t } = useTranslation()
    const bgColor = '#1b1c22'

    return(
        <div style={{backgroundColor:bgColor}}>
            <Layout 
                header={t("header", { returnObjects: true })}
                footer={t("footer", { returnObjects: true })}
                bgColor={bgColor}
                dark
                orcamento={t("orcamento", { returnObjects: true })}
            >
                <Seo title="Projetos" />
                <MainBanner
                    content={t("projects", { returnObjects: true }).banner}
                    dark
                    noPadding
                />
                <Projects
                    content={t("projects", { returnObjects: true }).list}
                    dark
                    marginBottom
                />
            </Layout>
        </div>       
    )
}

export default ProjectsPage

export const pageQuery = graphql`
  query($language: String!) {
    locales: allLocale(filter: {ns: {in: ["global", "projects", "orcamento"]}, language: {eq: $language}}) {
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