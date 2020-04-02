import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import User from './pages/User'
import AuthRedirect from './pages/AuthRedirect'
import Register from './pages/Register'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/auth-discord"> <AuthRedirect service='discord'/> </Route>
        <Route path="/auth-github"><AuthRedirect service='github'/></Route>
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute exact path='/user' component={User} />
      </Switch>
    </Router>
  )
}

export default App
