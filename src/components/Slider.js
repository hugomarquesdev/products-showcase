import React from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import { Image } from './Images'
import Slider from "react-slick"
import LeftArrow from '../images/left-arrow.svg'
import RightArrow from '../images/right-arrow.svg'


const SliderComponent = ({ content, dark }) => {
    const breakpoints = useBreakpoint()

    function NextArrow(props) {
        const { className, onClick, onKeyUp } = props
        return (
            <div className={className} onClick={onClick} onKeyUp={onKeyUp} role='button' tabIndex='0'>
                <RightArrow/>
            </div>
        )
    }

    function PrevArrow(props) {
        const { className, onClick, onKeyUp } = props
        return (
            <div className={className} onClick={onClick} onKeyUp={onKeyUp} role='button' tabIndex='0'>
                <LeftArrow/>
            </div>
        )
    }

    const sliderSettings = {
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
        pauseOnHover: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        fade: true
    }

    return(
        <SliderStyled dark={dark}>
            <div className='container'>
                    <Grid columns={breakpoints.xl ? 1 : 6} gap={breakpoints.xl ? '10vw' : '4vw'} className='grid'>
                        <Cell width={breakpoints.xl ? 1 : 2} className='content' middle center>
                            <span className='subtitle' >{content.info.subtitle}</span>
                            <h4 className='title' dangerouslySetInnerHTML={{ __html: content.info.title}}></h4>
                            <span className="chevron"></span>
                            <span className='text'>{content.info.text}</span>
                            <span className='name'>{content.info.name}</span>
                        </Cell>
                        <Cell width={breakpoints.xl ? 1 : 4} className='media-container'>
                            <Slider {...sliderSettings} className='slider'>
                                {content.images.map((image, i) => (
                                    <>
                                        <Image src={image.image} alt={image.alt} key={i}/>
                                    </>
                                ))}
                            </Slider>
                        </Cell> 
                    </Grid>                               
            </div>  
        </SliderStyled>
    )
}

export { SliderComponent }


const SliderStyled = styled.div`
    .container{
        max-width:1920px;
        margin:0 auto;
        padding: clamp(30px, 10vw, 60px) 5%;

        .grid{
            :last-child{
                margin-bottom:0;
            }

            ${media.xl`
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

                ${media.xl`
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
                    line-height:1.5rem;
                }

                .button{
                    margin:1.5rem auto 0 auto;
                }

                .name{
                    position: absolute;
                    width: 100%;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);

                    ${media.xl`
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
                .slick-slider{
                    overflow:hidden;
                    position:relative;
                    height:100%;

                    .slick-arrow{
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor:pointer;
                        z-index:1;

                        svg{
                            max-width:40px;

                            ${media.l`
                                max-width:20px;
                            `}
                        }
                    }

                    .slick-prev{
                        left:25px;

                        ${media.l`
                            left:10px;
                        `}
                    }

                    .slick-next{
                        right:25px;

                        ${media.l`
                            right:10px;
                        `}
                    }

                    .slick-list{
                        height:100%;

                        .slick-track{
                            display:flex;
                            height:100%;

                            .slick-slide{
                                position:relative;

                                > div{
                                    width:100%;
                                    height:100%;
                                }

                                .image{
                                    width:100%;
                                    height:100%;
                                    max-height:650px;

                                    ${media.l`
                                        max-height:30vh;
                                    `}
                                }
                            }
                        }
                    }
                }   
                
            }
        }  
    }
`