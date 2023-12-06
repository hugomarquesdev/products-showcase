import React from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import Button from '../components/Button'
import { Image } from '../components/Images'


const Testimonial = ({ content, bgColor, dark }) => {
    const breakpoints = useBreakpoint()

    return(
        <TestimonialStyled bg={content.bg} bgColor={bgColor} dark={dark}>
            {content.bg && <div className='image'><Image src={content.bg} alt={content.alt}/></div>}
            <Grid columns={breakpoints.l ? 1 : 6} gap={breakpoints.m ? '4vw' : '10%'} className='grid'>
                <Cell width={breakpoints.l ? 1 : 4} left={breakpoints.l ? 1 : 2} className='container' middle center>
                    {content.subtitle && <span className='subtitle'>{content.subtitle}</span>}
                    {content.title && <h3 className='title'>{content.title}</h3>}
                    <span className="chevron"></span>
                    {content.btn && <Button link={content.link} text={content.btn} dark={dark ? true : false}/>}
                </Cell>
            </Grid> 
        </TestimonialStyled>
    )
}

export { Testimonial }


const TestimonialStyled = styled.div`
    position:relative;
    overflow:hidden;
    margin: clamp(30px,10vw,60px) 0 0 0;
    
    .image{
        img{
            position:absolute;
            width:100%;
            top:0;
            left:0;
            z-index:0;   
            
            ${media.m`
                height:100%;
            `}
        }

        ::before{
            content:'';
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background-color:${props => props.bgColor ? props.bgColor : '#d1cbc4'};
            opacity:0.8;
            z-index:1;
        }
    }
    

    .grid{
        max-width:1920px;
        margin:0 auto;
        padding: ${props => props.bg ? 'clamp(30px, 10vw, 150px)' : 'clamp(30px, 10vw, 60px)'} 5%;

        .container{
            z-index:1;
            grid-gap:1rem;
            color: ${props => props.dark ? '#eeefed' : '#1b1c22'};

            .subtitle{
                font-weight:100;
                text-transform:uppercase;
                font-size:1.2rem;

                ${media.m`
                    font-size: 1.2rem;
                `}
            }

            .title{
                font-family:'Cabin', sans-serif;
                font-weight:600;
                font-size:2rem;
                max-width: 600px;
                margin: 0 auto;
                text-transform:uppercase;
            }

            .button{
                display:flex;
                justify-content:center;
            }

            .chevron::before {
                border-style: solid;
                border-width: 0.15em 0.15em 0 0;
                content: '';
                display: inline-block;
                height: 0.45em;
                top: 0;
                left: 0;
                position: relative;
                transform: rotate(-45deg);
                width: 0.45em;
                vertical-align: bottom;
            }   
        }    
    }
`