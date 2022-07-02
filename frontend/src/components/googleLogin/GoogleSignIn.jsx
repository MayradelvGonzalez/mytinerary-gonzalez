import {useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import GoogleIcon from '@mui/icons-material/Google';
import usersActions from '../../redux/actions/usersActions';

function GoogleSignIn(){
    const dispatch = useDispatch();

    async function handleCallbackResponse(response){
        let userObject = jwt_decode(response.credential)
        dispatch(usersActions.signIn({
            email: userObject.email,           
            password:userObject.sub,          
            from:'google'
        }))
    }
    useEffect(()=> {
        /*global google*/
        google.accounts.id.initialize({
            client_id: '556028616922-59ljqe7i7ug24kbcf3uji06mvpju3tl5.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline" , size:"medium"} 
        )
    })
      return(
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
    }
    
    export default GoogleSignIn
