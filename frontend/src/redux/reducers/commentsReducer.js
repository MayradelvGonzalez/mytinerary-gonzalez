const initialState = {
    agregado: false,
}

const commentsReducer = (state = initialState , action) => {
    switch(action.type){  //en el switch tengo una condicion action.type...evalua por el tipo, sino va a default
        case "MESSAGE_ADDED":
            return {
                ...state,
                agregado: action.payload,
                
    
            };
            default:
                return state;

                }
           
            }            



export default commentsReducer;