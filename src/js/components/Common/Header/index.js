import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../../Menu/LogoutButton'
import AdminMenu from '../../Menu/AdminMenu'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
                {user && (user.roles.includes('member') || user.roles.includes('apply') || user.roles.includes('casu') || user.roles.includes('guest')) && <Link to="/raids" className="navbar-item">Raids</Link>}
                <Link to="/roster" className='navbar-item'>Roster</Link>
                {user && user.roles.includes('member') && <Link to="/loots#instance=aq40" className="navbar-item">Loots</Link>}
                {user && (user.roles.includes('member') || user.roles.includes('casu')) && <Link to="/bank" className="navbar-item">Banque de guilde</Link>}
                {user && user.roles && (user.roles.includes('member') || user.roles.includes('apply') || user.roles.includes('casu')) && <div className='navbar-item has-dropdown is-hoverable'>
                  <a className="navbar-link">
                    Outils
                  </a>
                  <div className="navbar-dropdown">
                    <Link to="/presences" className="navbar-item">Présences</Link>
                    <Link to="/characters-comparator" className="navbar-item">Comparateur de personnages</Link>
                    <Link to="/debriefs" className="navbar-item">Raids debriefings</Link>

                  </div>
                </div>}
                <div className='navbar-item has-dropdown is-hoverable'>
                  <a className="navbar-link">
                    Outils externes
                  </a>
                  <div className="navbar-dropdown">
                    <a className='navbar-item' target='_blank' rel='noopener noreferrer' href='https://www.raidcalendar.com/'><i className="fas fa-external-link-alt"/>&nbsp;Raid Calendar</a>
                    <a className='navbar-item' target='_blank' rel='noopener noreferrer' href='https://classic.warcraftlogs.com/guild/eu/sulfuron/owls'><i className="fas fa-external-link-alt"/>&nbsp;Warcraft logs</a>
                    <a className='navbar-item' target='_blank' rel='noopener noreferrer' href='https://nexushub.co/wow-classic/sulfuron-horde'><i className="fas fa-external-link-alt"/>&nbsp;Prix HV</a>
                  </div>
                </div>
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
