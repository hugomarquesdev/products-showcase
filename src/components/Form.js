import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { media } from './MediaQueries'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Grid, Cell } from "styled-css-grid"
import { Image } from './Images'
import axios from 'axios'

const Form = ({ content, model }) => {
    const breakpoints = useBreakpoint()
    const [files, setFiles] = useState() 
    const form = useRef()
    const [success, setSuccess] = useState(false)

    const formSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(form.current)
                
        axios({
            url: 'https://smartforms.dev/submit/614080b47a195017922d7ffc',
            method: 'post',
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            data: formData
        }).then(() => {
            typeof window !== "undefined" &&
                window.gtag("event", 'Click', {
                    event_category: "Formulário de Contacto",
                    event_label: formData.get('Submetido')
                })
            setSuccess(true)
            form.current.reset()
          })
    }

    return(
        <FormStyled>
            <div className='banner'>
                <Grid columns={breakpoints.l ? 1 : 6} gap={breakpoints.l ? '10vw' : '4vw'} className='grid'>
                    <Cell width={breakpoints.l ? 1 : 4} left={breakpoints.l ? 1 : 2}>
                        <h1 dangerouslySetInnerHTML={{ __html: content.title}}></h1>
                        {!breakpoints.l && <div id='form'/>}
                    </Cell>
                    <Cell width={breakpoints.l ? 1 : 3} className='media-container'>
                        <Image src={content.image} alt={content.alt}/> 
                        {breakpoints.l && <div id='form'/>}
                        <span className='text'>{content.data.warning}</span>                
                    </Cell>
                    <Cell width={breakpoints.l ? 1 : 3} className='right' middle>
                        <form method="POST" ref={form} onSubmit={formSubmit}>
                            <div className='input-box' id='name'>
                                <input type='text' name='Name' placeholder=' ' required/>
                                <label htmlFor='name'>{content.data.name}</label>
                            </div>
                            <div className='input-box' id='email'>
                                <input type='email' name='Email' placeholder=' ' required/>
                                <label htmlFor='email'>{content.data.email}</label>
                            </div>
                            <div className='input-box' id='subject'>
                                <input type='text' name='Subject' value={model && model} placeholder=' ' required/>
                                <label htmlFor='subject'>{content.data.subject}</label>
                            </div>
                            <div className='input-box' id='contact'>
                                <input type='number' name='Contact' placeholder=' ' required/>
                                <label htmlFor='contact'>{content.data.contact}</label>
                            </div>
                            <div className='input-box' id='message'>
                                <label htmlFor='message'>{content.data.message}</label>
                                <textarea name='Message' placeholder=' ' rows="5" required/>
                            </div>
                            <button className='btn' type="submit">
                                <span>{content.data.submit}</span>
                            </button>
                            <div className="file-input">
                                <input type="file" id="file" name='File' className="file" multiple onChange={(e) => setFiles(e.target.files)}/>
                                <label htmlFor="file">{content.data.files}</label>
                                <div className='files'>
                                    {files && (
                                        Array.from(files).map((file, i) => (
                                            <p className="file-name">
                                                {file.name}
                                            </p> 
                                        ))
                                    )}
                                </div>   
                            </div>
                            {success && 
                                <div className='success'>
                                    <p><b>{content.success.title}</b></p>
                                    <p>{content.success.description}</p>
                                </div>
                            }
                        </form>
                    </Cell> 
                </Grid>
            </div>  
        </FormStyled>
    )
}

export { Form }


const FormStyled = styled.div`
    position:relative;
    overflow:hidden;
    padding: clamp(30px, 10vw, 60px) 5%;


    .banner{
        max-width:1920px;
        margin:0 auto;

        .grid{            
            h1{
                text-align:center;
                text-transform:uppercase;
                font-weight:200;
                font-size:4rem;
                padding-bottom: clamp(30px, 10vw, 60px);
                z-index:2;

                ${media.xl`
                    padding-bottom: 0;
                `}

                ${media.l`
                    font-size:3rem;
                `}

                ${media.m`
                    font-size:2.5rem;
                    padding-bottom:0;
                `}

                ${media.s`
                    font-size:2rem;
                `}
            }

            .media-container{
                z-index:2;
                max-height:750px;

                .image{
                    height:100%;
                    margin-bottom:1rem;
                }

                .text{
                    font-weight:100;
                    font-size:0.8rem;
                }
            }

            .right{
                ${media.m`
                    margin-top:1.7rem;
                `}

                ${media.s`
                    margin-top:4rem;
                `}

                form{
                    display:grid;
                    grid-template-areas: 'name name' 'email email' 'subject contact' 'message message';
                    grid-template-columns: repeat(2,1fr);
                    grid-gap: 5vh 3vh;

                    #name{
                        grid-area:name;
                    }
                    #email{
                        grid-area:email;
                    }
                    #subject{
                        grid-area:subject;
                    }
                    #contact{
                        grid-area:contact;
                    }
                    #message{
                        grid-area:message;
                    }

                    .input-box{
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
                            top: 0;
                            left: 0;
                            font-size:1.1rem;
                            z-index: 2;
                            font-family: 'Cabin', sans-serif;
                            font-weight: 600;
                        }

                        input {
                            position: relative;
                            z-index: 1;
                            padding: 0;
                            height: 30px;
                            font-size:1.1rem;
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
                            font-family: 'Cabin', sans-serif;
                            font-weight: 600;
                            font-size:1.3rem;
                            border:1px solid #1b1c22;
                            outline: none;
                            background-color:transparent;
                            width:100%;
                            box-sizing:border-box;
                            margin-top:1rem;
                        }
                    }

                    .btn{
                        display: block;
                        width:fit-content;
                        text-decoration: none;
                        color: #1b1c22;
                        border: none;
                        background: transparent;
                        padding: 20px clamp(15px, 5vw, 35px);
                        border-radius: 17px;
                        letter-spacing: 1px;
                        text-align: center;
                        position: relative;
                        transition: all .35s;
                        box-shadow: 2px 6px 14px -4px rgb(27 28 34 / 65%);

                        span{
                            white-space:nowrap;
                            font-size:0.9rem;
                            font-family:'Exo', sans-serif;
                            font-weight:600;

                            ${media.s`
                                white-space: break-spaces;
                            `}
                        }

                        :hover{ 
                            cursor:pointer;
                            box-shadow: 2px 6px 14px 0 rgb(27 28 34 / 65%); 
                        }
                    }

                    .file-input{
                        display:flex;
                        justify-content:flex-end;
                        align-items:center;
                        position:relative;

                        .file {
                            opacity: 0;
                            width: 0.1px;
                            height: 0.1px;
                            position: absolute;
                        }

                        label {
                            display: block;
                            position: relative;                     
                            cursor: pointer;
                            font-size:0.9rem;
                            font-family:'Exo', sans-serif;
                            font-weight:600;
                            text-decoration:underline;
                        }

                        .files{
                            position: absolute;
                            right: 0;
                            top:120%;
                            max-height: 100px;
                            overflow-y: scroll;

                            .file-name {
                                text-align:right;
                                padding-right: 10px;
                            }
                        }
                    }
                }
            }  
        }  
    }
`