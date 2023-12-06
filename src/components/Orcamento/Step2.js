import React from 'react'
import { connect } from 'react-redux'
import { setForm } from '../../state/app'

const Step2 = ({ values, dispatch, content }) => {

    return (
        <>
            <div className='top'>
                <h3 className='title'>{content.title}</h3>
                <h4 className='subtitle'>{content.subtitle}</h4>
            </div>
            <section className='options'> 
                <label htmlFor="option1">{content.options.option1}
                    <input 
                        type="radio" 
                        id="option1" 
                        name="price" 
                        value={content.options.option1}
                        checked={ values.price === content.options.option1 ? true : false }
                        onChange={(e) => dispatch(setForm({ ...values, price: e.target.value }))} 
                    />
                </label>
                <label htmlFor="option2">{content.options.option2}
                    <input 
                        type="radio" 
                        id="option2" 
                        name="price" 
                        value={content.options.option2}
                        checked={ values.price === content.options.option2 ? true : false }
                        onChange={(e) => dispatch(setForm({ ...values, price: e.target.value }))} 
                    />
                </label>
                <label htmlFor="option3">{content.options.option3}
                    <input 
                        type="radio" 
                        id="option3" 
                        name="price" 
                        value={content.options.option3}
                        checked={ values.price === content.options.option3 ? true : false }
                        onChange={(e) => dispatch(setForm({ ...values, price: e.target.value }))} 
                    />
                </label>
            </section>
        </>
    )
}

export default connect(state => ({
    form: state.app.form
}), null)(Step2)