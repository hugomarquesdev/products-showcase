import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { MainBanner } from '../components/MainBanner'
import Carousel from '../components/Carousel'
import { Form } from '../components/Form'
import { Contact } from '../components/Contact'
import { TextBanner } from '../components/TextBanner'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

const ContactPage = ({ location }) => {
    const { t } = useTranslation()
    const breakpoints = useBreakpoint()
    const bgColor = '#eeefed'
    const { state = {} } = location
    const { model } = state

    return(
        <div style={{backgroundColor:bgColor}}>
            <Layout 
                header={t("header", { returnObjects: true })}
                footer={t("footer", { returnObjects: true })}
                bgColor={bgColor}
                carousel={t("products", { returnObjects: true })}
                page='contact'
                orcamento={t("orcamento", { returnObjects: true })}
            >
                <Seo title="Contactos" />
                <MainBanner
                    content={t("contact", { returnObjects: true }).banner}
                />
                {breakpoints.l && 
                    <Contact 
                        content={t("contact", { returnObjects: true }).contact}
                    />
                }
                <Form
                    content={t("contact", { returnObjects: true }).form}
                    model={model && model}
                />
                <TextBanner
                    content={t("contact", { returnObjects: true }).textBanner}
                />
                <Carousel
                    carousel={t("products", { returnObjects: true })}
                />
            </Layout>
        </div>       
    )
}

export default ContactPage

export const pageQuery = graphql`
  query($language: String!) {
    locales: allLocale(filter: {ns: {in: ["global", "contact", "products", "orcamento"]}, language: {eq: $language}}) {
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