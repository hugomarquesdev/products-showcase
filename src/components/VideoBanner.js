import React from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"


const VideoBanner = ({ content }) => {
    const breakpoints = useBreakpoint()

    return(
        <BannerStyled>   
            <div className='banner'>
                <Grid columns={breakpoints.xl ? 1 : 6} gap={breakpoints.xl ? '10vw' : '0'} className='grid'>
                    <Cell width={breakpoints.xl ? 1 : 4} left={breakpoints.xl ? 1 : 2} className='media-container'>
                        <video preload="none" className='video' poster={content.videoPoster} controls autoPlay playsInline loop muted>
                            <source src={content.video} type="video/mp4" />
                        </video>                     
                    </Cell>
                </Grid>
            </div>  
        </BannerStyled>
    )
}

export { VideoBanner }


const BannerStyled = styled.div`
    position:relative;

    .banner{
        max-width:1920px;
        margin:0 auto;
        padding: clamp(30px, 10vw, 60px) 5%;

        .grid{
            ${media.xl`
                text-align:center;
            `}

            .media-container{
                max-height:750px;

                .video{
                    width:100%;
                    height:100%;
                    object-fit:cover;
                }
            }
        }  
    }
`