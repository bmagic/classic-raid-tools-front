import React from 'react'
import Layout from '../../components/Common/Layout'
import WowRaidImage from '../../components/Common/WowRaidImage'
import WowClassImage from '../../components/Common/WowClassImage'

const Home = () => {
  return (
    <Layout>
      <div className='columns'>
        <div className='column is-8'>
          <div className='box'>
            <h2 className='title'>Qui sommes nous ?</h2>
            <p className='content '>
            OWLS est une guilde WoW Classic sur le serveur Sulfuron, nous avons pour objectif de nettoyer le contenu raid PvE de WoW Classic dans son intégralité, de manière sereine et efficace.
            Pour cela, nous demandons à nos membres du roster un investissement conséquent dans les raids du palier actuel afin d'assurer des performances correctes.
            </p>
          </div>
          <div className='box'>
            <h2 className='title'>Jours de raids</h2>
            <p className='content '>
            Nous raidons le Mercredi et le Dimanche soir (AQ40 + BWL + MC) à partir de 21h.<br/>
            Des raids ZG & AQ20 optionnels sont également proposés dans la semaine.<br/>
            </p>
          </div>
          <div className='box'>
            <h2 className='title'>Charte de Guilde</h2>
            <p className='content'>
            Notre charte de guilde est consultable <a href='https://docs.google.com/document/d/1VaocdCUl4AgTeOyVsMSSGKcARqAONrbSp2yCAMvUHdg/edit'>ici</a>.
            </p>
          </div>
        </div>
        <div className='column is-4'>
          <div className='box has-background-success'>
            <a href='https://discord.gg/j6pCmfC'>
              <div className='level'>
                <div className='level-item'>
                  <i className='fab fa-discord'/>&nbsp;Rejoignez notre serveur discord
                </div>
              </div>
            </a>
          </div>
          <div className='box'>
            <div className='has-text-centered'>
              <WowRaidImage instance='aq40' />
              <span className='is-size-5 has-text-success'>8/9 en ~3h</span>
            </div>
            <div className='has-text-centered'>
              <WowRaidImage instance='bwl' />
              <span className='is-size-5 has-text-success'>8/8 en 49m01s</span>
            </div>
            <div className='has-text-centered'>
              <WowRaidImage instance='mc'/>
              <span className='is-size-5 has-text-success'>10/10 en 59m14s</span>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Home
