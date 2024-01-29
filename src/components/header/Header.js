import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.css"
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../../../src/firebase"
import {signOut } from 'firebase/auth';
import { toast } from 'react-toastify';


const Header = () => {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(()=>{
    if(user){
      navigate("/dashboard")
    }

  },[user, loading])

  
  function handleLogout(){
     try{
       signOut(auth)
       .then(()=>{
         toast.success("Logged Out successfully")
         navigate("/")
       })
     }
     catch(error){
      toast.error(error.message)
     }
  }

  return (
    <div className='navBar'>
        <p className='logo'>Financely.</p>

        { user && <p className='logo link'
          onClick = {handleLogout}
          >logout</p> }
    </div>
  )
}

export default Header