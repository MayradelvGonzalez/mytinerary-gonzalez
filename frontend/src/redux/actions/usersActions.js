import axios from 'axios';

const usersActions = {

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
},
signOut: (mail) => {
    return async (dispatch, getState) => {
        await axios.post('http://localhost:4000/api/auth/signin',{mail})
        localStorage.removeItem('token')
        dispatch({
            type: 'user',
            payload: null
        })
    }
},
verifyToken: (token) => {
    return async (dispatch, getState) => {
        const user = await axios.get('http://localhost:4000/api/auth/signin', {headers: {'Authorization': 'Bearer ' + token}})
        if(user.data.success){
            dispatch({
                type:'USER',
                payload: user.data.response
            })
            dispatch({
                type:'MESSAGE',
               payload: {
                view: true,
                message: user.data.message,
                success: user.data.success
               }
            }
          
        )
    } else {
        localStorage.removeItem('token')
    }
}

}
}


export default usersActions

