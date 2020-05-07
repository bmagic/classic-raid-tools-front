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
import Roster from './pages/Roster'
import Bank from './pages/Bank'

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
        <PrivateRoute exact path='/roster' component={Roster}/>
        <PrivateRoute exact path="/bank" roles={['member']} component={Bank}/>
        <PrivateRoute exact path='/raid/:id' roles={['member']} component={Raid}/>
        <PrivateRoute exact path='/admin/users' roles={['admin']} component={AdminUsers}/>
      </Switch>
    </Router>
  )
}

export default App
