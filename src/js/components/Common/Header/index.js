import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../../Menu/LogoutButton'
import AdminMenu from '../../Menu/AdminMenu'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LoadingBar from 'react-redux-loading-bar'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const { user } = this.props
    return (
      <header className='header '>
        <nav className='navbar '>
          <div className='container'>
            <div className="navbar-brand">
              <Link className="navbar-item" to="/"><h1 className='title is-5'>OWLS Guild</h1></Link>
              <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                data-target="navbar" onClick={() => this.toggleMenu()}>
                <span aria-hidden="true"/>
                <span aria-hidden="true"/>
                <span aria-hidden="true"/>
              </a>
            </div>
            <div id="navbar" className={`navbar-menu ${this.state.isOpen ? 'is-active' : ''}`}>
              <div className="navbar-start">
                <Link to="/roster" className='navbar-item'>Roster</Link>
                {user && (user.roles.includes('member') || user.roles.includes('casu')) && <Link to="/bank" className="navbar-item">Banque de guilde</Link>}
                {user && user.roles && (user.roles.includes('member') || user.roles.includes('casu')) && <Link to="/professions" className="navbar-item">Professions</Link>}
                {user && user.roles && (user.roles.includes('member') || user.roles.includes('casu')) && <div className='navbar-item has-dropdown is-hoverable'>
                  <Link to="/presences" className="navbar-item">Présences</Link>

                  <a className="navbar-link">
                    Outils
                  </a>
                  <div className="navbar-dropdown">
                    <Link to="/characters-comparator" className="navbar-item">Comparateur de personnages</Link>
                    <Link to="/debriefs" className="navbar-item">Raids debriefings</Link>
                  </div>
                </div>}

              </div>
              <div className="navbar-end">
                {user && <Link to="/characters" className='navbar-item'>Personnages</Link>}
                {user && <Link to="/user" className="navbar-item">Profile</Link>}
                <AdminMenu/>
                {user && <div className='navbar-item'> <LogoutButton/></div>}
                {!user && <div className='navbar-item'><a className='button' href={`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.DISCORD_REDIRECT_URI}&response_type=code&scope=email%20identify`}><span className="icon is-small"><i className='fab fa-discord'/></span>&nbsp;<span>Connexion</span></a></div>}
              </div>
            </div>
          </div>
        </nav>
        {/* <LoadingBar style={{ backgroundColor: '#36b37e', height: '3px' }} /> */}
      </header>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Header)
