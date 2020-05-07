import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../../Menu/LogoutButton'
import AdminMenu from '../../Menu/AdminMenu'

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
    return (
      <header className='header has-background-grey-light'>
        <div className='container'>
          <nav className='navbar has-background-grey-light'>
            <div className="navbar-brand">
              <Link className="navbar-item" to="/"><h1 className='title is-5'>Classic Raid Tools</h1></Link>
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

                <Link to="/bank" className="navbar-item">Banque de guilde</Link>
                <div className='navbar-item has-dropdown is-hoverable'>
                  <a className="navbar-link">
                    Outils externes
                  </a>
                  <div className="navbar-dropdown">
                    <a className='navbar-item' target='_blank' rel='noopener noreferrer' href='https://www.raidcalendar.com/'><i className="fas fa-external-link-alt"/>&nbsp;Raid Calendar</a>
                    <a className='navbar-item' target='_blank' rel='noopener noreferrer' href='https://classic.warcraftlogs.com/guild/id/521113'><i className="fas fa-external-link-alt"/>&nbsp;Warcraft logs</a>
                    <a className='navbar-item' target='_blank' rel='noopener noreferrer' href='https://nexushub.co/wow-classic/sulfuron-horde'><i className="fas fa-external-link-alt"/>&nbsp;Prix HV</a>
                  </div>
                </div>
              </div>
              <div className="navbar-end">
                <Link to="/characters" className='navbar-item'>Characters</Link>
                <Link to="/user" className="navbar-item">Profile</Link>
                <AdminMenu/>
                <div className='navbar-item'> <LogoutButton/></div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
