import React from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import Button from './Button'
import { Image } from './Images'


const Projects = ({ content, dark, marginBottom }) => {
    const breakpoints = useBreakpoint()

    return(
        <ProjectStyled dark={dark} marginBottom={marginBottom}>
            {!breakpoints.l ? // DESKTOP
                <div className='container'>
                    {content.map((content, i) => (
                        (i % 2 === 0) ? // INVERT COLUMNS
                            <Grid columns={6} gap={'4vw'} className='grid'>
                                <Cell width={4} className='media-container'>
                                    {content.image && 
                                        <Image src={content.image} alt={content.alt}/>
                                    }
                                    {content.video &&
                                        <video preload="none" className='video' poster={content.poster} controls autoPlay playsInline loop muted>
                                            <source src={content.video} type="video/mp4" />
                                        </video>
                                    }
                                </Cell> 
                                <Cell width={2} className='content' middle center key={i}>
                                    <span className='subtitle' >{content.subtitle}</span>
                                    <h4 className='title' dangerouslySetInnerHTML={{ __html: content.title}}></h4>
                                    <span className="chevron"></span>
                                    <span className='text'  dangerouslySetInnerHTML={{ __html: content.text}}></span>
                                    {content.btn && 
                                        <Button 
                                            link={content.link} 
                                            text={content.btn}
                                            dark={dark ? true : false}
                                        />
                                    }
                                    <span className='name'>{content.name}</span>
                                </Cell>
                            </Grid>
                        :
                            <Grid columns={6} gap={'4vw'} className='grid'>
                                <Cell width={2} className='content' middle center key={i}>
                                    <span className='subtitle' >{content.subtitle}</span>
                                    <h4 className='title' dangerouslySetInnerHTML={{ __html: content.title}}></h4>
                                    <span className="chevron"></span>
                                    <span className='text'>{content.text}</span>
                                    <Button 
                                        link={content.link} 
                                        text={content.btn}
                                        dark={dark ? true : false}
                                    />
                                    <span className='name'>{content.name}</span>
                                </Cell>
                                <Cell width={4} className='media-container'>
                                    {content.image && 
                                        <Image src={content.image} alt={content.alt}/>
                                    }
                                    {content.video &&
                                        <video preload="none" className='video' poster={content.poster} controls autoPlay playsInline loop muted>
                                            <source src={content.video} type="video/mp4" />
                                        </video>
                                    }
                                </Cell> 
                            </Grid>   
                    ))}                      
                </div>
            : // MOBILE
                <div className='container'>
                    {content.map((content, i) => (
                        <Grid columns={1} gap={'10vw'} className='grid'>
                            <Cell width={1} className='content' middle center key={i}>
                                <span className='subtitle' >{content.subtitle}</span>
                                <h4 className='title' dangerouslySetInnerHTML={{ __html: content.title}}></h4>
                                <span className="chevron"></span>
                                <span className='text'>{content.text}</span>
                                <Button 
                                    link={content.link} 
                                    text={content.btn}
                                    dark={dark ? true : false}
                                />
                                <span className='name'>{content.name}</span>
                            </Cell>
                            <Cell width={1} className='media-container'>
                                {content.image && 
                                    <Image src={content.image} alt={content.alt}/>
                                }
                                {content.video &&
                                    <video preload="none" className='video' poster={content.poster} controls autoPlay playsInline loop muted>
                                        <source src={content.video} type="video/mp4" />
                                    </video>
                                }
                            </Cell> 
                        </Grid>   
                    ))}                      
                </div> 
            }       
        </ProjectStyled>
    )
}

export { Projects }


const ProjectStyled = styled.div`
    .container{
        max-width:1920px;
        margin:0 auto;
        padding: clamp(30px, 10vw, 60px) 5%;

        .grid{
            margin-bottom: ${props => props.marginBottom && '10rem'};

            :last-child{
                margin-bottom:0;
            }

            ${media.l`
                margin-bottom:7rem;
                text-align:center;
            `}

            .content{
                border-top: ${props => props.dark ? '1px solid #eeefed' : '1px solid #3b3d3f'};
                border-bottom: ${props => props.dark ? '1px solid #eeefed' : '1px solid #3b3d3f'};
                grid-gap:2vh;
                position:relative;
                color: ${props => props.dark && '#eeefed'};
                align-items:center;

                ${media.l`
                    padding: clamp(15px,3vw,25px) 0;
                `}

                .subtitle{
                    font-weight:100;
                    text-transform:uppercase;
                    font-size:1.3rem;
                }

                .title{
                    font-family:'Cabin', sans-serif;
                    font-weight:600;
                    font-size:2.5rem;
                }

                .text{
                    font-weight:100;
                    font-size:1.2rem;
                    max-width:450px;
                    margin:0 auto;
                    line-height:2rem;
                }

                .button{
                    margin:1rem auto 0 auto;
                }

                .name{
                    position: absolute;
                    width: 100%;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);

                    ${media.l`
                        position: unset;
                        transform: unset;
                    `}
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

            .media-container{
                max-height:650px;

                .image{
                    height:100%;
                }

                .video{
                    width:100%;
                    height:100%;
                    object-fit:cover;
                }
            }
        }  
    }
`