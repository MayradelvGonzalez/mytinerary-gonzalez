import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import usersActions from '../../redux/actions/usersActions';
import SnackBar from '../snackbar/Snackbar';

function GoogleSignUp() {
    const dispatch = useDispatch();
    async function handleCallbackResponse(response) {

        console.log(response.credential);

        let userObject = jwt_decode(response.credential);
        console.log(userObject)
        dispatch(usersActions.signUp({
            fullName: userObject.given_name,
            email: userObject.email,
            country: "Argentina",
            password: userObject.sub,
            photo: userObject.picture,
            from: 'google'
        }))
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: '556028616922-59ljqe7i7ug24kbcf3uji06mvpju3tl5.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "medium" }
        )
    }, []);

    return (
        <div>
            <SnackBar />
            <div id='buttonDiv'></div>
        </div>
    )
}

export default GoogleSignUp