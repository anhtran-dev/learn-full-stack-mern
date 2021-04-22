import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Auth from "./features/Auth/Auth";
function App() {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" render = {props => <Auth {...props} authRoute = 'login' /> } />
            <Route exact path="/register" render = {props => <Auth {...props} authRoute = 'register' /> } />
        </Switch>
      </Router>

  );
}

export default App;
