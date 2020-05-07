import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EscapeOutside from 'react-escape-outside'

class BankImport extends React.Component {
  constructor (props) {
    super(props)

    this.state = { data: '' }
  }

  displayModal (display) {
    this.props.dispatch({ type: 'DISPLAY_BANK_DATA_MODAL', display: display })
    this.setState({ data: '' })
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.dispatch({ type: 'IMPORT_BANK_DATA', data: this.state.data })
  }

  render () {
    const { user, displayBankModal } = this.props
    const { data } = this.state
    if (user && user.roles.includes('banker')) {
      if (!displayBankModal) return <div className='button' onClick={(e) => this.displayModal(true)}>Importer les données</div>

      return (
        <EscapeOutside onEscapeOutside={() => this.displayModal(false)}>
          <div>
            <div className={`modal ${displayBankModal ? 'is-active' : ''}`}>
              <div className='modal-background'/>
              <div className='modal-content'>
                <div className='box'>
                  <form onSubmit={(e) => { this.onSubmit(e) }}>
                    <div className='field'>
                      <textarea value={data} onChange={(e) => this.setState({ data: e.target.value })}
                        placeholder='Dans wow ouvrir la banque et faire /cgb puis copier/coller les données ici'
                        className='textarea' rows='15'/>
                    </div>
                    <div className='field is-grouped is-grouped-right'>
                      <p className="control">
                        <button type='submit' className='button is-primary '>Envoyer</button>
                      </p>
                    </div>
                  </form>
                  <a href='https://www.curseforge.com/wow/addons/classic-guild-bank' rel='noopener noreferrer'
                    target='_blank'><i className='fas fa-download'/>&nbsp;{'Télécharger l\'addon'}</a>
                </div>
              </div>
              <button className='modal-close is-large' aria-label='close' onClick={(e) => this.displayModal(false)}/>
            </div>
            <div className='button' onClick={(e) => this.displayModal(true)}>Importer les données</div>
          </div>
        </EscapeOutside>
      )
    } else {
      return null
    }
  }
}

BankImport.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  displayBankModal: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    user: state.user,
    displayBankModal: state.displayBankModal
  }
}

export default connect(mapStateToProps)(BankImport)
