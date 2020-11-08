import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EscapeOutside from 'react-escape-outside'

class ProfessionImport extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: '', display: false }
  }

  displayModal (display) {
    this.setState({ data: '', display: display })
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.dispatch({ type: 'IMPORT_PROFESSION_DATA', data: this.state.data, profession: this.props.profession })
    this.setState({ display: false })
  }

  render () {
    const { data, display } = this.state
    if (!display) return <div className='button' onClick={(e) => this.displayModal(true)}>Importer ses données</div>

    return (
      <EscapeOutside onEscapeOutside={() => this.displayModal(false)}>
        <div>
          <div className={`modal ${display ? 'is-active' : ''}`}>
            <div className='modal-background'/>
            <div className='modal-content'>
              <div className='box'>
                <form onSubmit={(e) => { this.onSubmit(e) }}>
                  <div className='field'>
                    <textarea value={data} onChange={(e) => this.setState({ data: e.target.value })}
                      placeholder='Après avoir installé l`addon TradeSkillExporter, dans wow ouvrir la fenêtre de profession et faire /tse puis copier/coller les données ici'
                      className='textarea' rows='15'/>
                  </div>
                  <div className='field is-grouped is-grouped-right'>
                    <p className="control">
                      <button type='submit' className='button is-primary '>Envoyer</button>
                    </p>
                  </div>
                </form>
                <a href='https://www.curseforge.com/wow/addons/tradeskillexporter' rel='noopener noreferrer'
                  target='_blank'><i className='fas fa-download'/>&nbsp;{'Télécharger l\'addon TradeSkillExporter'}</a>
              </div>
            </div>
            <button className='modal-close is-large' aria-label='close' onClick={(e) => this.displayModal(false)}/>
          </div>
          <div className='button' onClick={(e) => this.displayModal(true)}>Importer les données</div>
        </div>
      </EscapeOutside>
    )
  }
}

ProfessionImport.propTypes = {
  dispatch: PropTypes.func,
  profession: PropTypes.string
}

export default connect()(ProfessionImport)
