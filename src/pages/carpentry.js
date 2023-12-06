import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { MainBanner } from '../components/MainBanner'
import { TextBanner } from '../components/TextBanner'
import Carousel from '../components/Carousel'

const Carpentry = () => {
    const { t } = useTranslation()
    const bgColor = '#c4cbd1'

    return(
       <div style={{backgroundColor:bgColor}}>
            <Layout 
                header={t("header", { returnObjects: true })}
                footer={t("footer", { returnObjects: true })}
                bgColor={bgColor}
                carousel={t("products", { returnObjects: true })}
                orcamento={t("orcamento", { returnObjects: true })}
            >
                <Seo title="Carpintaria" />
                <MainBanner
                    content={t("carpentry", { returnObjects: true }).banner}
                    middle
                />
                <TextBanner
                    content={t("carpentry", { returnObjects: true }).textBanner}
                />
                <TextBanner
                    content={t("carpentry", { returnObjects: true }).textBanner2}
                    carpentry
                />
                <Carousel
                    carousel={t("products", { returnObjects: true })}
                    carpentry
                />
            </Layout>
        </div>       
    )
}

export default Carpentry

export const pageQuery = graphql`
  query($language: String!) {
    locales: allLocale(filter: {ns: {in: ["global", "carpentry", "products", "orcamento"]}, language: {eq: $language}}) {
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