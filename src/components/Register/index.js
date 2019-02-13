import React, {useContext} from 'react';
import { PropTypes as T } from 'prop-types';
import history from '../../history'

import useInputChange from '../../dumb/useInputChange'
import {Auth, Load} from '../../dumb/context'

function Register(props) {
  const email = useInputChange('')
  const password = useInputChange('')
  const name = useInputChange('')
  const faker = useContext(Auth)
  const user = useContext(Load)

//---------- method
const onSubmitRegister = async () =>{
  try{
    const fetch1 = await fetch('https://radiant-hamlet-18347.herokuapp.com/register', {
      method:'post',
      headers:{
        'Content-Type':'application/json'},
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    })
    const response = await fetch1.json()
    const respond = await response
      if(response.id){
        user(response)
        faker.authenticate(() => history.push(`/User/${response.name}`));
      }else{
        user(0)
        alert('Please fill out the input')
        alert('Or Your Email Already Exist')
      }
    return respond
  }catch(error){
    console.log(error, 'something went wrong')
  }
}

//--------- render
	 return(
	 <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
		<main className="pa4 black-80">
  			<div className="measure">
    		<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      		<legend className="f2 fw6 ph0 mh0">Register</legend>
     	 	 <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            type="text" 
            name="name"  
            id="name"
            {...name}
            />
        </div>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            type="email" 
            name="email-address"  
            id="email-address" 
            {...email}
            />
        </div>
     	 	<div className="mv3">
        		<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        		<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            type="password" 
            name="password"  
            id="password"
            {...password}
            />
      		</div>
    		</fieldset>
    		<div className="">
      			<input
      			onClick= {onSubmitRegister}
      			className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      			type="submit" 
      			value="Register"/>
   		 	</div>
  		</div>
		</main>
	 </article>
	 );
}

Register.proptypes = {
  history: T.object
}
Register.defaultProps = {
  history: {}
}

export default Register