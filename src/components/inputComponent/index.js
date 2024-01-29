import React from 'react'
import "./style.css"

const Input = ({label, state, setState, placeholder, type}) => {

  return (
    <div className='input-wrapper'>

        <p className='label-input'>{label}</p>
        <input
         state = {state}
         onChange={(e)=>setState(e.target.value)}
         placeholder={placeholder}
         type={type}
         className='custom-input'
        />

    </div>
  )
}

export default Input