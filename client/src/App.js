import './App.css';
import {Switch, Route} from 'react-router-dom'
import {LandingPage} from './components/landingPage/LandingPage'
import {Home} from './components/home/Home'
import {CountriesDetails} from './components/countriesDetails/CountriesDetails'
import {CreateActivity} from './components/createActivity/CreateActivity'
import { Activities } from './components/activities/Activities'
import {ActivitiesDetails} from './components/activityDetails/ActivitiesDetails'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/home/create/activities/:id' component={ActivitiesDetails}/>
        <Route exact path='/home/create/activities' component={Activities}/>
        <Route exact path='/home/create' component={CreateActivity}/>
        <Route exact path='/home/:id' component={CountriesDetails}/>
        <Route exact path='/home' component={Home}/>
        <Route path='/' component={LandingPage}/>
      </Switch>
      
    </div>
  );
}

export default App;
