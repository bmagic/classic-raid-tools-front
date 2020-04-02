import React from 'react'
import Error from '../../components/Error'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'
const Login = () =>

  <div className='hero is-fullheight'>
    <div className='hero-body'>
      <div className='column is-4 is-offset-4'>
        <Error/>
        <div className='box has-text-centered'>
          <h1 className='title'>Classic Raid Tools</h1>
          <LoginForm />
          <a className='button ' href='https://discordapp.com/api/oauth2/authorize?client_id=682243386228473873&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth-discord&response_type=code&scope=email'><span className="icon is-small"><i className='fab fa-discord'/></span><span>Discord</span></a>
          <a className='button ' href='https://github.com/login/oauth/authorize?client_id=dd388bf4b6bcf27c2fe9&scope=user:email'><span className="icon is-small"><i className='fab fa-github'/></span><span>Github</span></a>
          <div>
            <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  </div>

export default Login
