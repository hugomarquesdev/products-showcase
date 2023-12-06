const initialState = {
    product: {
        open: false,
        id: null
    },
    form: {
        open: false,
        step: 1,
        options: {
            option1: '',
            option2: '',
            option3: '',
            option4: '',
        },
        price: '',
        date: '',
        description: '',
        data: {
            name: '',
            tel: '',
            email: '',
            address: ''
        }
    }
}

// PRODUCT IN CAROUSEL
    const SET_PRODUCT = 'SET_PRODUCT'

    export const setProduct = product => ({
        type: SET_PRODUCT, product
    })
// ---

// MULTIPLE STEP FORM - ORCAMENTO
    const SET_FORM = 'SET_FORM'

    export const setForm = form => ({
        type: SET_FORM, form
    })
// ---


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return { 
                ...state, 
                product: action.product
            }
        case SET_FORM:
            return {
                ...state,
                form: action.form
            }
        default:
            return state
    }
}