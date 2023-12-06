import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import Button from '../components/Button'
import { Image } from '../components/Images'
import { motion, useViewportScroll  } from 'framer-motion'


const MainBanner = ({ middle, animations, content, dark, noPadding }) => {
    const breakpoints = useBreakpoint()
    const { scrollYProgress } = useViewportScroll()
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        scrollYProgress.onChange(x => setScrollPosition(x.toFixed(2)*25))
    }, [scrollYProgress])

    return(
        <BannerStyled dark={dark} noPadding={noPadding}>
            {animations &&
                <>
                    <motion.div
                        className='circle-shape'
                        animate={{
                            y: !breakpoints.xl ? ['6vh', '6vh', '10vh','6vh', '6vh'] : ['3vh', '3vh', '6vh','5vh', '10vh'],
                            x: !breakpoints.xl ? ['-10vw', '-8vw', '-15vw', '-5vw', '-10vw'] : ['-60vw', '-65vw', '-65vw', '-55vw', '-60vw'],
                            width: !breakpoints.xl ? ['50vw', '50vw', '60vw', '50vw', '50vw'] : ['100vw', '100vw', '110vw', '110vw', '100vw'],
                        }}
                        transition={{  
                            repeat: Infinity,
                            duration: 15, 
                            ease: 'easeInOut'
                        }}
                    />
                    <motion.div
                        className='triangle-shape'
                        initial={{
                            y:0,
                            x:0,
                            rotate:0
                        }}
                        animate={{
                            y: scrollPosition + '%',
                            x: scrollPosition + '%',
                            rotate: -scrollPosition
                        }}
                    />
                </>
            }
            <div className='banner'>
                <Grid columns={breakpoints.xl ? 1 : 6} gap={breakpoints.xl ? '10vw' : '4vw'} className='grid'>
                    {content.title && 
                        <Cell width={breakpoints.xl ? 1 : 4} left={breakpoints.xl ? 1 : 2}>
                            <h1 dangerouslySetInnerHTML={{ __html: content.title}}></h1>
                        </Cell>
                    }
                    {(content.video || content.img) &&
                        <Cell width={content.text ? (breakpoints.xl ? 1 : 4) : (breakpoints.xl ? 1 : 6)} className='media-container'>
                            {content.video ?
                                <video preload="none" className='video' poster={content.videoPoster} controls autoPlay playsInline loop muted>
                                    <source src={content.video} type="video/mp4" />
                                </video>
                            : content.img ?
                                <Image src={content.img} alt={content.imgAlt}/>
                            : ''
                            }                         
                        </Cell>
                    }
                    {content.text &&
                        <Cell width={breakpoints.xl ? 1 : 2} className='right' middle={middle ? true : false}>
                            <span className='text' dangerouslySetInnerHTML={{__html: content.text}}></span>
                            <Button link={content.link} text={content.button}/>
                        </Cell>
                    }  
                </Grid>
            </div>  
        </BannerStyled>
    )
}

export { MainBanner }


const BannerStyled = styled.div`
    position:relative;
    overflow:hidden;

    .circle-shape{
        position:absolute;
        border: 1px solid #1b1c22;
        border-radius: 50%;
        z-index:1;
        height:50vw;

        ${media.xl`
            height:100vw;
        `}
    }

    .triangle-shape{
        position:absolute;
        z-index:0;
        bottom:0;
        right:0;
        width: 0;
        height:100%;
        border-bottom: 40vh solid #c4cbd1;
        border-left: 90vw solid transparent;
    }

    .banner{
        max-width:1920px;
        margin:0 auto;
        padding: clamp(30px, 10vw, 90px) 5% clamp(30px, 10vw, 60px) 5%;

        .grid{
            ${media.xl`
                text-align:center;
            `}

            
            h1{
                text-align:center;
                text-transform:uppercase;
                font-weight:200;
                font-size:5rem;
                padding-bottom: ${props => !props.noPadding && 'clamp(30px, 10vw, 60px)'};
                z-index:2;
                color: ${props => props.dark && '#eeefed'};

                ${media.xl`
                    padding-bottom: 0;
                `}

                ${media.l`
                    font-size:4rem;
                `}

                ${media.m`
                    font-size:3rem;
                    padding-bottom:0;
                `}

                ${media.s`
                    font-size:2.5rem;
                `}
            }

            .media-container{
                z-index:2;
                max-height:750px;

                .video{
                    width:100%;
                    height:100%;
                    object-fit:cover;
                }

                .image{
                    height:100%;
                }
            }

            .right{
                z-index:2;

                ${media.xl`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                `}

                .text{
                    font-weight:100;
                    font-size:1.3rem;
                    line-height:2rem;
                }

                .button{
                    margin-top:3rem;
                }
            }  
        }  
    }
`