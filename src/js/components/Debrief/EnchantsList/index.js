import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spell from '../../Common/Spell'

import { enchantsList, enchantToSpell } from '../../../lib/wow'

class EnchantsList extends React.Component {
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
    return (
      <div>
        {Object.keys(enchantsList).map((wClass) => {
          return (
            <div>
              {Object.keys(enchantsList[wClass]).map((spec) => {
                return (
                  <div><span className='subtitle'>{wClass}&nbsp;{spec}</span>
                    {Object.keys(enchantsList[wClass][spec]).map((slot) => {
                      return (
                        <div>{slot}:&nbsp;
                          {Object.keys(enchantsList[wClass][spec][slot]).map((index) => {
                            return (
                              <span><Spell wid={enchantToSpell[enchantsList[wClass][spec][slot][index]]}/>&nbsp;</span>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
<hr/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect()(EnchantsList)
