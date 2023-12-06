import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { connect } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import Orcamento from './Orcamento/Form'
import ProductModal from "./ProductModal"
import "./layout.css"
import { motion } from 'framer-motion'
import Cookies from './Cookies'

const Layout = ({ children, header, footer, bgColor, carousel, page, dark, form, product, orcamento, noTestimonial }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <>
            <Header 
                siteTitle={data.site.siteMetadata?.title || `Lar Darte`} 
                content={header}
                bgColor={bgColor}
                page={page}
                dark={dark}
            />

            <motion.main
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                transition={{
                    type: "spring",
                    mass: 0.35,
                    stiffness: 75,
                    duration: 2
                }}
                key={bgColor}
            >
            
            {/* <main> */}
                {children}
                {form.open && // MODAL ORÇAMENTO
                    // <motion.div
                    //     initial={{ 
                    //         opacity: 0
                    //     }}
                    //     animate={{ 
                    //         opacity: 1
                    //     }}
                    //     transition={{ 
                    //         duration: 0.5 
                    //     }}
                    // >  
                        <Orcamento
                            bgColor={bgColor}
                            content={orcamento}
                        />
                    // </motion.div>
                }
                {product.open && // MODAL COZINHAS
                    // <motion.div
                    //     initial={{ 
                    //         opacity: 0
                    //     }}
                    //     animate={{ 
                    //         opacity: 1
                    //     }}
                    //     transition={{ 
                    //         duration: 0.5 
                    //     }}
                    // > 
                        <ProductModal
                            carousel={carousel}
                            bgColor={bgColor}
                        /> 
                    // </motion.div>
                }
            {/* </main> */}
            </motion.main>

            <Footer
                content={footer}
                page={page}
                bgColor={bgColor}
                dark={dark}
                noTestimonial={noTestimonial}
            />
            <Cookies/>
        </>
    )
}

export default connect(state => ({
    product: state.app.product,
    form: state.app.form
}), null)(Layout)
