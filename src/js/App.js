import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import User from './pages/User'
import Characters from './pages/Characters'

import AuthRedirect from './pages/AuthRedirect'
import AdminUsers from './pages/AdminUsers'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth-discord"> <AuthRedirect service='discord'/> </Route>
        <Route path="/auth-github"><AuthRedirect service='github'/></Route>
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute exact path='/user' component={User} />
        <PrivateRoute exact path='/characters' component={Characters}/>
        <PrivateRoute exact roles={['admin']} path='/admin/users' component={AdminUsers}/>
      </Switch>
    </Router>
  )
}

export default App
