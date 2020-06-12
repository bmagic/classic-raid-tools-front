import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from '../../Common/Item'

import './styles.scss'

import { enchantsList } from '../../../lib/wow'
import Spell from '../../Common/Spell'

class DebriefBuffIssues extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    /* eslint-disable */
    if (WH && typeof WH.getDataEnv !== "undefined") {
      $WowheadPower.refreshLinks()
    }
    /* eslint-enable */
  }

  render () {
    const { debrief, spec, wClass } = this.props

    const buffsList = [16609, 22888, 24425, 15366, 22820, 22818, 22817, [23736, 23766, 23738, 23737, 23735, 23767, 23769, 23768]]
    if (!debrief.buffs) return null
    const buffsTmp = {}
    const characters = {}

    for (const buff of debrief.buffs) {
      if (!buff.characterId) {
        continue
      } else {
        characters[buff.characterId.name] = buff.characterId
      }
      if (!buffsTmp[buff.characterId.name]) buffsTmp[buff.characterId.name] = []
      buffsTmp[buff.characterId.name].push(buff.wid)
    }

    const buffs = {}
    Object.keys(buffsTmp).sort().forEach(function (key) {
      buffs[key] = buffsTmp[key]
    })

    if (debrief) {
      return (
        <div className='debrief-buffs-issues'>
          <table className='table is-fullwidth is-narrow is-bordered'>
            <thead>
              <tr>
                <th>Name</th>
                {buffsList.map((buff, index) => {
                  return <th className='has-text-centered' key={`slot-${index}`}>
                    {buff.length > 0 && <span>Sombrelune</span>}
                    {!buff.length && <Spell size='small' wid={buff}/>}
                  </th>
                })}
              </tr>
            </thead>

            <tbody>
              {Object.keys(buffs).map((characterName) => {
                if (spec !== '' && spec !== characters[characterName].spec) return null
                if (wClass !== '' && wClass !== characters[characterName].class) return null
                return (
                  <tr key={characterName}>

                    <td>{characters[characterName].name}</td>

                    {buffsList.map((buff) => {
                      if (buffs[characterName].includes(buff) || (buff.length > 0 && buffs[characterName].filter(x => buff.includes(x)).length > 0)) {
                        return <td className='has-background-success' key={`${characterName}-${buff}`}/>
                      } else {
                        return <td className='has-background-danger' key={`${characterName}-${buff}`}/>
                      }
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
      )
    }
  }
}
DebriefBuffIssues.propTypes = {
  dispatch: PropTypes.func,
  debrief: PropTypes.object,
  wClass: PropTypes.string,
  spec: PropTypes.string
}

function mapStateToProps (state) {
  return {
    debrief: state.debrief
  }
}
export default connect(mapStateToProps)(DebriefBuffIssues)
