import React, { useState } from 'react'
import styled from 'styled-components'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import { Image } from './Images'
import { motion, AnimatePresence } from 'framer-motion'
import { media } from './MediaQueries'


const ProjectsContent = ({ content }) => {
    const breakpoints = useBreakpoint()
    const [showDetail, setShowDetail] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState({
        image: null,
        marker: null
    })

    // HOVER ANIMATIONS
        // MAIN DIV
        const variants = {
            initial: {
                opacity: 0,
                transition: {
                    staggerChildren: 0.2
                },
            },

            animate: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.2,
                    staggerDirection: -1
                },
            },

            exit: {
                opacity: 0,
                transition: {
                    staggerChildren: 0.2,
                    staggerDirection: 1
                },
            },
        }

        //  HR
        const bar = {
            initial: { 
                opacity: 0, 
                width: 0 
            },

            animate: { 
                opacity: 1, 
                width: '100%' 
            },

            exit: { 
                opacity: 0, 
                width: 0 
            },
        }

        // SPAN
        const span = {
            initial: { 
                opacity: 0, 
                bottom: -5 
            },

            animate: { 
                opacity: 1, 
                bottom: 0 
            },

            exit: { 
                opacity: 0, 
                bottom: -5
            },
        }
    // ---

    return(
        <ContentStyled>
            <Grid flow="row dense" columns={breakpoints.m ? 4 : 6} gap={breakpoints.m ? '2vw' : '15px'} className='grid'>
                {content.content.map((content, i) => (
                    <Cell width={breakpoints.m ? 4 : content.width} height={breakpoints.m ? 1 : content.height} key={i}>
                        {content.image ?
                                <div className='image-map' key={i}>
                                    <div className='image-overlay' style={(showDetail && selectedMarker.image === i) ? { opacity:0.7, transition:'opacity 0.6s' } : {}}>
                                        <Image src={content.image} alt={content.alt}/>
                                    </div>
                                    {(!breakpoints.m && content.markers) &&
                                        content.markers.map((marker, x) => (
                                            <div 
                                                onMouseOver={() => { setShowDetail(true); setSelectedMarker({image: i, marker: x})}}
                                                onFocus={() => { setShowDetail(true); setSelectedMarker({image: i, marker: x})}}
                                                onMouseLeave={() => { setShowDetail(false); setSelectedMarker({image: null, marker: null})}}
                                                role='button'
                                                tabIndex='0'
                                                className='marker'
                                                key={x}
                                                style={{
                                                    left: marker.x,
                                                    top: marker.y
                                                }}
                                            >
                                                {(selectedMarker.image === i && selectedMarker.marker === x) &&
                                                    <AnimatePresence>
                                                        {showDetail &&
                                                            <motion.div
                                                                initial="initial"
                                                                animate="animate"
                                                                exit="exit"
                                                                variants={variants}
                                                                className='text'
                                                                style={ 
                                                                    (marker.x > '60%') ?
                                                                        {
                                                                            left:'-500%'
                                                                        }
                                                                    :
                                                                        {
                                                                            left:'50%'
                                                                        }  
                                                                }
                                                            >
                                                                <motion.span 
                                                                    variants={span}
                                                                    style={
                                                                        (marker.x > '60%') ?
                                                                            {
                                                                                textAlign:'left',
                                                                                paddingRight: '20px'
                                                                            }
                                                                        :
                                                                            {
                                                                                textAlign:'right',
                                                                                paddingLeft: '20px'
                                                                            }  
                                                                    }
                                                                >
                                                                    {marker.title}
                                                                </motion.span>
                                                                <motion.hr variants={bar}/>
                                                            </motion.div>
                                                        }
                                                    </AnimatePresence>
                                                }
                                            </div>
                                        ))
                                    } 
                                </div>
                        : (content.title || content.text) &&
                            <div className='container'>
                                <h2>{content.title}</h2>
                                <span>{content.text}</span>
                            </div>
                        }
                    </Cell>
                ))}
            </Grid> 
        </ContentStyled>
    )
}

export { ProjectsContent }


const ContentStyled = styled.div`
    padding: clamp(30px,10vw,60px) 5%;
    max-width:1920px;
    margin:0 auto;

    .grid{
        .image-map{
            width: 100%;
            height:100%;
            position: relative;

            .image-overlay{
                opacity: 1;
                transition:opacity 0.6s;
                height:100%;
            }

            .image{
                position:relative;
                width:100%;
                height:100%;
            }

            .marker{
                position: absolute;
                width: 2vw;
                height: 2vw;
                z-index: 2;
                background-color: #eeefedE6;
                border-radius: 50%;
                display: flex;
                align-items: center;
                box-shadow: 0 0 0 0.5vw #eeefed4d, 0 0 0 0vw #eeefed4d, 0 0 0 0vw #eeefed4d;
                transition: box-shadow 0.2s;

                :hover{
                    box-shadow: 0 0 0 0.5vw #eeefed4d, 0 0 0 0.9vw #eeefed4d, 0 0 0 1.3vw #eeefed4d;
                }

                .text{
                    position:absolute;
                    width:600%;
                    max-width:250px;
                    min-width:90px;

                    span, hr{
                        position:absolute;
                        width:100%;
                        margin:0;
                    }

                    span{
                        bottom:0;
                        color:#eeefed;
                        box-sizing: border-box;
                    }

                    hr{
                        border: 0;
                        border-bottom: 1px solid #eeefed;
                    }
                }
            }
        }

        .container{
            text-align:center;
            margin:4rem auto;
            max-width: 450px;

            ${media.m`
                margin:2rem auto;
            `}

            h2{
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #eeefed;
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom:1.5rem;
            }

            span{
                letter-spacing: 1px;
                color: #eeefed;
                font-size: 1.1rem;
                line-height: 1.5;
                font-weight:200;
            }
        }
    }  
`