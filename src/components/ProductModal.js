import React from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import Slider from "react-slick"
import { Image } from './Images'
import Button from './Button'
import LeftArrow from '../images/left-arrow.svg'
import RightArrow from '../images/right-arrow.svg'
import { connect } from 'react-redux'
import { setProduct } from '../state/app'
// import { useQueryParam, NumberParam } from "use-query-params"
// import useScrollLock from '../components/utils/use-scroll-lock'


const ProductModal = ({ carousel, bgColor, product, dispatch }) => {
    const breakpoints = useBreakpoint()
    // const [url, setUrl] = useQueryParam("p", NumberParam)
    // const [lock, setLock] = useState(false)
    // useScrollLock(lock)

    // useEffect(() => {
    //     setUrl(productId)
    // }, [productId])
    
    // SCROLL LOCK
    // useEffect(() => {
    //     productId !== null ? setLock(true) : setLock(false)
    // },[productId])


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

    const productSliderSettings = {
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4500,
        pauseOnHover: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }

    return(
        <>
            {carousel.map((content, i) => (
                product.id === content.id &&
                    <ProductStyled bgColor={bgColor}>
                        <div className="product-popup">
                            {breakpoints.l &&
                                <hr 
                                    class='hr-text' 
                                    data-content='Fechar &nbsp; &nbsp; X'
                                    onClick={() => dispatch(setProduct({ open: false, id: null }))} 
                                    onKeyDown={() => dispatch(setProduct({ open: false, id: null }))}  
                                    role='button' 
                                    tabIndex={0}   
                                    aria-label="Fechar"         
                                />
                            }
                            <Grid columns={breakpoints.l ? 1 : 6} gap={breakpoints.l ? '5vw' : '4vw'} className='grid-product'>
                                <Cell width={breakpoints.l ? 1 : 3} className='image-wrapper' key={i} middle>
                                    <Slider {...productSliderSettings} className='image-slider'>
                                        {content.info.images.map((image, i) => (
                                            <>
                                                <Image src={image.image} alt={image.alt} key={i}/>
                                                {image.description &&
                                                    <div className='image-description'>
                                                        <span>{image.description}</span>
                                                    </div>
                                                }
                                            </>
                                        ))}
                                    </Slider>
                                </Cell>
                                
                                <Cell width={breakpoints.l ? 1 : 3} middle className='content-wrapper'>
                                    {!breakpoints.l &&
                                        <hr 
                                            class='hr-text' 
                                            data-content='Fechar &nbsp; &nbsp; X'
                                            onClick={() => dispatch(setProduct({ open: false, id: null }))} 
                                            onKeyDown={() => dispatch(setProduct({ open: false, id: null }))}  
                                            role='button' 
                                            tabIndex={0}   
                                            aria-label="Fechar"         
                                        />
                                    }
                                    <div className='content'>
                                        <span className='model'>{content.info.model}</span>
                                        <h2 className='title'>{content.info.title}</h2>
                                        <span className='description'>{content.info.description}</span>
                                        <div
                                            role='button' 
                                            tabIndex={0}   
                                            aria-label="Fechar"  
                                            onClick={() => dispatch(setProduct({ open: false, id: null }))} 
                                            onKeyDown={() => dispatch(setProduct({ open: false, id: null }))}
                                        >
                                            <Button 
                                                link='/contact/#form' 
                                                model={content.info.model}
                                                text={content.type === 'carpentry' ? 'Estou interessado'  : 'Estou interessado no ' + content.info.model}
                                            />
                                        </div>
                                        
                                    </div>   
                                </Cell>
                            </Grid>
                        </div>
                    </ProductStyled>
            ))}
        </>
    )
}

export default connect(state => ({
    product: state.app.product
}), null)(ProductModal)


const ProductStyled = styled.div`
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:8;
    background-color: ${props => props.bgColor && props.bgColor};

    ${media.l`
        z-index:99;
    `}

    .product-popup{
        max-width:1920px;
        margin:0 auto;
        padding: clamp(30px, 5vw, 60px) 5%;
        height:60vh;

        ${media.l`
            height:auto;
        `}

        .hr-text {
            cursor:pointer;
            width:100%;
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
            outline: 0;
            border: 0;
            font-family: 'Cabin', sans-serif;
            font-weight:600;
            color: #1b1c22;

            ${media.l`
                padding: 0 5%;
                box-sizing: border-box;
                top:5%;
            `}
            
            &:before {
                content: '';
                background: #1b1c22;
                position: absolute;
                left: 0;
                top: 50%;
                width: 100%;
                height: 1px;
            }
            
            &:after {
                content: attr(data-content);
                position: relative;
                display: inline-block;
                padding: 0 1.5rem;
                line-height: 1.5rem;
                color: #1b1c22;
                background-color: ${props => props.bgColor && props.bgColor};
                left:70%;
            }
        }

        .grid-product{
            position:relative;
            height:100%;

            .image-wrapper{
                display:block;

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

                                    ${media.l`
                                        max-height:30vh;
                                    `}
                                }

                                .image-description{
                                    position: absolute;
                                    bottom: 0;
                                    text-align: center;
                                    width: 100%;
                                    background-color:${props => props.bgColor && props.bgColor + 'DD'};
                                    padding: 0.5rem 0;
                                    
                                    span{
                                        font-weight:100;
                                        font-style:italic;
                                        font-size: 1.2rem;
                                        line-height: 1.5;
                                    }
                                }
                            }
                        }
                    }
                }    
            }    

            .content-wrapper{
                position:relative;
                border-bottom:1px solid #1b1c22;

                ${media.l`
                    border-bottom:none;
                `}

                .content{
                    max-width:550px;
                    display:flex;
                    flex-direction:column;
                    gap:3vh;

                    ${media.l`
                        gap:3vh;
                        max-width:unset;
                    `}
                    
                    .model{
                        text-transform: uppercase;
                        font-weight:100;
                        font-size:1.2rem;
                    }

                    .title{
                        font-family: 'Cabin', sans-serif;
                        font-weight:600;
                        letter-spacing: 2px;
                        font-size:2.2rem;
                        line-height:1;

                        ${media.l`
                            font-size:1.5rem;
                        `}
                    }

                    .description{
                        font-weight:100;
                        font-style:italic;
                        font-size: 1.2rem;
                        line-height: 1.5;
                        
                        ${media.l`
                            font-size:1.1rem;
                        `}
                    }

                    .button a{
                        ${media.l`
                            padding: 15px clamp(15px,5vw,35px);
                            margin:0 auto;
                        `}
                    }
                }   
            }   
        }
    }
`