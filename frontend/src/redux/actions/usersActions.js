import axios from 'axios';

const usersActions = {
//     signUp : (userData) => {
//         return async (dispatch, getState) => {
//             const res = await axios.post(`http://localhost:4000/api/signup`,{userData})
//             console.log(res)
//         }

//     },
//     signIn: (userLogin) => {
//     return async(dispatch, getState) => {
//         const res = await axios.post(`http://localhost:4000/api/login`, {userLogin})
//     }
// },
// }

signUp: (userData) => {
    return async(dispatch,getState) => {
        try {
            const res = await axios.post('http://localhost:4000/api/auth/signup',{userData})
            console.log(res)
            dispatch({type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        } catch(error) {
            console.log(error)
        }
    }
},

signIn: (userLoged) => {
    console.log(userLoged)
    return async(dispatch, getState) => {
        try {
            const res = await axios.post('http://localhost:4000/api/auth/signin',{userLoged})
            //console.log(res)
            if (res.data.success) {
                dispatch({type: 'USER', payload: res.data.response})
            } else {
                dispatch({type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
            }
            return res
        } catch(error) {
            console.log(error)
        }
    }
}

}


export default usersActions

