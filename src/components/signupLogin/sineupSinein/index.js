import React,{useState} from 'react'
import Input from "../../inputComponent/index";
import Button from "../../button/index"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "./style.css";

import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../../../../src/firebase"
import {doc,getDoc, setDoc} from "firebase/firestore"




const SineUpSineIn = ({loginSignUpDisplay, googleAuth}) => {

  const[fullName, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[confirmPass, setConformPass] = useState("");
  const[loading, setLoading] = useState(false);
  const navigate= useNavigate();
  

  async function signUpWithEmail(){

      setLoading(true);
      if((fullName && email) && (password === confirmPass) && password.length > 6){
            try                                                       // create a user for authentication
              {
                  const userCredential = await createUserWithEmailAndPassword(   
                    auth,
                    email,
                    password
                  );                                                   
                  const user = userCredential.user;
                  //console.log("user: ", user);
                  toast.success("signUp success!")
                  creatDoc(user)
                  navigate("/dashboard")
                  setLoading(false)

                  // reset all state values
                  setFullName("");
                  setEmail("");
                  setPassword("");
                  setConformPass("");
              }
              catch(e){
                toast.error(e.message);
                setLoading(false)
              }

    }
    else{
      // error validation using tostify
      if(!fullName){
        toast.error("enter a valid Name")
      }
      if(!email){
        toast.error("Enter valid email/gmail")
      }
      if(password !== confirmPass){
        toast.error("password and confirm password should match");
      }
      if(password.length <=6){
        toast.error("Expected password lenth > 6");
      }
      setLoading(false)
    }
  }


  async function creatDoc(user){
     if(!user) return ;

     setLoading(true)
     const userRef = doc(db, "users",user.uid);
     const userData = await getDoc(userRef);

     if(!userData.exists()){
      try{
        await setDoc(doc(db, "users", user.uid),{
          name : user.displayName ? user.displayName : fullName,
          email,
          photoURL : user.photoURL ? user.photoURL : "",
          createdAt : new Date()
        });
        toast.success("Doc created")
        setLoading(false)
      }
      catch(error){
         toast.error(error.message)
         setLoading(false)
      }

     }
     else{
      toast.error("Doc already Exists")
      setLoading(false)
     }
  }



  return (
    <div className='sinup-wrapper'>

      <h1 className='title'>
        Sign Up on
        <span className='sub-logo'> Financely.</span>
      </h1>
      
      <form>
        <Input
          label = {"Full Name"}
          state = {fullName}
          setState = {setFullName}
          placeholder={"John Doe"}
          type={"text"}
        />

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

        <Input
          label = {"Confirm Password"}
          state = {confirmPass}
          setState = {setConformPass}
          placeholder={"Example#1234"}
          type={"password"}
        />

        <Button 
          text ={loading ?"Loading..": "Signup with Email and Password"}
           onClick = {signUpWithEmail}
           disabled = {loading}
        />

        <p className='orText'>or</p>
        
        <Button 
           text={loading ?"Loading..":"Signup using Google" }
           blue = {true}
           onClick={()=>googleAuth(creatDoc)}
        />

        <p className='login-text-link'
           onClick = {loginSignUpDisplay}
         >
          Or have an Account? Click here
        </p>
      </form>
    </div>
  )
}

export default SineUpSineIn