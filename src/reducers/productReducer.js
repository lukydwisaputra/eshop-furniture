const INITIAL_STATE = {
    name: '',
    description: '',
    brand: '',
    category: '',
    images: '',
    price: 0,
    stock: 0,
    id: null
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAILS':
            return { ...state, ...action.payload }
        default:
            return state;
    }
}