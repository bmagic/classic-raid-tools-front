import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './js/lib/store'
import { PersistGate } from 'redux-persist/integration/react'

import App from './js/App'

import './styles/styles.scss'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app'))
