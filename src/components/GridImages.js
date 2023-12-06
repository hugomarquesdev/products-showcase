import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby-plugin-react-i18next'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import { Image } from './Images'


const GridImages = ({ content }) => {
    const breakpoints = useBreakpoint()

    return(
        <ImagesStyled>
            <Grid columns={breakpoints.l ? 1 : 6} gap='4vw' className='grid'>
                {content.map((content, i) => (
                    <Cell width={breakpoints.l ? 1 : 3} className='container' key={i}>
                        <Link to={content.link} style={{textDecoration:'none'}}>
                            <Image src={content.image} alt={content.alt}/>
                            <div className='content'>
                                <h3 className='title'>{content.title}</h3>
                                <span className='text'>{content.text}</span>
                                <span className="chevron"></span>
                                <Link to={content.link} className='more'>{content.link_text}</Link>
                            </div>
                        </Link>
                    </Cell>
                ))}
            </Grid> 
        </ImagesStyled>
    )
}

export { GridImages }


const ImagesStyled = styled.div`
    position:relative;
    padding: clamp(30px,10vw,60px) 5%;

    .grid{
        max-width:1920px;
        margin:0 auto;

        .container{
            position:relative;
            height:550px;
            overflow:hidden;

            ${media.xl`
                height:400px;
            `}

            ${media.s`
                height:300px;
            `}

            .image{
                position:absolute;
                width:100%;
                height:100%;
                top:0;
                left:0;
                z-index:0;
            }

            ::before{
                content:'';
                position:absolute;
                width:100%;
                height:100%;
                top:0;
                left:0;
                z-index:1;
                opacity:0;
            }

            ::after{
                content:'';
                position:absolute;
                width:100%;
                height:100%;
                top:0;
                left:0;
                z-index:1;
                background: linear-gradient(0deg, rgba(0,0,0,1) 1%, rgba(0,0,0,0) 100%);
            }

            @media(hover:hover){
                ::before{
                    background:#eeefed80;
                    opacity:1;
                    transition: opacity 0.5s;
                }

                ::after{
                    background: linear-gradient(0deg, rgba(0,0,0,1) 1%, rgba(0,0,0,0) 45%);
                    opacity:0;
                    transition: opacity 0.5s;
                }

                .title{
                    transform: translateY(400%);
                    transition:transform 0.3s;
                }

                .text{
                    opacity:0;
                    transition:opacity 0.5s;
                }

                .chevron::before {
                    opacity:0;
                    transition:opacity 0.5s;
                    transition-delay: 0.2s;
                }

                .more{
                    opacity:0;
                    transition:opacity 0.5s;
                    transition-delay: 0.4s;
                }
                
                :hover{
                    ::before{
                        opacity:0;
                    }

                    ::after{
                        opacity:1;
                    }

                    .content .title{
                        transform: translateY(0);
                    }

                    .content .text, .content .chevron::before, .content a{
                        opacity:1;
                    }
                }
            }

            .content{
                position:relative;
                box-sizing:border-box;
                height:100%;
                display:flex;
                flex-direction: column;
                align-items: center;
                justify-content:flex-end;
                margin: 0 auto;
                text-align: center;
                gap:0.5rem;
                padding: clamp(30px,10vw,60px) 5%;
                z-index:2;
                color:#eeefed;

                .title{
                    font-family:'Cabin',sans-serif;
                    font-weight:bold;
                    text-transform:uppercase;
                    font-size:1.5rem;
                }

                .text{
                    font-weight: 100;
                    font-size: 1.2rem;
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

                .more{
                    text-decoration:underline;
                    color:#eeefed;
                }
            }
        }
    }
`