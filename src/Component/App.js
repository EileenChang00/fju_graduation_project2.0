
import './App.css';
import Home from './home';
import Customer from './customer';
import Changepw from './changepw';
import Changemenu from './changemenu';
import {
    BrowserRouter as Router,
    //Switch,
    Route,
    //Link
} from 'react-router-dom';

function App() {
    return (
        <Router>
            <switch>
                <Route exact path="/" component={Home}/>
                <Route path="/customer" component={Customer}/>
                <Route path="/changepw" component={Changepw}/>
                <Route path="/changemenu" component={Changemenu}/>
            </switch>
        </Router>
    );
}

export default App;
