import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Auth from "./features/Auth/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Home from "./features/Home/Home";
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/login" render={props => <Auth {...props} authRoute='login'/>}/>
                    <Route exact path="/register" render={props => <Auth {...props} authRoute='register'/>}/>
                    <ProtectedRoute exact path='/home' component={Home} />
                </Switch>
            </Router>
        </AuthContextProvider>


    );
}

export default App;
