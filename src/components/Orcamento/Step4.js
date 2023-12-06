import React from 'react'
import { connect } from 'react-redux'
import { setForm } from '../../state/app'

const Step3 = ({ values, dispatch, content }) => {

    return (
        <>
            <div className='top'>
                <h3 className='title'>{content.title}</h3>
                <span className='warning'>{content.subtitle}</span>
            </div>
            <section className='options gap'>
                <div className='input-box'>
                    <input 
                        type="text" 
                        id="option1" 
                        name="name"
                        placeholder=' ' 
                        value={ values.data.name }
                        onChange={(e) => dispatch(setForm({...values, data: { ...values.data, name: e.target.value } }))}      
                    />
                    <label htmlFor='name' className='label-text'>{content.options.name}</label>
                </div>
                <div className='input-box'>
                    <input 
                        type="number" 
                        id="option1" 
                        name="telefone"
                        placeholder=' ' 
                        value={ values.data.tel }
                        onChange={(e) => dispatch(setForm({...values, data: { ...values.data, tel: e.target.value } }))}      
                    />
                    <label htmlFor='name' className='label-text'>{content.options.tel}</label>
                </div>
                <div className='input-box'>
                    <input 
                        type="email" 
                        id="option1" 
                        name="email"
                        placeholder=' ' 
                        value={ values.data.email }
                        onChange={(e) => dispatch(setForm({...values, data: { ...values.data, email: e.target.value } }))}      
                    />
                    <label htmlFor='name' className='label-text'>{content.options.email}</label>
                </div>
                <div className='input-box'>
                    <input 
                        type="text" 
                        id="option1" 
                        name="codigo-postal"
                        placeholder=' ' 
                        value={ values.data.address }
                        onChange={(e) => dispatch(setForm({...values, data: { ...values.data, address: e.target.value } }))}      
                    />
                    <label htmlFor='name' className='label-text'>{content.options.address}</label>
                </div>
            </section>
        </>
    )
}

export default connect(state => ({
    form: state.app.form
}), null)(Step3)