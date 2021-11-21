import { GET_MY_IP, SEARCH_IP, CLEAR_IP, IP_ERROR } from './app-actions'

const appReducer = (state, action) => {
    switch (action.type) {
        case GET_MY_IP:
        case SEARCH_IP:
            return {
                ...state,
                myIP: action.payload,
                isFecthing: false,
                IPError: null,
                position: [action.payload.location.lat, action.payload.location.lng]
            }


        case CLEAR_IP:
            return {
                ...state,
                myIP: null,
                isFecthing: true,
                IPError: null,
                position:[]
            }

        case IP_ERROR:
            return {
                ...state,
                myIP: null,
                isFecthing: false,
                IPError: action.payload,
                position:[]

            }

        default:
            return state
    }

}

export default appReducer;