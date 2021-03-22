import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/Common/PrivateRoute'
import User from './pages/User'
import Characters from './pages/Characters'
import moment from 'moment'

import AuthRedirect from './pages/AuthRedirect'
import AdminUsers from './pages/AdminUsers'
import Roster from './pages/Roster'
import Bank from './pages/Bank'
import Presences from './pages/Presences'
import E404 from './pages/404'
import Home from './pages/Home'
import Character from './pages/Character'
import CharactersComparator from './pages/CharactersComparator'
import EnchantsAnalyzer from './pages/Debrief'
import Professions from './pages/Professions'
import Attendance from './pages/Attendance'

const App = () => {
  moment.locale('fr')
  return (
    <Router>
      <Switch>
        <Route path="/auth-discord"><AuthRedirect/></Route>
        <Route exact path='/' component={Home} />
        <Route exact path='/roster' component={Roster}/>
        <Route exact path='/attendance' component={Attendance}/>
        <Route exact path="/character/:name" component={Character}/>
        <PrivateRoute exact path="/characters-comparator" roles={['member']} component={CharactersComparator}/>
        <PrivateRoute exact path='/user' component={User} />
        <PrivateRoute exact path='/characters' component={Characters}/>
        <PrivateRoute exact path="/bank" roles={['member']} component={Bank}/>
        <PrivateRoute exact path="/debriefs" roles={['member']} component={EnchantsAnalyzer}/>
        <PrivateRoute exact path='/professions' roles={['member']} component={Professions}/>
        <PrivateRoute exact path="/presences" roles={['member']} component={Presences}/>
        <PrivateRoute exact path='/admin/users' roles={['admin']} component={AdminUsers}/>
        <Route component={E404} />
      </Switch>
    </Router>
  )
}

export default App
