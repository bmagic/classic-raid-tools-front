import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/Common/PrivateRoute'
import Home from './pages/Home'
import User from './pages/User'
import Characters from './pages/Characters'
import moment from 'moment'

import AuthRedirect from './pages/AuthRedirect'
import AdminUsers from './pages/AdminUsers'
import Raid from './pages/Raid'
import Roadmap from './pages/Roadmap'

const App = () => {
  moment.locale('fr')
  return (
    <Router>
      <Switch>
        <Route path="/auth-discord"><AuthRedirect/></Route>
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute exact path="/roadmap" component={Roadmap}/>
        <PrivateRoute exact path='/user' component={User} />
        <PrivateRoute exact path='/characters' component={Characters}/>
        <PrivateRoute exact roles={['admin']} path='/admin/users' component={AdminUsers}/>
        <PrivateRoute exact roles={['member']} path='/raid/:id' component={Raid}/>

      </Switch>
    </Router>
  )
}

export default App
