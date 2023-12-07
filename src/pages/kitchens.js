import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { MainBanner } from "../components/MainBanner"
import Carousel from "../components/Carousel"
import { Steps } from "../components/Steps"
import { SliderComponent } from "../components/Slider"
import { TextBanner } from "../components/TextBanner"

const Kitchens = () => {
  const { t } = useTranslation()
  const bgColor = "#d1cbc4"

  return (
    <div style={{ backgroundColor: bgColor }}>
      <Layout
        header={t("header", { returnObjects: true })}
        footer={t("footer", { returnObjects: true })}
        bgColor={bgColor}
        carousel={t("products", { returnObjects: true })}
        orcamento={t("orcamento", { returnObjects: true })}
      >
        <Seo title="Kitchens" />
        <MainBanner content={t("kitchens", { returnObjects: true }).banner} />
        <TextBanner
          content={t("kitchens", { returnObjects: true }).textBanner}
        />
        <Carousel carousel={t("products", { returnObjects: true })} kitchen />
        <SliderComponent
          content={t("kitchens", { returnObjects: true }).gallery}
        />
        <Steps content={t("kitchens", { returnObjects: true }).steps} />
      </Layout>
    </div>
  )
}

export default Kitchens

export const pageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: {
        ns: { in: ["global", "kitchens", "products", "orcamento"] }
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
