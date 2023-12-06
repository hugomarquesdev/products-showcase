import React from 'react'
import { connect } from 'react-redux'
import { setForm } from '../../state/app'

const Step1 = ({ values, dispatch, content }) => {

    return (
        <>
            <div className='top'>
                <h3 className='title'>{content.title}</h3>
                <h4 className='subtitle'>{content.subtitle}</h4>
            </div>
            <section className='options'>
                <label htmlFor="option1">{content.options.option1}
                    <input 
                        type="checkbox" 
                        id="option1" 
                        name="option1" 
                        checked={ values.options.option1 === '' ? false : true }
                        value={content.options.option1}
                        onChange={(e) => 
                            e.target.checked === true ? 
                                dispatch(setForm({...values, options: { ...values.options, option1: e.target.value } }))
                            : 
                                dispatch(setForm({...values, options: { ...values.options, option1: '' } })) 
                        }      
                    />
                </label>
                <label htmlFor="option2">{content.options.option2}
                    <input 
                        type="checkbox" 
                        id="option2" 
                        name="option2" 
                        checked={ values.options.option2 === '' ? false : true }
                        value={content.options.option2}
                        onChange={(e) => 
                            e.target.checked === true ? 
                                dispatch(setForm({...values, options: { ...values.options, option2: e.target.value } }))
                            : 
                                dispatch(setForm({...values, options: { ...values.options, option2: '' } }))
                        }      
                    />
                </label>
                <label htmlFor="option3">{content.options.option3}
                    <input 
                        type="checkbox" 
                        id="option3" 
                        name="option3" 
                        checked={ values.options.option3 === '' ? false : true }
                        value={content.options.option3}
                        onChange={(e) => 
                            e.target.checked === true ? 
                                dispatch(setForm({...values, options: { ...values.options, option3: e.target.value } }))
                            : 
                                dispatch(setForm({...values, options: { ...values.options, option3: '' } }))
                        }      
                    />
                </label>
                <label htmlFor="option4">{content.options.option4}
                    <input 
                        type="checkbox" 
                        id="option4" 
                        name="option4" 
                        checked={ values.options.option4 === '' ? false : true }
                        value={content.options.option4}
                        onChange={(e) => 
                            e.target.checked === true ? 
                                dispatch(setForm({...values, options: { ...values.options, option4: e.target.value } }))
                            : 
                                dispatch(setForm({...values, options: { ...values.options, option4: '' } }))
                        }      
                    />
                </label>
            </section>
        </>
    )
}

export default connect(state => ({
    form: state.app.form
}), null)(Step1)