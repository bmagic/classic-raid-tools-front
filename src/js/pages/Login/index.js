import React from 'react'
import Error from '../../components/Common/Error'
const Login = () =>

  <div className='hero is-fullheight'>
    <div className='hero-body'>
      <div className='column is-4 is-offset-4'>
        <Error/>
        <div className='box has-text-centered'>
          <h1 className='title'>Classic Raid Tools</h1>
          <a className='button' href={`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.DISCORD_REDIRECT_URI}&response_type=code&scope=email%20identify`}><span className="icon is-small"><i className='fab fa-discord'/></span><span>Discord</span></a>
        </div>
      </div>
    </div>
  </div>

export default Login
