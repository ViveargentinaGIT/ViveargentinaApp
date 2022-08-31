import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage.jsx';
import Cities from './components/Cities/Cities.jsx'
import City from './components/City/City.jsx'
import Packages from './components/Packages/Packages.jsx';
import Experiences from './components/Experiences/Experiences.jsx';
import FilterCities from './components/Filters/FilterCities.jsx';
import ContactUs from './components/ContactUs/ContactUs'
import Error404 from './components/Error404/Error404'



    function App() {
      return (
        <BrowserRouter>
        <div className="App">    
          <Switch>

            <Route exact path="/" component={LandingPage}/>
            <Route path="/contact_us"  component={ContactUs}/> 
            <Route exact path="/cities"  component={Cities}/>
            <Route exact path="/city"  component={City}/>
            <Route exact path="/home"  component={HomePage}/>
            <Route exact path="/filters"  component={FilterCities}/> 
            <Route path="/packages/:cityId"  component={Packages}/>
            <Route exact path="/packages"  component={Packages}/>
            <Route path="/experiences/:packageId"  component={Experiences}/> 
            <Route exact path="/experiences"  component={Experiences}/> 
            <Route path="*" component={Error404}/>      
          </Switch>    
        </div>
        </BrowserRouter>
      );
    }
    
    export default App;
