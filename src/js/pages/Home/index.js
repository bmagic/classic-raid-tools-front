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
            Nous raidons actuellement le Mardi Soir (BWL + MC + Onyxia) et des raids ZG optionnels sont également proposés dans la semaine.<br/>
              <i className='fas fa-exclamation-triangle'/> Un jour de raid sera rajouté avec l'arrivée de la phase 5.
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
            <h3 className='title'>Recrutement</h3>
            <div className='level'>
              <div className='level-left'>
                <div className='level-item'>
                  <figure className='image is-24x24'><WowClassImage keyClass='warrior' keySpec='cac'/></figure>&nbsp;&nbsp;1 Guerrier DPS
                </div>
              </div>
            </div>
            <div className='level'>
              <div className='level-left'>
                <div className='level-item'>
                  <figure className='image is-24x24'><WowClassImage keyClass='hunt' keySpec='dd'/></figure>&nbsp;&nbsp;1 Chasseur
                </div>
              </div>
            </div>
          </div>
          <div className='box'>
            <div className='has-text-centered'>
              <WowRaidImage instance='bwl' />
              <span className='is-size-5 has-text-success'>8/8 en 59m14s</span>
            </div>
            <div className='has-text-centered'>
              <WowRaidImage instance='mc'/>
              <span className='is-size-5 has-text-success'>10/10 en 1h04m34s</span>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Home
