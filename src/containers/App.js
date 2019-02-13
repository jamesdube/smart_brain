import React, { useState, useContext } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Particles from 'react-particles-js';

// import Component 
import history from '../history'
import SignIn from '../components/SignIn'
import Register from '../components/Register'
import Navigation from '../dumb/Navigation'
import Screen from '../components/Screen'
import {Auth, Load, User} from '../dumb/context'

//-------particle
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

//--------- fake auth
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
}
//-------initial state
const initialState = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: ''
}
function App(){
  const [user,setUser] = useState(initialState) 

//-------- method
  function loadUser(data) {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }
//-------- render
  return (
    <Router history={history}>
      <div className="App">
        {<Particles className="particles" 
          params={particlesOptions}
          />}
        <Auth.Provider value={fakeAuth}>
          <Load.Provider value={loadUser}>
            <User.Provider value={user}>
              <Navigation />
              <Switch>
                <Route exact path="/" component={() => <SignIn />}/>
                <Route path="/Register" component={() => <Register />} />
                <Private path="/User/:name" component={
                  () => <Screen />}
                />
              </Switch>
            </User.Provider>
          </Load.Provider>
        </Auth.Provider>
      </div>
    </Router>
  );
}

function Private({component: Component, ...rest}) {
  const faker = useContext(Auth)
  return (
    <Route {...rest} render={(props) => faker.isAuthenticated 
      ?(<Component {...props} />) 
      :(<Redirect to={{pathname: "/"}}/>)
      }
    />
  );
}

export default App;
