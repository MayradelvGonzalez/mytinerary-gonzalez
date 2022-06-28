import axios from 'axios';

const usersActions = {
    signUpUser : (userData) => {
        return async (dispatch, getState) => {
            const res = await axios.post(`http://localhost:4000/api/signup`,{userData})
            console.log(res)
        }

    },
    signInUser: (userLogin) => {
    return async(dispatch, getState) => {
        const res = await axios.post(`http://localhost:4000/api/login`, {logedUser})
    }
},
}

export default usersActions

