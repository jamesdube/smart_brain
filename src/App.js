import React, { useState } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Particles from 'react-particles-js';
import './App.css';
import history from './history'

import SignIn from './components/SignIn'
import Register from './components/Register'
import Screen from './Screen'
import Navigation from './components/Navigation'

const particlesOptions = {
  particles: {
    number: {
      value : 35,
    density: {
        enable:true,
        value_area:500
      }
    }
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
   }
};

const initialState = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: ''
}

function App(){
  const [user,setUser] = useState(initialState) 

  const loadUser = (data) =>{
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }
  return (
    <Router history={history}>
      <div className="App">
      {<Particles className="particles" 
              params={particlesOptions}
        />}
      <Navigation fakeAuth={fakeAuth}/>
      <Switch>
        <Route exact path="/" component={() => <SignIn loadUser={loadUser} fakeAuth={fakeAuth}/>}/>
        <Route path="/Register" component={() => <Register loadUser={loadUser} fakeAuth={fakeAuth}/>} />
        <Private path="/User" component={() => <Screen id={user.id} name={user.name} entries={user.entries} loadUser={loadUser}/>} fakeAuth={fakeAuth}/>
      </Switch>
      </div>
    </Router>
  );
}

function Private({component: Component, ...rest}) {
  return (
    <Route {...rest} render={(props) => fakeAuth.isAuthenticated ? 
      (<Component {...props} />) 
      :(<Redirect to={{pathname: "/"}}/>)
      }
    />
  );
}

export default App;
