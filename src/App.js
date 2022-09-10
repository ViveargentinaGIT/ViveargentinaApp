import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage.jsx";
import Cities from "./components/Cities/Cities.jsx";
import City from "./components/City/City.jsx";
import Packages from "./components/Packages/Packages.jsx";
import Experiences from "./components/Experiences/Experiences.jsx";
// import FilterCities from './components/Filters/FilterCities.jsx';
import ContactUs from "./components/ContactUs/ContactUs";
import Error404 from "./components/Error404/Error404";
import Cart from "./components/Cart/Cart";
import MenuUser from "./components/User/MenuUser";
import MenuGuest from "./components/User/MenuGuest";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/User/Profile"
import MyTrips from "./components/User/MyTrips";
import MyFavs from './components/User/MyFavs.jsx';
import Verify from "./components/User/Verify";
import AdminDashboard from './components/Admin/AdminDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/profile" component={Profile}/>
          <Route path="/contact_us" component={ContactUs} />
          <Route exact path="/cities" component={Cities} />
          <Route exact path="/city" component={City} />
          <Route exact path="/home" component={HomePage} />
          <Route path="/packages/:cityId" component={Packages} />
          <Route path="/verify/:id" component={Verify} />
          <Route exact path="/packages" component={Packages} />
          <Route path="/experiences/:packageId" component={Experiences} />
          <Route exact path="/experiences" component={Experiences} />
          <Route path="/cart" component={Cart} />
          <Route path="/userlogged" component={MenuUser} />
          <Route path="/userguest" component={MenuGuest} />
          <Route path="/mytrips" component={MyTrips} />
          <Route path="/myfavs" component={MyFavs} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="*" component={Error404} />
          
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;