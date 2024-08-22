import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';
import './Pages.css'

function Login() {
    const [values, setValues]=useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const [errors, setErrors]= useState({})

    const handleInput=(event)=>{
        setValues(prev =>({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);
        if (!validationErrors.email && !validationErrors.password) {
          axios.post('http://localhost:8081/login', values)
              .then(res => {
                  if(res.data==="success"){
                    navigate('/home');
                  }
                  else {
                    alert("No record existed")
                  }
              })
              .catch(err => console.log(err));
      }
    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 '>
      <div className=' p-3 transparent-bg  box-wh '>
        <form action='' onSubmit={handleSubmit} >
            <h2 className='d-flex justify-content-center'>Log-in</h2>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type='email' placeholder='Enter Email' name='email'
                onChange={handleInput} className='form-control rounded-0'/>
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>password</strong></label>
                <input type='password' placeholder='Enter Password' name='password' 
                onChange={handleInput} className='form-control rounded-0'/>
                {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0 padding-bt'>Login</button>
            <p className='padding-bt'>Don't have an account? </p>
            <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>create account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login
