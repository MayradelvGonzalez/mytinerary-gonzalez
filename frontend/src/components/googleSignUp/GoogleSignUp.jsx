import React ,{ useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/usersActions';

function GoogleSignUp() {
    const dispatch = useDispatch();
    async function handleCallbackResponse(response){
        console.log(response.credential);
    let  userObject = jwt_decode(reponse.credential);
    console.log(userObject)
    dispatch(userActions.signUp({
       fullName: userObject.name,
       email: userObject.email,
       country: userObject.country,
       password:userObject.password,
       photo:userObject.photo,
       from:'google'
    }))
}

useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
        client_id : '556028616922-59ljqe7i7ug24kbcf3uji06mvpju3tl5.apps.googleusercontent.com',
        callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: "outline" , size:"medium"} 
    )
});

return(
    <div>
        <div id='buttonDiv'></div>
    </div>
)
s}

export default GoogleSignUp