import React from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import { Image } from './Images'


const ImageBanner = ({ content }) => {
    const breakpoints = useBreakpoint()

    return(
        <ImageStyled>
            <div className='container'>
                <Grid columns={breakpoints.m ? 1 : 6} gap={breakpoints.m ? '10vw' : '4vw'} className='grid'>
                    <Cell width={breakpoints.m ? 1 : 4} left={breakpoints.m ? 1 : 2} className='media-container'>
                        {content.image && 
                            <>
                                <Image src={content.image} alt={content.alt}/>
                                <div className='signature'>
                                    <Image src={content.signature} alt={content.alt}/>
                                </div>
                            </>
                        }
                    </Cell> 
                </Grid>       
            </div>  
        </ImageStyled>
    )
}

export { ImageBanner }


const ImageStyled = styled.div`
    .container{
        max-width:1920px;
        margin:0 auto;
        padding: clamp(30px, 10vw, 60px) 5%;

        .grid{
            .media-container{
                position:relative;
                max-height:1000px;

                .image{
                    height:100%;
                }

                .signature{
                    position:absolute;
                    width:100%;
                    bottom: -70px;
                    right: -110px;
                    max-width:350px;

                    ${media.l`
                        max-width:250px;
                        bottom: -50px;
                        right: -75px;
                    `}

                    ${media.m`
                        max-width:200px;
                        bottom: -40px;
                        right: -15px;
                    `}
                }
            }
        }  
    }
`