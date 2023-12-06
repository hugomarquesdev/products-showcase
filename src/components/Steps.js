import React from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import { motion } from "framer-motion"
import { InView } from 'react-intersection-observer'


const Steps = ({ content }) => {
    const breakpoints = useBreakpoint()

    const variants = {
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

    return(
        <StepsStyled>
            <Grid columns={breakpoints.l ? 1 : 6} gap={0} className='grid'>
                <Cell width={breakpoints.l ? 1 : 4} left={breakpoints.l ? 1 : 2} className='title' middle center>
                    <h1>{content.title}</h1>
                </Cell> 
                {content.step.map((step, i) => (
                    <Cell width={breakpoints.l ? 1 : 6} className='cell' key={i}>
                        <InView>
                            {({ inView, ref }) => (
                                <motion.div
                                    initial='hidden'
                                    animate={inView ? 'visible' : 'hidden'}
                                    variants={variants}
                                    ref={ref}
                                > 
                                    <div className='content'>
                                        <span className='num'>{step.num}</span>
                                        <h3 className='cell-title'>{step.title}</h3>
                                        <span className='cell-text'>{step.text}</span>
                                    </div>
                                </motion.div>
                            )}
                        </InView>
                    </Cell>
                ))}    
            </Grid> 
        </StepsStyled>
    )
}

export { Steps }


const StepsStyled = styled.div`
    position:relative;
    padding: clamp(30px,10vw,60px) 5%;

    .grid{
        max-width:1920px;
        margin:0 auto;
        padding: 0 5%;

        .title h1{
            text-align:center;
            text-transform:uppercase;
            font-weight:200;
            font-size:5rem;
            padding-bottom: clamp(45px,15vw,150px);

            ${media.l`
                font-size:4rem;
            `}

            ${media.m`
                font-size:3rem;
            `}

            ${media.s`
                font-size:2.5rem;
            `}
        }

        .cell{
            border-top: 1px solid #eeefed;
            border-bottom: 1px solid #eeefed;
            position:relative;

            .content{
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:5%;
                padding: clamp(25px, 3vw, 50px) 0;

                ${media.xl`
                    display:block;
                `}

                .num{
                    position:absolute;
                    top: 50%;
                    left: -2.5rem;
                    transform: translateY(-50%);
                    font-family:'Cabin', sans-serif;
                    font-weight:bold;
                    font-size:1rem;

                    ${media.xl`
                        display:block;
                        position:static;
                        transform:unset;
                    `}
                }

                .cell-title{
                    font-family:'Cabin', sans-serif;
                    font-weight:600;
                    font-size:2rem;

                    ${media.xl`
                        margin:0.5rem 0;
                    `}
                }

                .cell-text{
                    font-weight:100;
                    font-size:1.2rem;
                    line-height:2rem;
                    max-width:600px;
                }
            }      
        }
    }
`