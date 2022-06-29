// const initialState = {
//    signUp : [],
//    signIn: []
// }
// const usersReducer = (state = initialState, action) => {
//     switch(action.type){
//         case "POSTSIGNUP":
//             return {
//                 ...state,
//              signUp: action.payload
//             }
//             case "POSTSIGNIN":
//                 return{
//                     ...state,
//                 signIn: action.payload
//                 }
                
//                     default:
//                        return state
//     }
// }
const initialState = {
    user: null,
    snackbar: {
        view: false,
        message: '',
        success:false
    }
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER':
            return {
                ...state,
                user: action.payload,   
            }
        case 'MESSAGE':
            return {
                ...state,
                snackbar: action.payload,   
            }
        default:
            return state
    }
}

export default usersReducer


