import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setForm } from '../../state/app'
import axios from 'axios'
import { Image } from '../../components/Images'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { media } from '../MediaQueries'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'


const Orcamento = ({ dispatch, form, bgColor, content, notFixed }) => {
    const breakpoints = useBreakpoint()
    const { open, step, options, price, date, description, data } = form
    const values = { open, step, options, price, date, description, data }
    const [warning, setWarning] = useState(false)

    const Previous = (e) => {
        e.preventDefault()
        dispatch(setForm({ ...values, step: form.step - 1}))
        setWarning(false)
    }

    const Continue = () => {
        dispatch(setForm({ ...values, step: form.step + 1}))
        setWarning(false)
    }

    // CHECK IF INPUTS ARE EMPTY
        const ValidateStep1 = (e) => { // STEP 1
            e.preventDefault()
            form.options.option1 === '' && 
            form.options.option2 === '' && 
            form.options.option3 === '' && 
            form.options.option4 === '' ? 
                setWarning(true) 
            : 
                Continue()
        }

        const ValidateStep2 = (e) => { // STEP 2
            e.preventDefault()
            form.price === '' ?
                setWarning(true) 
            : 
                Continue()
        }

        const ValidateStep3 = (e) => { // STEP 3
            e.preventDefault()
            form.date === '' ?
                setWarning(true) 
            : 
                Continue()
        }

        const ValidateStep4 = (e) => { // STEP 4
            e.preventDefault()
            form.data.name === '' || 
            form.data.tel === '' || 
            form.data.email === '' || 
            form.data.address === '' ? 
                setWarning(true) 
            : 
                Continue()
        }
    // ---

    const Reset = (e) => { // RESET FORM
        e.preventDefault()
        dispatch(setForm({...form, 
            open: false, 
            step: 1,
            options: { ...form.options, 
                option1: '',
                option2: '',
                option3: '',
                option4: '' 
            },
            price: 1,
            date: '',
            description: '',
            data: { ...form.data, 
                name: '',
                tel: '',
                email: '',
                address: '' 
            } 
        }))
        notFixed && (window.location.href = '/') // IF IT'S NOT A POPUP, SEND TO HOMEPAGE
    }

    const formSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        
        formData.append("Nome", values.data.name)
        formData.append("Email", values.data.email)
        formData.append("Telefone", values.data.tel)
        formData.append("Código Postal", values.data.address)
        formData.append("Serviços", values.options.option1 + ' | ' + values.options.option2 + ' | ' + values.options.option3 + ' | ' + values.options.option4)
        formData.append("Preço", values.price)
        formData.append("Quando", values.date)
        values.description && formData.append("Descrição", values.description)
                
        axios({
            url: 'https://smartforms.dev/submit/615579f07a195017922d8b93',
            // url: 'https://invisual.pt/teste-form/lardarte/form-orcamento.php',
            method: 'post',
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            data: formData
        }).then(() => {
            typeof window !== "undefined" &&
                window.gtag("event", 'Click', {
                    event_category: "Formulário de Orçamento",
                    event_label: formData.get('Submetido')
                })
            dispatch(setForm({ ...values, step: form.step + 1}))
          }, error => {
              alert(error)
          })
    }

    function Form(){
        switch (form.step) {
            case 1: 
                return (
                    <>
                        <Step1 
                            values={ values }
                            content={content.step1}
                        />
                        {warning && <span className='error'>{content.form.warning}</span>}
                        <nav>
                            <button className='next' onClick={ ValidateStep1 }>{content.form.btnContinuar}</button>
                        </nav>
                    </>
                )
            case 2: 
                return (
                    <>
                        <Step2 
                            values={ values }
                            content={content.step2}
                        />
                        {warning && <span className='error'>{content.form.warning}</span>}
                        <nav>
                            <button className='prev' onClick={ Previous }>{content.form.btnRetroceder}</button>
                            <button className='next' onClick={ ValidateStep2 }>{content.form.btnContinuar}</button>
                        </nav>
                    </>
                )
            case 3: 
                return (
                    <>
                        <Step3
                            values={ values }
                            content={content.step3}
                        />
                        {warning && <span className='error'>{content.form.warning}</span>}
                        <nav>
                            <button className='prev' onClick={ Previous }>{content.form.btnRetroceder}</button>
                            <button className='next' onClick={ ValidateStep3 }>{content.form.btnContinuar}</button>
                        </nav>
                    </>
                )
            case 4: 
                return (
                    <>
                        <Step4
                            values={ values }
                            content={content.step4}
                        />
                        {warning && <span className='error data'>{content.form.warningData}</span>}
                        <nav>
                            <button className='prev' onClick={ Previous }>{content.form.btnRetroceder}</button>
                            <button className='next' onClick={ ValidateStep4 }>{content.form.btnContinuar}</button>
                        </nav>
                    </>
                )
            case 5: 
                return (
                    <>
                        <Step5
                            values={ values }
                            content={content.step5}
                        />
                        <nav>
                            <button className='prev' onClick={ Previous }>{content.form.btnRetroceder}</button>
                            <button type='submit' className='next' onClick={ formSubmit }>{content.form.btnFinalizar}</button>
                        </nav>
                    </>
                )
            // SUBMITED
            case 6: 
                return (
                    <>
                        {(breakpoints.m && form.step === 6) && 
                            <Image 
                                src='orcamento.png' 
                                alt='success'
                                style={{
                                    maxWidth: '130px',
                                    margin: '0 auto',
                                    width: '100%',
                                    marginBottom: '2rem'
                                }}
                            />
                        }
                        <div className='top success'>
                            <h3 className='title'>{content.step6.title}</h3>
                            <h4 className='subtitle'>{content.step6.subtitle}</h4>
                        </div>
                        <nav style={{marginTop:0}}>
                            <button className='next btn-success' onClick={ Reset }>{content.step6.success}</button>
                        </nav>
                    </>
                )
            default: 
                // DO NOTHING
            }
    }

    return(
        <OrcamentoStyled bgColor={bgColor} notFixed={notFixed}>
            <div className='container'>
                {!breakpoints.m &&
                    <div className='content'>
                        {form.step === 6 ? 
                            <Image src='orcamento.png' alt='success'/>
                        :
                            <>
                                <span className='step'>{content.content.step} {form.step} {content.content.stepOf}</span>
                                {!notFixed && <button className='close' onClick={ Reset }>{content.content.close}</button>}
                                <div className='text'>
                                    <h3>{content.content.title}</h3>
                                    <p>{content.content.text}</p>
                                </div>
                            </>
                        }
                        <hr/>
                    </div>
                }
                {breakpoints.m &&
                    <nav className='nav-mobile'>
                        {form.step !== 6 &&
                            <>
                                <span className='step'>{content.content.step} {form.step} {content.content.stepOf}</span>
                                {!notFixed && <button className='close' onClick={ Reset }>{content.content.close}</button>}
                            </>
                        }
                    </nav>
                }
                <div className='form'>
                    { Form() }
                </div>
            </div>
        </OrcamentoStyled>
    )  
}

