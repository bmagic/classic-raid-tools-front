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
import E404 from './pages/404'
import Logout from './pages/Logout'
import Home from './pages/Home'
import Character from './pages/Character'
import CharactersComparator from './pages/CharactersComparator'
import EnchantsAnalyzer from './pages/Debrief'
import Loots from './pages/Loots'
import LootsSummary from './pages/LootsSummary'
import AdminAvailabilitites from './pages/AdminAvailabilities'
import Raids from './pages/Raids'
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
        <PrivateRoute exact path="/characters-comparator" roles={['member', 'apply', 'casu']} component={CharactersComparator}/>
        <PrivateRoute exact path="/raids/all" component={Raids}/>
        <PrivateRoute exact path="/raids" component={NextRaids}/>
        <PrivateRoute exact path="/roadmap" component={Roadmap}/>
        <PrivateRoute exact path='/user' component={User} />
        <PrivateRoute exact path='/characters' component={Characters}/>
        <PrivateRoute exact path="/loots" roles={['member']} component={Loots}/>
        <PrivateRoute exact path="/loots-summary" roles={['member']} component={LootsSummary}/>
        <PrivateRoute exact path="/bank" roles={['member', 'apply', 'casu']} component={Bank}/>
        <PrivateRoute exact path="/debriefs" roles={['member', 'apply', 'casu']} component={EnchantsAnalyzer}/>
        <PrivateRoute exact path='/professions' roles={['member', 'apply', 'casu']} component={Professions}/>
        <PrivateRoute exact path="/presences" roles={['member', 'apply', 'casu']} component={Presences}/>
        <PrivateRoute exact path='/raid/:id' roles={['member', 'apply', 'casu', 'guest']} component={Raid}/>
        <PrivateRoute exact path='/admin/users' roles={['admin']} component={AdminUsers}/>
        <PrivateRoute exact path='/admin/availabilities' roles={['admin']} component={AdminAvailabilitites}/>
        <Route exact path='/reset' component={Logout} />
        <Route component={E404} />
      </Switch>
    </Router>
  )
}

export default App
