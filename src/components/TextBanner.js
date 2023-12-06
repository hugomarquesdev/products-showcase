import React from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import Button from './Button'


const TextBanner = ({ content, carpentry, dark }) => {
    const breakpoints = useBreakpoint()

    return(
        <>
            <BannerStyled dark={dark}>
                <Grid columns={breakpoints.l ? 1 : 6} gap={breakpoints.m ? '4vw' : '25px'} className='grid'>
                    {content.subtitle &&
                        <Cell width={breakpoints.l ? 1 : 4} left={breakpoints.l ? 1 : 2} center middle>
                            <span className='subtitle'>{content.subtitle}</span>
                        </Cell>
                    }
                    {content.title &&
                        <Cell width={breakpoints.l ? 1 : 4} left={breakpoints.l ? 1 : 2} center middle>
                            <h4 dangerouslySetInnerHTML={{__html: content.title}}></h4>
                        </Cell>
                    }
                    {content.text &&
                        <Cell width={breakpoints.l ? 1 : 4} left={breakpoints.l ? 1 : 2} center middle>
                            <span className='text' dangerouslySetInnerHTML={{__html: content.text}}></span>
                        </Cell>
                    }
                    {content.btn &&
                        <Cell width={breakpoints.l ? 1 : 4} left={breakpoints.l ? 1 : 2} center middle>
                            <Button link={content.link} text={content.btn} dark={dark ? true : false}/>
                        </Cell>
                    }
                </Grid> 

                {carpentry &&
                    <Grid columns={breakpoints.xl ? 1 : 6} gap={breakpoints.m ? '4vw' : '25px'} className='grid-carpentry'>
                        <Cell width={breakpoints.xl ? 1 : 6} left={breakpoints.xl ? 1 : 1} className='btns'>
                            {content.carpentry.map((btn, i) => (
                                <Button link={btn.link} text={btn.btn} key={i} dark={dark ? true : false} transparent/>
                            ))}
                        </Cell>
                    </Grid>
                }
            </BannerStyled>
        </>
    )
}

export { TextBanner }


const BannerStyled = styled.div`
    padding: clamp(30px,10vw,60px) 5%;

    .grid{
        max-width:1920px;
        margin:0 auto;

        .subtitle{
            font-weight:100;
            font-size:1.3rem;
            text-transform:uppercase;
            text-align:center;
            font-size: 1.2rem;
            color: ${props => props.dark ? '#eeefed' : '#1b1c22'};

            ${media.m`
                font-size: 1.2rem;
            `}
        }

        h4{
            font-weight:100;
            text-transform:uppercase;
            text-align:center;
            font-size: 3.5rem;
            color: ${props => props.dark ? '#eeefed' : '#1b1c22'};

            ${media.m`
                font-size: 2.5rem;
            `}
        }

        .text{
            font-weight:100;
            font-size:1.3rem;
            text-align:center;
            line-height:2rem;
            margin-top: clamp(15px,3vw,30px);
            color: ${props => props.dark ? '#eeefed' : '#1b1c22'};
        }

        .button{
            margin:0 auto;
        }
    }

    .grid-carpentry{
        max-width:1920px;
        margin:0 auto;
        padding: clamp(30px, 10vw, 60px) 5% 0 5%;

        .btns{
            display: flex;
            flex-wrap: wrap;
            justify-content:center;
            gap:1rem;
            max-width:1200px;
            margin:0 auto;

            .button{
                pointer-events:none;
                
                ${media.xl`
                    flex: 1 0 21%;
                `}

                a{
                    width:20vw;
                    max-width:180px;
                    padding: 25px clamp(15px,5vw,35px);
                    color: ${props => props.dark ? '#eeefed' : '#1b1c22'};
                    box-shadow: ${props => props.dark && '5px 5px 15px 0px rgb(0 0 0 / 80%)'};

                    ${media.xl`
                        width:auto;
                        max-width:unset;
                    `}
                }
            }

            
        }
    }
`