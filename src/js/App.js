import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/Common/PrivateRoute'
import NextRaids from './pages/NextRaids'
import User from './pages/User'
import Characters from './pages/Characters'
import moment from 'moment'

import AuthRedirect from './pages/AuthRedirect'
import AdminUsers from './pages/AdminUsers'
import Raid from './pages/Raid'
import Roadmap from './pages/Roadmap'
import Roster from './pages/Roster'
import Bank from './pages/Bank'
import Presences from './pages/Presences'
import AdminLoots from './pages/AdminLoots'
import E404 from './pages/404'
import Logout from './pages/Logout'
import Home from './pages/Home'

const App = () => {
  moment.locale('fr')
  return (
    <Router>
      <Switch>
        <Route path="/auth-discord"><AuthRedirect/></Route>
        <Route exact path='/' component={Home} />
        <Route exact path='/roster' component={Roster}/>

        <PrivateRoute exact path="/raids" component={NextRaids}/>
        <PrivateRoute exact path="/roadmap" component={Roadmap}/>
        <PrivateRoute exact path='/user' component={User} />
        <PrivateRoute exact path='/characters' component={Characters}/>
        <PrivateRoute exact path="/bank" roles={['member']} component={Bank}/>
        <PrivateRoute exact path="/presences" roles={['member', 'guest']} component={Presences}/>
        <PrivateRoute exact path='/raid/:id' roles={['member', 'guest']} component={Raid}/>
        <PrivateRoute exact path='/admin/loots' roles={['admin']} component={AdminLoots}/>
        <PrivateRoute exact path='/admin/users' roles={['admin']} component={AdminUsers}/>
        <Route exact path='/reset' component={Logout} />
        <Route component={E404} />
      </Switch>
    </Router>
  )
}

export default App
