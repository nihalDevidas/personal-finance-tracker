import React,{useState} from 'react'
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import Input from "../../inputComponent/index";
import Button from "../../button/index"
import "./style.css"

import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../../../src/firebase"


const Login = ({loginSignUpDisplay, googleAuth}) => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const handleLogin = async()=>
    {
      console.log("handle Login");
      setLoading(true);

      if(email && password){
         try                                                     
         {
             const userCredential = await signInWithEmailAndPassword(   
               auth,
               email,
               password
             );                                                   
             const user = userCredential.user;

             toast.success("User Logged in")
             navigate("/dashboard")
             setLoading(false)
             
         }
         catch(e){
           console.log("error"+e);
           toast.error(e.message);
           setLoading(false);
         }
      }
      else{
         if(!email){
           toast.error("empty email field")
         }
         if(!password){
           toast.error("empty password field")
         }
         setLoading(false);
      }
    }

  return (
    <div className='login-wrapper'>

            <h1 className='title'>
            Login to
            <span className='sub-logo'> Financely.</span>
            </h1>
            
            <form>
            <Input
                label = {"Email"}
                state = {email}
                setState = {setEmail}
                placeholder={"JohnDoe@email.com"}
                type={"email"}
            />

            <Input
                label = {"Password"}
                state = {password}
                setState = {setPassword}
                placeholder={"Example#1234"}
                type={"password"}
            />

            <Button 
                text ={loading ?"Loading..": "Login with Email and Password"}
                disabled = {loading}
                onClick = {handleLogin}
            />

            <p className='orText'>or</p>
            
            <Button 
                text={loading ?"Loading..":"Login using Google" }
                blue = {true}
                onClick={googleAuth}
            />

            <p className='login-text-link'
              onClick = {loginSignUpDisplay}
            >
              Or Don't have an Account? Click here
             </p>
            </form>
  </div>
     
  )
}

export default Login