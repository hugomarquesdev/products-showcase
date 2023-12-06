import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { MainBanner } from '../components/MainBanner'
import { TextBanner } from '../components/TextBanner'
import { ImageBanner } from '../components/ImageBanner'
import { Projects } from '../components/Projects'

const Chef = () => {
    const { t } = useTranslation()
    const bgColor = '#1b1c22'

    return(
        <div style={{backgroundColor:bgColor}}>
            <Layout 
                header={t("header", { returnObjects: true })}
                footer={t("footer", { returnObjects: true })}
                bgColor={bgColor} 
                dark
                carousel={t("products", { returnObjects: true })}
                orcamento={t("orcamento", { returnObjects: true })}
            >
                <Seo title="Chef Ricardo Costa" />
                <MainBanner
                    content={t("chef", { returnObjects: true }).banner}
                    dark
                />
                <TextBanner
                    content={t("chef", { returnObjects: true }).textBanner}
                    dark
                />
                <MainBanner
                    content={t("chef", { returnObjects: true }).videoBanner}
                    dark
                />
                <Projects
                    content={t("chef", { returnObjects: true }).projects}
                    dark
                />
                <ImageBanner
                    content={t("chef", { returnObjects: true }).imageBanner}
                />
                <TextBanner
                    content={t("chef", { returnObjects: true }).textBanner2}
                    dark
                />
            </Layout>
        </div>       
    )
}

export default Chef

export const pageQuery = graphql`
  query($language: String!) {
    locales: allLocale(filter: {ns: {in: ["global", "chef", "orcamento"]}, language: {eq: $language}}) {
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