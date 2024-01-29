import React,{useState} from 'react';
import Header from '../components/header/Header';
import SineUpSineIn from "../components/signupLogin/sineupSinein/index";
import Login from "../components/signupLogin/login/index"
import {toast} from "react-toastify"

import {auth, provider} from "../../src/firebase"
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';



const SineUp = () => {

  const[loginForm, setDisplayLogin] = useState(false);

  function loginSignUpDisplay(){
    setDisplayLogin(!loginForm)
  }

  function googleAuth(creatDoc){
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        creatDoc?.(user)
        toast.success("authentication successfull")
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        
      });

    }
    catch(error){
        toast.error(error.message)
    }
    
  }

  return (
    <div>
       <Header/>
       <div className='wrapper'>

         {loginForm ?
          <Login loginSignUpDisplay = {loginSignUpDisplay} googleAuth = {googleAuth}/> 
           :
          <SineUpSineIn loginSignUpDisplay = {loginSignUpDisplay}  googleAuth = {googleAuth}/>}

       </div>
    </div>
  )
}

export default SineUp