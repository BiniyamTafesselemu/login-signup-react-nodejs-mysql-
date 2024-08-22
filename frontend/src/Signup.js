import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './SignupValidation'
import axios from 'axios'
import './Pages.css'

function Signup() {

  const [values, setValues]=useState({
    name:'',
    email:'',
    password:''
  })
  const navigate=useNavigate();
  const [errors, setErrors]= useState({})

  const handleInput=(event)=>{
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);
    
    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
        axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
    }
};





  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100 body'>
    <div className='bg-white p-3  box2-wh transparent-bg'>
      <form action='' onSubmit={handleSubmit}>
        <h2 className='d-flex justify-content-center'>Sign-Up</h2>
         <div className='mb-3'>
              <label htmlFor="name"><strong>Name</strong></label>
              <input type='name' placeholder='Enter Name' name='name'
              onChange={handleInput} className='form-control rounded-0'/>
              {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>
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
          <button type='submit' className='btn btn-success w-100 rounded-0'>Signup</button>
          <p>Already have an account</p>
          <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
      </form>
    </div>
  </div>
  )
}

export default Signup
