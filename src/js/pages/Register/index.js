import React from 'react'
import Error from '../../components/Error'
import { Link } from 'react-router-dom'
import RegisterForm from '../../components/RegisterForm'
const Register = () =>

  <div className='hero is-fullheight'>
    <div className='hero-body'>
      <div className='column is-4 is-offset-4'>
        <div className='box has-text-centered'>
          <Error/>
          <h1 className='title'>Register</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  </div>

export default Register
