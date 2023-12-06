import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { MainBanner } from '../components/MainBanner'
import { Quote } from '../components/Quote'
import { GridImages } from '../components/GridImages'
import Carousel from '../components/Carousel'
import { TextBanner } from '../components/TextBanner'
import { Projects } from '../components/Projects'

const IndexPage = () => {
    const { t } = useTranslation()
    const bgColor = '#eeefed'

    return(
        <div style={{backgroundColor:bgColor}}>
            <Layout 
                header={t("header", { returnObjects: true })}
                footer={t("footer", { returnObjects: true })}
                bgColor={bgColor}
                carousel={t("products", { returnObjects: true })}
                orcamento={t("orcamento", { returnObjects: true })}
            >
                <Seo title="Lar Darte" />
                <MainBanner
                    content={t("home", { returnObjects: true }).banner}
                    animations
                />
                <Quote
                    content={t("home", { returnObjects: true }).quote}
                />
                <GridImages
                    content={t("home", { returnObjects: true }).grid_images}
                />
                <TextBanner
                    content={t("home", { returnObjects: true }).textBanner}
                />
                <Carousel
                    carousel={t("products", { returnObjects: true })}
                />        
                <Projects
                    content={t("home", { returnObjects: true }).projects}
                    marginBottom
                />
            </Layout>
        </div>       
    )
}

export default IndexPage

export const pageQuery = graphql`
  query($language: String!) {
    locales: allLocale(filter: {ns: {in: ["global", "home", "products", "orcamento"]}, language: {eq: $language}}) {
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