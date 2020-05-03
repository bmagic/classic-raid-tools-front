import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

class PlayersCountProgressBar extends React.Component {
  render () {
    const { instance, playersCount } = this.props

    const max = (instance === 'aq20' || instance === 'zg') ? 20 : 40
    let color = 'is-primary'
    if (playersCount / max >= 0.75) {
      color = 'is-danger'
    } else if (playersCount / max >= 0.5) {
      color = 'is-warning'
    }
    return (
      <div className='players-count-progress-bar has-text-centered'>
        <progress className={`progress is-small ${color}`} value={playersCount} max={max}>{playersCount / max}%</progress>
        <div className='is-italic'>{playersCount}/{max}</div>

      </div>
    )
  }
}
PlayersCountProgressBar.propTypes = {
  instance: PropTypes.string,
  playersCount: PropTypes.number
}

export default PlayersCountProgressBar