export default connect(state => ({
    form: state.app.form
}), null)(Orcamento)

const OrcamentoStyled = styled.div`
    position: ${props => props.notFixed ? 'relative' : 'fixed'};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    z-index: 10;
    padding: ${props => props.notFixed ? 'clamp(30px,10vw,60px) 5% clamp(60px,10vw,120px) 5%' : 'clamp(30px,10vw,60px) 5%'};
    background: ${props => props.bgColor ? props.bgColor + 'D9' : '#1b1c22D9'};

    .container{
        max-width:1000px; 
        height:500px;
        margin:0 auto;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-column-gap:10%;
        padding: 3%;
        background:#fff;
        border-radius: 17px;

        ${media.m`
            position:relative;
            display: flex;
            flex-direction:column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 400px;
            padding: 25% 5%;
        `}

        .step{
            font-family: 'Cabin',sans-serif;
            font-weight: 600;
            font-size: 1.1rem;
            letter-spacing: 1px;
        }

        .close{
            background: transparent;
            border: 0;
            cursor: pointer;
            text-decoration: underline;
            color: #1b1c22;
            font-size:1rem;
            font-weight:600;
        }

        .content{
            position:relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items:center;

            .step{
                position:absolute;
                top:0;
                left:0;
            }

            .close{
                position: absolute;
                top: 0;
                right: 0;
            }

            .image{
                width:100%;
                max-width:170px;
            }

            .text{
                h3{
                    font-weight: 400;
                    text-transform: uppercase;
                    font-size: 1.4rem;
                    margin-bottom:2rem;
                }

                p{
                    font-size:1.2rem;
                    line-height:1.5;
                }
            }            

            hr{
                position: absolute;
                height: 100%;
                top: 0;
                right: -11.5%;
                margin: 0;
                border-color: #1b1c224d;
            }
        }

        .nav-mobile{
            position: absolute;
            width: 85%;
            display: flex;
            justify-content: space-between;
            top: 15px;
        }

        .form{
            display: flex;
            flex-direction: column;
            justify-content: center;

            ${media.m`
               width: 100%;
            `}

            .error{
                font-family: 'Cabin',sans-serif;
                font-size: 0.9rem;
                padding:1rem 4%;
                color:red;
            }

            .error.data{
                padding:1rem 0;
            }
            
            .top{
                margin-bottom:3rem; 

                ${media.m`
                    margin-bottom:2rem;
                `}

                .title{
                    font-weight: 800;
                    text-transform: uppercase;
                    font-size: 1.6rem;
                    text-align:center;
                    margin-bottom:0.5rem;
                }

                .subtitle{
                    font-family: 'Cabin',sans-serif;
                    font-weight: 600;
                    font-size: 1.1rem;
                    letter-spacing: 1px;
                    text-align:center;
                }

                .warning{
                    font-family: 'Cabin',sans-serif;
                    font-size: 0.9rem;
                }
            }

            .options{
                display: flex;
                flex-direction: column;
                gap:0.5rem;

                label{
                    display: flex;
                    justify-content: space-between;
                    background:#eeefed;
                    border-radius: 17px;
                    padding: 4%;
                    font-size: 1.2rem;
                }

                .input-box{ // INPUT TEXTS
                    position:relative;

                    input:focus + label,
                    input:focus + label,
                    input:not(:placeholder-shown) + label {
                        top: -20px;
                        left: 0;
                        font-size:0.9rem;
                    }

                    label,
                    input {
                        transition: all 0.3s ease;
                    }

                    label {
                        pointer-events: none;
                        color: #000;
                        position: absolute;
                        top: 5px;
                        left: 0;
                        font-size:1.2rem;
                        z-index: 2;
                        font-family: 'Cabin', sans-serif;
                        font-weight: 600;
                        background:none;
                        display:block;
                        padding:0;
                    }

                    input {
                        position: relative;
                        z-index: 1;
                        padding: 0;
                        height: 30px;
                        font-size:1.2rem;
                        border:0;
                        border-bottom:1px solid #1b1c22;
                        outline: none;
                        background-color:transparent;
                        width:100%;
                        box-sizing:border-box;
                    }
                }

                #message{
                    label{
                        position:static;
                    }
                    
                    textarea {
                        position: relative;
                        z-index: 1;
                        padding: 4px;
                        font-size:1.2rem;
                        border:1px solid #1b1c22;
                        outline: none;
                        background-color:transparent;
                        width:100%;
                        resize:none;
                        box-sizing:border-box;
                        margin-top:1rem;
                    }
                }
            }

            .options.gap{
                gap:2rem;
            }

            nav{
                display:flex;
                margin-top:3rem;
                justify-content:space-between;

                ${media.m`
                    margin-top:2rem;
                `}

                button{
                    font-family:'Exo', sans-serif;
                }

                .prev{
                    background: transparent;
                    border: 0;
                    cursor: pointer;
                    text-decoration: underline;
                    color: #1b1c22;
                    font-size:1rem;
                }

                .next{
                    display: block;
                    width:fit-content;
                    text-decoration: none;
                    color: #1b1c22;
                    border: 1px solid #1b1c22;
                    background-color: #fff;
                    padding: 1rem clamp(15px,5vw,70px);
                    border-radius: 17px;
                    text-align: center;
                    font-size:1.2rem;
                    transition: background-color .35s, color .35s;
                    margin-left:auto;

                    :hover{ 
                        color: #fff; 
                        background-color:#1b1c22;
                        cursor:pointer;
                    }  
                }

                .next.btn-success{
                    margin:0 auto;
                }
            }
        }
    }
`