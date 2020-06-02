import React from 'react'
import Layout from '../../components/Common/Layout'

const E404 = () => {
  return (
    <Layout>

      <div className="container">
        <h1 className="title">
            404, la page est introuvable
        </h1>
        <h2 className="subtitle">
          <a href='/'>{'Revenir à la page d\'accueil'}</a>
        </h2>
      </div>

    </Layout>
  )
}

export default E404
