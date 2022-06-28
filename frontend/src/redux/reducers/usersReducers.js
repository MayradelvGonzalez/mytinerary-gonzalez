const initialState = {
   signUp : [],
   signIn: []
}
const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case "POSTSIGNUP":
            return {
                ...state,
             signUp: action.payload
            }
            case "POSTSIGNIN":
                return{
                    ...state,
                signIn: action.payload
                }
                
                    default:
                       return state
    }
}

export default usersReducer


