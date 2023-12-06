import React from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"


const Quote = ({ content }) => {
    const breakpoints = useBreakpoint()

    return(
        <QuoteStyled>
            <Grid columns={breakpoints.l ? 1 : 6} gap={breakpoints.m ? '4vw' : '10%'} className='grid'>
                <Cell width={breakpoints.l ? 1 : 4} left={breakpoints.l ? 1 : 2} className='container' middle center>
                    {content.text && <h3 className='text' dangerouslySetInnerHTML={{__html:content.text}}></h3>}
                    {content.author && <h4 className='author'>{content.author}</h4>}
                </Cell>
            </Grid> 
        </QuoteStyled>
    )
}

export { Quote }


const QuoteStyled = styled.div`
    position:relative;

    .grid{
        max-width:1920px;
        margin:0 auto;
        padding: clamp(30px,10vw,60px) 5%;

        .container{
            z-index:1;
            grid-gap:1rem;

            .text{
                font-weight:100;
                font-size:1.3rem;
                text-transform:uppercase;
                text-align:center;
                font-size: 1.9rem;
                line-height:3rem;

                ${media.m`
                    font-size: 1.4rem;
                `}
            }

            .author{
                font-family:'Cabin', sans-serif;
                text-transform:uppercase;
                color:#c4cbd1;
                text-align:center;
                font-size: 1.2rem;
                margin-top:1rem;

                ${media.m`
                    font-size: 1rem;
                `}
            }
        }  
    }
`