import * as React from "react"
import styled from 'styled-components'
import { Link } from 'gatsby-plugin-react-i18next'
import { Testimonial } from './Testimonial'
import { media } from './MediaQueries'
import { Grid, Cell } from "styled-css-grid"
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import LogoWhite from '../images/logo-white.svg'
import { Image } from '../components/Images'

const Footer = ({ content, bgColor, dark, noTestimonial }) => {
    const breakpoints = useBreakpoint()

    return(
        <FooterStyled>
            {!noTestimonial &&
                <Testimonial
                    content={content.testimonial}
                    bgColor={bgColor}
                    dark={dark}
                />
            }
            <footer>
                <BottomStyled>
                        <Grid columns={breakpoints.m ? 1 : 6} gap={breakpoints.m ? '2rem' : '2%'} className='logo'>
                            <Cell width={breakpoints.m ? 1 : 3} center={breakpoints.m ? true : false} middle>
                                <Link to='/' className='logo-link'>
                                    <LogoWhite/> 
                                </Link>
                            </Cell>
                            <Cell width={breakpoints.m ? 1 : 3} className='pt2020'>
                                <a href='ficha-pt2020.pdf' target='_blank'>
                                    <Image src='pt2020.png' alt='pt2020'/>
                                </a>
                            </Cell>
                        </Grid>
                        <Grid columns={breakpoints.m ? 1 : 6} gap={breakpoints.m ? '5vw' : '4vw'} className='links-container'>
                            <Cell width={breakpoints.m ? 1 : 4} className='copyright'>
                                {content.copyright.map((copyright, i) => (
                                    copyright.outbound ?
                                        <a href={copyright.link} target='_blank' rel='noreferrer' key={i}>{copyright.text}</a>
                                    :
                                        <Link to={copyright.link} key={i}>{copyright.text}</Link>
                                ))}
                            </Cell> 
                            <Cell width={1} className='column'>
                                {content.pages.map((pages, i) => (
                                    <Link to={pages.link} key={i}>{pages.text}</Link>
                                ))}
                            </Cell>
                            <Cell width={1} className='column'>
                                {content.social.map((social, i) => (
                                    <a href={social.link} target='_blank' rel='noreferrer' key={i}>{social.text}</a>
                                ))}
                            </Cell>
                        </Grid>                  
                </BottomStyled>
            </footer>
        </FooterStyled>
    )
}

export default Footer

const FooterStyled = styled.div`
    background-color:#1b1c22;

    footer{
        max-width:1920px;
        margin:0 auto;
        padding: clamp(30px, 5vw, 60px) 5%;
    }
`

const BlogStyled = styled.div`
    .title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        ${media.s`
            flex-direction:column;
            gap: 1rem;
            margin-bottom: 1rem;
        `}

        h1{
            font-weight:100;
            color:#eeefed;
            font-size: 2.5rem;
            text-transform:uppercase;
        }

        hr{
            border-color:#e8eae5;
            width:50vw;
            margin-left: auto;
            margin-right: 2rem;

            ${media.l`
                margin-left:2rem;
            `}

            ${media.s`
                display:none;
            `}
        }
    }

    .news-container {
        padding-top: clamp(30px, 5vw, 60px);
        padding-bottom: clamp(30px, 5vw, 60px);

        ${media.m`
            flex-wrap:wrap;
            gap:3rem;
        `}

        .news{
            position:relative;

            .gatsby-image-wrapper{
                height:300px;
            }

            a{
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }

            h2{
                font-family: 'Cabin', sans-serif;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #eeefed;
                font-size:1rem;
                max-width:400px;
            }

            span{
                font-family:'Exo', sans-serif;
                font-weight:bold;
                color: #eeefed;
                text-transform:uppercase;
                font-size:0.7rem;
            }

            hr{
                position: absolute;
                height: 100%;
                top: 0;
                left: -7.8%;
                margin:0;
                border-color:#e8eae5;

                :first-child{
                    display:none;
                }
            }

            :first-child hr{
                display:none;
            }
        }
    }

    hr{
        border-color:#e8eae5;
        margin:0;
    }
`

const BottomStyled = styled.div`
    padding-top: clamp(30px, 5vw, 60px);

    .logo{

        .logo-link{
            display:flex;
            height:inherit;

            ${media.m`
                display:block;
            `}
        }

        svg{
            max-width:250px;

            ${media.m`
                margin:0 auto;
                max-width:200px;
            `}
        }

        .pt2020{
            max-width: 400px;
            margin-left: auto;
            width: 100%;

            ${media.m`
                margin-left:unset;
                margin:0 auto;
            `}
        }
    }

    .links-container{
        padding-top: clamp(30px, 5vw, 60px);
        color: #eeefed;
        letter-spacing: 1px;
        font-family:'Cabin', sans-serif;
        font-size: 0.8rem;
        line-height: 20px;
        white-space:nowrap;
        text-transform:uppercase;

        ${media.m`
            text-align:center;
        `}

        ${media.s`
            white-space: break-spaces;
        `}

        .copyright, .column{
            display:flex;
            flex-direction:column;
        }

        a{
            color:#eeefed;
        }
    }
    
`