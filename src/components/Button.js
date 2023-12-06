import React from "react"
import styled from 'styled-components'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { setForm } from '../state/app'
import { media } from './MediaQueries'

const Button = ({link, text, dark, transparent, dispatch, form, model}) => {
    return(
        <>
            <ButtonStyled dark={dark} transparent={transparent} className='button'>
                {link === 'orcamento' ?
                    <button className='button' onClick={() => dispatch(setForm({...form, open:true }))}>
                        <span className='text-btn'>{text}</span>
                    </button>
                :
                    <Link 
                        to={link} 
                        className='button'
                        state={{ model: model }}
                    >
                        <span className='text-btn'>{text}</span>
                    </Link>
                }
            </ButtonStyled>
        </>
    )
}

export default connect(state => ({
    form: state.app.form
}), null)(Button)

const ButtonStyled = styled.div`
    .button{
        display: block;
        width:fit-content;
        text-decoration: none;
        color: ${props => props.transparent ? '#1b1c22' : '#eeefed'};
        border: ${props => props.dark ? '1px solid #e8eae5' : props.transparent ? 'none' : '1px solid #1b1c22'};
        background: ${props => props.transparent ? 'transparent' : '#1b1c22'};
        padding: 20px clamp(15px, 5vw, 35px);
        border-radius: 17px;
        letter-spacing: 1px;
        text-align: center;
        position: relative;
        transition: all .35s;
        cursor:pointer;
        box-shadow: ${props => props.transparent ? '2px 6px 14px -4px rgb(27 28 34 / 65%)' : props.dark ? '18px 14px 14px -12px rgb(0 0 0 / 80%)' : '10px 10px 14px -12px rgb(27 28 34 / 80%)'};
        font-family:'Exo', sans-serif;
        font-weight:600;
        font-size:1rem;

        .text-btn{
            position: relative;
            z-index: 2;
            white-space:nowrap;

            ${media.s`
                white-space: break-spaces;
            `}
        }

        :after{
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            background: #eeefed;
            border-radius: 17px;
            transition: all .35s;
            opacity:0;
        }

        ${props => props.dark ?
            ':hover{ color: #1b1c22; } :hover:after{ width: 100%; opacity:1; }'
        : props.transparent ?
            ':hover{ box-shadow: 2px 6px 14px 0 rgb(27 28 34 / 65%); }'
        : 
            ':hover{ box-shadow: 10px 10px 14px -5px rgb(27 28 34 / 80%); }'
        }
        
    } 
`