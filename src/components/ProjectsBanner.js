import React from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"


const ProjectsBanner = ({ content }) => {
    const breakpoints = useBreakpoint()

    return(
        <BannerStyled>   
            <div className='banner'>
                <Grid columns={breakpoints.xl ? 1 : 6} gap={breakpoints.xl ? '10vw' : '0'} className='grid'>
                    <Cell width={breakpoints.xl ? 1 : 4} left={breakpoints.xl ? 1 : 2}>
                        <h1 dangerouslySetInnerHTML={{ __html: content.title}}></h1>
                    </Cell>
                    <Cell width={breakpoints.xl ? 1 : 4} left={breakpoints.xl ? 1 : 2} className='text' middle center>
                        <span dangerouslySetInnerHTML={{ __html: content.text}}></span>
                    </Cell> 
                </Grid>
            </div>  
        </BannerStyled>
    )
}

export { ProjectsBanner }


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

            
            h1{
                text-align:center;
                text-transform:uppercase;
                font-weight:200;
                font-size:5rem;
                padding-bottom: clamp(30px, 10vw, 60px);
                color: #eeefed;

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

            .text{
                span{
                    font-weight:100;
                    font-size:1.3rem;
                    color:#eeefed;
                    line-height:1.5;
                }
            }  
        }  
    }
`