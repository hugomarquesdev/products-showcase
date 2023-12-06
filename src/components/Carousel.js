import React from 'react'
import styled from 'styled-components'
import Slider from "react-slick"
import { Image } from './Images'
import { connect } from 'react-redux'
import { setProduct } from '../state/app'


const Carousel = ({ carousel, kitchen, carpentry, dispatch }) => {

    const sliderSettings = {
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5500,
        centerMode: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }

    return(
        <>
            <CarouselStyled>
                <Slider {...sliderSettings}>
                    {carousel.map((content, i) => (
                        kitchen ?
                            (content.type === 'kitchen' &&
                                <div
                                    className='content' 
                                    key={i} 
                                    onClick={() => dispatch(setProduct({ open: true, id: content.id }))}
                                    onKeyDown={() => dispatch(setProduct({ open: true, id: content.id }))}
                                    role='button' 
                                    tabIndex={0}
                                >
                                    <Image src={content.image} alt={content.alt}/>
                                </div>
                            )
                        :
                        carpentry ?
                            (content.type === 'carpentry' &&
                                <div
                                    className='content' 
                                    key={i} 
                                    onClick={() => dispatch(setProduct({ open: true, id: content.id }))}
                                    onKeyDown={() => dispatch(setProduct({ open: true, id: content.id }))}
                                    role='button' 
                                    tabIndex={0}
                                >
                                    <Image src={content.image} alt={content.alt}/>
                                </div>
                            )
                        :
                            <>
                                <div
                                    className='content' 
                                    key={i} 
                                    onClick={() => dispatch(setProduct({ open: true, id: content.id }))} 
                                    onKeyDown={() => dispatch(setProduct({ open: true, id: content.id }))} 
                                    role='button' 
                                    tabIndex={0}
                                >
                                    <Image src={content.image} alt={content.alt}/>
                                </div>
                            </>
                    ))}
                </Slider>
            </CarouselStyled>
        </>
    )
}

export default connect(state => ({
    product: state.app.product
}), null)(Carousel)


const CarouselStyled = styled.div`
    padding: clamp(30px,10vw,60px) 0;

    .slick-slider{
        overflow:hidden;

        .slick-track{
            display:flex;
            gap:50px;

            .slick-slide{
                cursor:pointer;
                box-shadow: 10px 10px 14px -12px rgb(27 28 34 / 80%);

                .image{
                    height:45vh;
                    max-height:600px;
                }
            }
        }
    }
`