import React from 'react'
import Layout from '../../components/Common/Layout'

const Roadmap = () => {
  return (
    <Layout>
      <p className='content'>
        <h1>Roadmap</h1>
        <h2>Fait</h2>
        <ul>
          <li>Connexion Discord</li>
          <li>Page profile basique avec changement de pseudo et d'email</li>
          <li>Page characters basique</li>
          <li>Page admin pour donner des roles aux utilisateurs</li>
          <li>Page raid simple avec inscriptions</li>
          <li>Possibilité de modifier les informations de raid (Logs / Heure de début / Lien vers la feuille gdoc ...)</li>
          <li>Progress bar sur la page d'accueil pour le remplissage de chaque raid</li>
        </ul>
        <h2>A faire</h2>
        <ul>
          <li>Ajouter une page roster pour voir les personnages taggé "main" des utilisateurs</li>
          <li>Différencier les raids principaux vs les raids secondaires (ZG puis plus tard MC etc)</li>
          <li>Utilisation d'un Webhook discord à la création d'un événement pour prévenir de la création</li>
          <li>Utilisation d'un webhook discord pour prévenir les utilisateurs non inscrits 72h / 48h /24h avant le raid.</li>
          <li>Implémentation de la BDG avec webhook et historique plus poussé que l'outil actuel</li>
          <li>Gestion de la présence des joueurs</li>
          <li>Gestion de l'historique des loots</li>
        </ul>
      </p>
    </Layout>
  )
}

export default Roadmap
