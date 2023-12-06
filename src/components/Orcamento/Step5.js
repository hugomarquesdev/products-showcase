import React from 'react'
import { connect } from 'react-redux'
import { setForm } from '../../state/app'

const Step3 = ({ values, dispatch, content }) => {

    return (
        <>
            <div className='top'>
                <h3 className='title'>{content.title}</h3>
            </div>
            <section className='options'>
                <div className='input-box' id='message'>
                    <label htmlFor='message' className='label-text'>{content.description}</label>
                    <textarea 
                        name='message' 
                        placeholder=' ' 
                        rows="6"
                        value={ values.description }
                        onChange={(e) => dispatch(setForm({...values, description: e.target.value }))}
                    />                   
                </div>
            </section>
        </>
    )
}

export default connect(state => ({
    form: state.app.form
}), null)(Step3)