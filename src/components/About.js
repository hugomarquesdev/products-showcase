import React from "react"
import styled from 'styled-components'
import { Image } from '../components/Images'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import { media } from '../components/MediaQueries'
import { motion } from "framer-motion"
import { InView } from 'react-intersection-observer'


const About = ({ content }) => {
    const breakpoints = useBreakpoint()  

    const variantsText = {
        hidden: { 
            opacity: 0 
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                delay: 0.5
            }
        }
    }

    const variantsImage = {
        hidden: { 
            opacity: 0 
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                delay: 1
            }
        }
    }

    return( 
        <AboutStyled>
            {!breakpoints.l ? // DESKTOP
                <div className='about'>
                    {content.map((content, i) => (
                        (i % 2 === 0) ?
                            <div className='container'>
                                <InView>
                                    {({ inView, ref }) => (
                                            <Grid columns={6} gap={'4vw'} middle className='main' ref={ref}>
                                                <Cell width={3} className='content' middle>
                                                    <motion.div
                                                        initial='hidden'
                                                        animate={inView ? 'visible' : 'hidden'}
                                                        variants={variantsText}
                                                    > 
                                                        <h3>{content.name}</h3>
                                                        <h4>{content.title}</h4>
                                                        <span className='text'>{content.text}</span>
                                                    </motion.div>
                                                </Cell>
                                                <Cell width={3} className='media-container' middle>
                                                    <motion.div
                                                        initial='hidden'
                                                        animate={inView ? 'visible' : 'hidden'}
                                                        variants={variantsImage}
                                                    > 
                                                        <Image src={content.img} alt={content.alt}/>
                                                        {content.img2 && 
                                                            <div className='img-hover'>
                                                                <Image src={content.img2} alt={content.alt}/>
                                                            </div>
                                                        }
                                                    </motion.div>
                                                </Cell>                       
                                            </Grid> 
                                    )}
                                </InView> 
                            </div>
                        : 
                            <div className='container'>
                                <InView>
                                    {({ inView, ref }) => (
                                        <Grid columns={6} gap={'4vw'} middle className='main' ref={ref}>
                                            <Cell width={3} className='media-container' middle>
                                                <motion.div
                                                    initial='hidden'
                                                    animate={inView ? 'visible' : 'hidden'}
                                                    variants={variantsImage}
                                                >  
                                                    <Image src={content.img} alt={content.alt}/>
                                                    {content.img2 && 
                                                        <div className='img-hover'>
                                                            <Image src={content.img2} alt={content.alt}/>
                                                        </div>
                                                    }  
                                                </motion.div>                     
                                            </Cell>
                                            <Cell width={3} className='content' middle>
                                                <motion.div
                                                    initial='hidden'
                                                    animate={inView ? 'visible' : 'hidden'}
                                                    variants={variantsText}
                                                > 
                                                    <h3>{content.name}</h3>
                                                    <h4>{content.title}</h4>
                                                    <span className='text'>{content.text}</span>
                                                </motion.div>
                                            </Cell>
                                        </Grid>
                                    )}
                                </InView>
                            </div>
                    ))}  
                </div>
            : // MOBILE
                <div className='about'>
                    {content.map((content, i) => (
                        <div className='container' key={i}>
                            <Grid columns={1} gap={'10vw'} middle className='main'>
                                <Cell width={1} className='content' middle>
                                    <h3>{content.name}</h3>
                                    <h4>{content.title}</h4>
                                    <span className='text'>{content.text}</span>
                                </Cell>
                                <Cell width={1} className='media-container' middle>
                                    <Image src={content.img} alt={content.alt}/>
                                    {content.img2 && 
                                        <div className='img-hover'>
                                            <Image src={content.img2} alt={content.alt}/>
                                        </div>
                                    }                       
                                </Cell>
                            </Grid>
                        </div>   
                    ))}  
                </div>
            }
        </AboutStyled>
    )
}

export { About }

const AboutStyled = styled.div`
    .about{
        position:relative;
        padding: clamp(30px,10vw,90px) 5% clamp(30px,10vw,60px) 5%;   
        
        ${media.l`
            padding: 0 5% clamp(30px,10vw,60px) 5%;        
        `}
    }

    .container{
        height:100%;
        max-width:1920px;
        margin:0 auto;
        padding: clamp(15px, 5vw, 50px) 0;
        box-sizing:border-box;
        display:flex;
        flex-direction:column;
        justify-content:space-between;

        ${media.l`
            padding: clamp(30px,10vw,90px) 0;
        `}

        .main{
            .media-container{
                position:relative;
                display:block;
                z-index:2;

                .image{
                    width:100%;
                    height:100%;
                    max-height:750px;
                }

                .img-hover{
                    position:absolute;
                    top:0;
                    left:0;
                    width: 100%;
                    height: 100%;
                    opacity:0;
                    transition: opacity 0.3s;
                }

                :hover .img-hover{
                    opacity:1;
                }
            }

            .content{
                z-index:2;

                h3{
                    font-family:'Cabin', sans-serif;
                    font-weight:600;
                    font-size:1.5rem;
                    text-transform:uppercase;
                    margin-bottom: 3rem;
                }

                h4{
                    font-weight: 100;
                    font-size: 3.5rem;
                    line-height:1;
                    margin-bottom: 3rem;

                    ${media.l`
                        font-size: 2rem;
                    `}
                }

                .text{
                    font-family:'Cabin', sans-serif;
                    font-size:1.3rem;
                    line-height:2rem;
                }
            }  
        }  
    }
`