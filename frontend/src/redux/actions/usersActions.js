import axios from 'axios';

const usersActions = {
    signUp: (userData) => {
        return async(dispatch,getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/signup', {userData})
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
    
            if (res.data.success) {
                localStorage.setItem('token',res.data.response.token)// TOMA EL TOKEN Y LO MANDA AL LOCALSTORE
                    console.log(localStorage.getItem('token'))
                    dispatch({
                        type: "USER",
                        payload:res.data.response
                    })
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
signOut: () => {
    return (dispatch, getState) => {
        // await axios.post('http://localhost:4000/api/auth/signOut',{email})
        localStorage.removeItem('token')
        dispatch({
            type: 'USER',
            payload: null
        })
    }
},
verifyToken: (token) => {
    return async (dispatch, getState) => {
         await axios.get('http://localhost:4000/api/auth/verifyToken', {headers: {'Authorization': 'Bearer ' + token}}) //el token viene por header
        .then(user => 
            {
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
            ) .catch (error => {
                if(error.response.status === 401){
                    dispatch({
                        type: 'USER',
                        payload: null
                    })
                    localStorage.removeItem('token')
                }
            })
        }
    }
}


export default usersActions

