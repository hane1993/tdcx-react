import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { UserContext } from './context/UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [tasks, setTasks] = useState({});

  return (
    <div className='App'>
      <UserContext.Provider value={{ isLogin, setIsLogin, tasks, setTasks }}>
        <Router>
          <Switch>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
          </Switch>

          {!isLogin ? <Redirect to='/login' /> : <Redirect to='/dashboard' />}
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
