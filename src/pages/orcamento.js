import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Orcamento from '../components/Orcamento/Form'

const OrcamentoPage = () => {
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
                noTestimonial
            >
                <Seo title="Orçamento" />
                <Orcamento
                    bgColor={bgColor}
                    content={t("orcamento", { returnObjects: true })}
                    notFixed
                />
            </Layout>
        </div>       
    )
}

export default OrcamentoPage

export const pageQuery = graphql`
  query($language: String!) {
    locales: allLocale(filter: {ns: {in: ["global", "products", "orcamento"]}, language: {eq: $language}}) {
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