import React, {useContext} from 'react';
import { PropTypes as T } from 'prop-types';
import history from '../../history'
import useInputChange from '../../dumb/useInputChange'
import {Auth, Load} from '../../dumb/context'

function SignIn(props) {
  const email = useInputChange('');
  const password = useInputChange('');
  const faker = useContext(Auth)
  const user = useContext(Load)

//---- method
const onSubmitSignIn = async () =>{
  try{
    const fetch1 = await fetch('https://radiant-hamlet-18347.herokuapp.com/signin', {
    method:'post',
    headers:{
      'Content-Type':'application/json'},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  const response = await fetch1.json();
  const respond = await response;
    if(response.id){
      user(response);
      faker.authenticate(() => history.push(`/User/${response.name}`));
    }else{
      alert('Wrong Email or Password!')
      user(0)
    }
  return respond
  }catch(error){
      console.log(error)
  }
}

//----------- render
    return(
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4 black-80">
            <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="email-address"
                {...email} />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password" 
                {...password}
                />
              </div>
            </fieldset>
            <div className="">
                <input
                onClick={onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Login"/>
            </div>
            <div className="lh-copy mt3">
                <p 
                onClick={ () => history.push("/Register")}
                className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
      );
}

SignIn.proptypes = {
  history: T.object
}

SignIn.defaultProps = {
  history: {}
}

export default SignIn