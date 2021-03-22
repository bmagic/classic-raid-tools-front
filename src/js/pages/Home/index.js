import React from 'react'
import Layout from '../../components/Common/Layout'
import WowRaidImage from '../../components/Common/WowRaidImage'
import LastItems from '../../components/Items/LastItems'

const Home = () => {
  return (
    <Layout>
      <div className='home'>
        <div className='columns'>
          <div className='column is-3'>
            <div className='has-text-centered'>
              <WowRaidImage instance='mc'/>
              <div className='is-size-5 has-text-success'>10/10 en 59m14s</div>
            </div>
          </div>
          <div className='column is-3'>
            <div className='has-text-centered'>
              <WowRaidImage instance='bwl' />
              <div className='is-size-5 has-text-success'>8/8 en 45m57s</div>
            </div>
          </div>
          <div className='column is-3'>
            <div className='has-text-centered'>
              <WowRaidImage instance='aq40' />
              <div className='is-size-5 has-text-success'>9/9 en 1h19m07s</div>
            </div>
          </div>
          <div className='column is-3'>
            <div className='has-text-centered'>
              <WowRaidImage instance='naxxramas' />
              <div className='is-size-5 has-text-success'>15/15 en 3h38m07s</div>
            </div>
          </div>
        </div>
        <div className='columns'>
          <div className='column is-8'>
            <div className='box'>
              <h2 className='title '>Qui sommes nous ?</h2>
              <p className='content '>
                <strong className='has-text-white'>Notre guilde</strong> a pour objectif de nettoyer le contenu raid PvE de WoW Classic dans son intégralité, de manière sereine, efficace et dans une bonne ambiance.
              </p>
              <p className='content '>
                <strong className='has-text-white'>Nous demandons  à nos membres</strong> un investissement conséquent dans les raids du palier actuel afin d'assurer des performances correctes : Consommables et World Buff.
              </p>
              <p className='content '>
                <strong className='has-text-white'>Notre objectif actuel</strong> est de continuer de farmer Naxxramas en 1 soirée et de s’organiser pour faire le meilleur roster possible pour The Burning Crusade en restant sur 2 soirs de raid par semaine (sans faire de “speedrun” pour autant).
              </p>
            </div>
            <div className='box'>
              <h2 className='title '>Jours de raids</h2>
              <p className='content '>
                <strong className='has-text-white'>Soir de Raid obligatoire :</strong>  Mercredi 20h45 (Naxxramass 15/15)<br/>
                (Si l’ID n’est pas clean en un soir, la suite est le Dimanche 20h45 et est obligatoire).
              </p>
              <p className='content '>
                <strong className='has-text-white'>Soirs de Raid optionnels :</strong> Vendredi 21h (Gbid AQ40) - Jeudi 21h BWL - Dimanche 21h MC
              </p>
            </div>

          </div>
          <div className='column is-4'>
            <div className='box has-background-success'>
              <a href='https://discord.gg/weFYE6f'>
                <div className='level'>
                  <div className='level-item'>
                    <i className='fab fa-discord'/>&nbsp;Rejoignez notre serveur discord
                  </div>
                </div>
              </a>
            </div>
            <div className='box'>
              <h2 className='title'>Derniers items</h2>
              <LastItems/>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Home
