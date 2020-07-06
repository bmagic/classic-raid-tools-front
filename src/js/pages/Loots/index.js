import React, { Fragment } from 'react'
import Layout from '../../components/Common/Layout'
import { wowClass } from '../../lib/wow'
import LootList from '../../components/Loots/LootList'
import AddLoot from '../../components/Loots/AddLoot'
import { Link } from 'react-router-dom'

const queryString = require('query-string')

class Loots extends React.Component {
  constructor (props) {
    super(props)
    this.state = { instance: '', classSpec: '', slot: '', whClasse: '', whSubClass: '' }
  }

  componentDidMount () {
    const hash = queryString.parse(location.hash)
    const classSpec = hash.classSpec || this.state.classSpec
    const slot = hash.slot || this.state.slot
    const whClass = hash.whClass || this.state.whClass
    const whSubClass = hash.whSubClass || this.state.whSubClass
    const instance = hash.instance || this.state.instance
    this.setState({ classSpec: classSpec, instance: instance, slot: slot, whClass: whClass, whSubClass: whSubClass })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { classSpec, instance, slot, whClass, whSubClass } = this.state
    const hash = queryString.stringify({ classSpec: classSpec, instance: instance, slot: slot, whClass: whClass, whSubClass: whSubClass })
    location.hash = hash
  }

  render () {
    const { instance, classSpec, slot, whClass, whSubClass } = this.state
    const instances = ['onyxia', 'mc', 'bwl', 'zg', 'aq20', 'aq40', 'naxxramas']
    const slots = ['Head', 'Neck', 'Shoulder', 'Back', 'Chest', 'Wrist', 'Hands', 'Waist', 'Legs', 'Feet', 'Finger', 'Trinket', 'Main Hand', 'One-Hand', 'Held In Off-hand', 'Two-Hand', 'Shield', 'Ranged']
    const whClasses = ['Armor', 'Weapons', 'Trade Goods', 'Miscellaneous', 'Recipes', 'Consumables']
    const whSubClasses = ['Cloth Armor', 'Leather Armor', 'Mail Armor', 'Plate Armor', 'Rings', 'Trinkets', 'Amulets', 'Shields', 'Off-hand Frills', 'One-Handed Axes', 'Bows', 'Daggers', 'Guns', 'Two-Handed Maces', 'Polearms', 'One-Handed Swords', 'Two-Handed Swords', 'Wands', 'Cloaks', 'Two-Handed Axes', 'One-Handed Maces', 'Other (Trade Goods)', 'Fist Weapons', 'Staves', 'Crossbows', 'Armor Tokens', 'Totems', 'Idols', 'Librams', 'Other (Miscellaneous)', 'Books', 'Item Enhancements (Permanent)']

    return (
      <Layout fullWith={true}>
        <div className='is-pulled-right'><Link to={'/loots-summary'}>Résumé des loots</Link></div>

        <AddLoot filter={{ classSpec: classSpec, instance: instance, slot: slot, whClass: whClass, whSubClass: whSubClass }}/>

        <div className='field is-grouped'>
          <div className='control'>
            <div className="select">
              <select value={instance} onChange={(e) => { this.setState({ instance: e.target.value }) }}>
                <option value=''>Instances</option>
                {instances.map((instance) => {
                  return (
                    <option key={instance}>{instance}</option>
                  )
                })
                }
              </select>
            </div>
          </div>
          <div className='control'>
            <div className="select">
              <select value={slot} onChange={(e) => { this.setState({ slot: e.target.value }) }}>
                <option value=''>Slots</option>
                {slots.map((slot) => {
                  return (
                    <option key={slot}>{slot}</option>
                  )
                })
                }
              </select>
            </div>
          </div>
          <div className='control'>
            <div className="select">
              <select value={whClass} onChange={(e) => { this.setState({ whClass: e.target.value }) }}>
                <option value=''>Wowhead Class</option>
                {whClasses.map((whClass) => {
                  return (
                    <option key={whClass}>{whClass}</option>
                  )
                })
                }
              </select>
            </div>
          </div>
          <div className='control'>
            <div className="select">
              <select value={whSubClass} onChange={(e) => { this.setState({ whSubClass: e.target.value }) }}>
                <option value=''>Wowhead SubClass</option>
                {whSubClasses.map((whSubClass) => {
                  return (
                    <option key={whSubClass}>{whSubClass}</option>
                  )
                })
                }
              </select>
            </div>
          </div>
          <div className='control'>
            <div className="select">
              <select value={classSpec} onChange={(e) => { this.setState({ classSpec: e.target.value }) }}>
                <option value=''>Specs</option>
                {Object.keys(wowClass).map((wClass, index) => {
                  return (
                    <Fragment key={wClass}>
                      {Object.keys(wowClass[wClass]).map((spec, index) => {
                        return (
                          <option key={`${wClass}-${spec}`} value={`${wClass}-${spec}`}>{wClass}-{spec}</option>

                        )
                      })}

                    </Fragment>
                  )
                })
                }
              </select>
            </div>
          </div>

        </div>
        <LootList instance={instance} classSpec={classSpec} slot={slot} whClass={whClass} whSubClass={whSubClass}/>

      </Layout>
    )
  }
}

export default Loots
