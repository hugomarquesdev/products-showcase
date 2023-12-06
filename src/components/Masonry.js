import React from 'react'
import styled from 'styled-components'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import { Image } from './Images'


const Masonry = ({ content }) => {
    const breakpoints = useBreakpoint()

    return(
        <MasonryStyled>
            <Grid flow="row dense" columns={breakpoints.l ? 4 : 8} gap={breakpoints.m ? '2vw' : '15px'} className='grid'>
                {content.map((content, i) => (
                    <Cell width={breakpoints.l ? 2 : content.width} height={breakpoints.l ? 1 : content.height} className='cell' key={i}>
                        <Image src={content.image} alt={content.alt}/>
                    </Cell>
                ))}
            </Grid> 
        </MasonryStyled>
    )
}

export { Masonry }


const MasonryStyled = styled.div`
    padding: clamp(30px,10vw,60px) 5%;
    max-width:1920px;
    margin:0 auto;

    .grid{
        .cell{
            box-shadow: 10px 10px 14px -12px rgb(27 28 34 / 80%);

            .image{
                width:100%;
                height:100%;
            }
        }
    }
`