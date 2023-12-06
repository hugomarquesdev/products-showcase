import React from 'react'
import styled from 'styled-components'
import { Grid, Cell } from "styled-css-grid"


const Contact = ({ content }) => {
    return(
        <ContactStyled>
            <div className='container'>
                <Grid columns={1} gap={'10vw'} className='grid'>
                    <Cell width={1} className='content' middle center>
                        <h4 className='title'>{content.title}</h4>
                        {content.data.map((contact, i) => (
                            <a href={contact.link} target='_blank' rel='noreferrer' aria-label="Contact" key={i} dangerouslySetInnerHTML={{ __html: contact.text}}></a>
                        ))}
                    </Cell>
                </Grid>                     
            </div>  
        </ContactStyled>
    )
}

export { Contact }


const ContactStyled = styled.div`
    .container{
        max-width:1920px;
        margin:0 auto;
        padding: clamp(30px,10vw,60px) 5%;

        .grid{
            text-align:center;

            .content{
                border-top: 1px solid #3b3d3f;
                border-bottom: 1px solid #3b3d3f;
                grid-gap:2vh;
                position:relative;
                align-items:center;
                padding: clamp(15px,3vw,25px) 0;

                .title{
                    font-family:'Cabin', sans-serif;
                    font-weight:600;
                    font-size:2.5rem;
                }

                a{
                    font-weight:100;
                    font-size:1.2rem;
                    max-width:450px;
                    margin:0 auto;
                    line-height:1.5rem;
                }
            }
        }  
    }
`