import './App.css';
import {React} from 'react'
import Home from './pages/Home';
import Objectives from './pages/Objectives';
import Guide from './pages/Guide';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import HospitalLogin from './pages/hospitals/HospitalLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import HospitalDetsils from './pages/hospitals/HospitalsDetailsPage';
import HospitalDashboard from './pages/hospitals/HospitalDashboard';
import Logout from './pages/admin/AdminLogout';
import HospitalLogout from './pages/hospitals/HospitalLogout';
import MapWork from './pages/map/mapWork';
import HospitalRegister from './pages/hospitals/HospitalRegistrationRequest';


import {Route, Switch, Redirect} from 'react-router-dom';

function App() {
  const token = localStorage.getItem('token')

  return (
    <div className="App">
      {/* <NavbarMenu AdminToken={token}/> */}
      <Switch>
        <Route path="/" exact={true}><Home /></Route>
        <Route path="/objectives"><Objectives /></Route>
        <Route path="/guide"><Guide /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/contact"><Contact /></Route>
        <Route path="/admin_login">{token ? <Redirect to="/admin_dashboard" /> : <AdminLogin />}</Route>
        <Route path="/hospital_login"><HospitalLogin /></Route>
        <Route path="/admin_dashboard"><AdminDashboard /></Route>
        <Route path="/hospitalDetails"><HospitalDetsils /></Route>
        <Route path="/hospitalDashboard"><HospitalDashboard /></Route>
        <Route path="/logout"><Logout /></Route>
        <Route path="/hospitalLogout"><HospitalLogout /></Route>
        <Route path="/mapWork"><MapWork /></Route>
        <Route path="/hospital_register"><HospitalRegister /></Route>
        <Route path="*"><PageNotFound /></Route>
       </Switch>
    </div>
  );
}

function PageNotFound(){
  return(
    <div>
      <h1>It Is 404 Page Not Found</h1>
    </div>
  )
}

export default App;
