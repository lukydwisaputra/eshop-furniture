// di klasifikasikan datanya agar proses maintanance nya lebih mudah

// default value seperti useState()
const INITIAL_STATE = {
    idusers: null,
    username: '',
    email: '',
    age: null,
    city: '',
    role: '',
    status_id: null,
    status: '',
    cart: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            // delete action.payload.password;
            console.log('userReducer', action.payload)
            return { ...state, ...action.payload }
        case 'LOGOUT_SUCCESS':
            return INITIAL_STATE;
        default:
            return state;
    }
}