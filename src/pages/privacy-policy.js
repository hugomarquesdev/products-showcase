import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import styled from 'styled-components'

const PrivacyPolicy = () => {
    const { t } = useTranslation()
    const bgColor = '#eeefed'

    return(
        <div style={{backgroundColor:bgColor}}>
            <Layout 
                header={t("header", { returnObjects: true })}
                footer={t("footer", { returnObjects: true })}
                bgColor={bgColor}
            >
                <Styled>
                    <div dangerouslySetInnerHTML={{ __html: t("privacyPolicy", { returnObjects: true })}}></div>
                </Styled>
            </Layout>
        </div>       
    )
}

export default PrivacyPolicy

export const pageQuery = graphql`
  query($language: String!) {
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

const Styled = styled.div`
    max-width:1920px;
    margin:0 auto;
    padding: clamp(30px,10vw,60px) 5% clamp(30px,15vw,60px) 5%;
`