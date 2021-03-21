import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './styles.scss'
import moment from 'moment'

class AttendanceList extends React.Component {
  componentDidMount () {
    this.props.dispatch({ type: 'GET_ATTENDANCES' })
  }

  render () {
    const { attendances } = this.props

    const characters = {}
    for (const attendance of attendances) {
      for (const character of attendance.characters) {
        if (characters[character.name] === undefined) {
          characters[character.name] = { buffsCount: 0, raidsDate: [], total: 0 }
        }

        if (character.status === 'ok' || character.status === 'bench') {
          characters[character.name].raidsDate.push(attendance._id)
        }
        characters[character.name].buffsCount += character.buffsCount
        characters[character.name].total += character.buffsCount + 1
      }
    }

    const charactersArray = []
    for (const character in characters) {
      charactersArray.push({ name: character, total: characters[character].total })
    }

    const sortedCharactersArray = charactersArray.sort((a, b) => (a.total > b.total) ? -1 : ((b.total > a.total) ? 1 : 0))

    console.log(sortedCharactersArray)
    return (
      <div className='rand-table-list'>

        <div className="table-container">

        <table className='table is-bordered is-narrow'>
          <thead><tr>
            <th>Character</th>
            <th>Rand</th>
            <th>Présence</th>
            <th>Buffs</th>
            {attendances.map((attendance) => {
              return <th key={attendance._id}>{moment(attendance._id).format('DD/MM')}</th>
            })}
          </tr>
          </thead>
          <tbody>
            {sortedCharactersArray.map((character) => {
              // if (characters[character.name].raidsDate.length / attendances.length < 0.8) return null
              return <tr key={character.name}>
                <td>{character.name}</td>
                <td>{((characters[character.name].raidsDate.length / attendances.length * 100) + (characters[character.name].buffsCount / (characters[character.name].raidsDate.length * 6) * 100)).toFixed(0)}</td>
                <td>{(characters[character.name].raidsDate.length / attendances.length * 100).toFixed(1)}%</td>
                <td>{(characters[character.name].buffsCount / (characters[character.name].raidsDate.length * 6) * 100).toFixed(1)}%</td>
                {attendances.map((attendance) => {
                  if (characters[character.name].raidsDate.includes(attendance._id)) { return <td key={attendance._id}>OK</td> } else { return <td key={attendance._id}>KO</td> }
                })}
              </tr>
            })}

          </tbody>
        </table>
      </div>
      </div>
    )
  }
}
AttendanceList.propTypes = {
  dispatch: PropTypes.func,
  attendances: PropTypes.array
}

function mapStateToProps (state) {
  return {
    attendances: state.attendances
  }
}
export default connect(mapStateToProps)(AttendanceList)
