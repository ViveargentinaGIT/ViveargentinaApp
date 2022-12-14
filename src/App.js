import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage.jsx";
import Cities from "./components/Cities/Cities.jsx";
import City from "./components/City/City.jsx";
import Packages from "./components/Packages/Packages.jsx";
import Experiences from "./components/Experiences/Experiences.jsx";
import CreateExperience from "./components/CreateExperience/CreateExperience"
import ContactUs from "./components/ContactUs/ContactUs";
import Error404 from "./components/Error404/Error404";
import Cart from "./components/Cart/Cart";
import Profile from "./components/User/Profile"
import Verify from "./components/User/Verify";
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import UsersTable from "./components/User/UsersTable";
import ResetPassword from "./components/User/ResetPassword";
import Approved from "./components/Payment/Approved";

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
          <Route exact path="/packages" component={Packages} />
          <Route path="/verify/:token" component={Verify} />
          <Route path="/approved" component={Approved} />
          <Route path="/reset_password/:token" component={ResetPassword} />
          <Route path="/experiences/:packageId" component={Experiences} />
          <Route exact path="/experiences" component={Experiences} />
          <Route path="/cart" component={Cart} />
          <Route path="/table" component={UsersTable} />
          <Route path="/create" component={CreateExperience}/>
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/admin/sales" component={AdminDashboard} />
          <Route exact path="/admin/packages" component={AdminDashboard} />
          <Route exact path="/admin/experiences" component={AdminDashboard} />
          <Route exact path="/admin/users" component={AdminDashboard} />
          <Route exact path="/admin/reviews" component={AdminDashboard} />
          <Route path="*" component={Error404} />
          
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;