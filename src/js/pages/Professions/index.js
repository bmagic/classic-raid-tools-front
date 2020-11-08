import React from 'react'
import Layout from '../../components/Common/Layout'
import ProfessionsList from '../../components/Professions/ProfessionList'
import ProfessionImport from '../../components/Professions/ProfessionImport'
const queryString = require('query-string')

class Professions extends React.Component {
  constructor (props) {
    super(props)
    this.state = { profession: 'enchanting' }
  }

  componentDidMount () {
    const hash = queryString.parse(location.hash)
    const profession = hash.profession || this.state.profession

    this.setState({ profession: profession })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const hash = queryString.stringify({ profession: this.state.profession })
    location.hash = hash
  }

  render () {
    const professionsList = ['enchanting', 'alchemy', 'engineering', 'tailoring', 'leatherWorking', 'blackSmithing', 'cooking']
    const professionsListTranslation = { enchanting: 'Enchantement', alchemy: 'Alchimie', engineering: 'Ingénierie', tailoring: 'Couture', leatherWorking: 'Travail du cuir', blackSmithing: 'Forge', cooking: 'Cuisine' }

    return (
      <Layout>
        <ProfessionImport profession={this.state.profession}/>
        <div className="tabs">
          <ul>

            {professionsList.map((profession) =>
              <li key={profession} className={`${profession === this.state.profession ? 'is-active' : ''}` }><a onClick={() => this.setState({ profession: profession })}>{professionsListTranslation[profession]}</a></li>
            )}

          </ul>
        </div>
        <ProfessionsList profession={this.state.profession}/>
      </Layout>
    )
  }
}

export default Professions
