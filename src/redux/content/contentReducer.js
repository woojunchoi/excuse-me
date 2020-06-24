const initialState = {
    color: 'black',
    sound: 'bell',
    flash: false
}


const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {
                ...state,
                color: action.payload.color
            }
        case 'CHANGE_SOUND':
            return {
                ...state,
                sound: action.payload.sound
            }
        case 'CHANGE_FLASH':
            return {
                ...state,
                flash: !state.payload.flash
            }
        default:
            return state;
    }
}

export default contentReducer;