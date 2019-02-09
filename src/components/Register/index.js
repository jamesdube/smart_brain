import React, {useState} from 'react';
import { PropTypes as T } from 'prop-types';
import history from '../../history'

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,  setName] = useState('');

//---------- method
const onNameChange = (event) =>{
  setName(event.target.value)
}

const onEmailChange = (event) =>{
  setEmail(event.target.value)
}

const onPasswordChange = (event) =>{
  setPassword(event.target.value)
}

const onSubmitRegister = async () =>{
  try{
    const fetch1 = await fetch('https://radiant-hamlet-18347.herokuapp.com/register', {
      method:'post',
      headers:{
        'Content-Type':'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    const response = await fetch1.json()
    const respond = await response
      if(response.id){
        props.loadUser(response)
        props.fakeAuth.authenticate(() => history.push("/User"));
      }else if(!response.name || !response.email || !respond.password){
        props.loadUser(0)
        alert('please fill out the input')
      }else{
        props.loadUser(0)
        alert('Email already exist')
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
            onChange={onNameChange} 
            />
        </div>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            type="email" 
            name="email-address"  
            id="email-address" 
            onChange={onEmailChange}
            />
        </div>
     	 	<div className="mv3">
        		<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        		<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            type="password" 
            name="password"  
            id="password"
            onChange={onPasswordChange}
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
  loadUser: T.object.isRequired,
  fakeAuth: T.object.isRequired,
  history: T.object
}
Register.defaultProps = {
  history: {}
}

export default Register