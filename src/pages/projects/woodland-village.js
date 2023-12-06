import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql } from "gatsby"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { ProjectsBanner } from '../../components/ProjectsBanner'
import { ProjectsContent } from '../../components/ProjectsContent'
import { TextBanner } from '../../components/TextBanner'
import { VideoBanner } from '../../components/VideoBanner'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

const Kitchens = () => {
    const { t } = useTranslation()
    const bgColor = '#1b1c22'
    const breakpoints = useBreakpoint()

    return(
        <div style={{backgroundColor:bgColor}}>
            <Layout 
                header={t("header", { returnObjects: true })}
                footer={t("footer", { returnObjects: true })}
                bgColor={bgColor}   
                dark   
                orcamento={t("orcamento", { returnObjects: true })}
            >
                <Seo title="Clínica Dentária" />
                <ProjectsBanner
                    content={t("projects", { returnObjects: true }).project.woodland}
                />
                <ProjectsContent
                    content={t("projects", { returnObjects: true }).project.woodland}
                />
                <iframe 
                    width="100%" 
                    height={breakpoints.m ? '400px' : '600px'}
                    title='3d'
                    src="https://my.matterport.com/show/?m=DTeGXzbs8GH&pin=0&help=2" 
                    frameborder="0" 
                    allowfullscreen="" 
                    allow="xr-spatial-tracking"
                ></iframe>
                <VideoBanner
                    content={t("projects", { returnObjects: true }).project.woodland}
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