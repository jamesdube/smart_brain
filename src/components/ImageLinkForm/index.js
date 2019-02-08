import React from 'react';
import { PropTypes as T } from 'prop-types';
import './index.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
	return(
	<div>
		<p className="f3">
			{'This Magic Brain Will Detect Faces in Your Pictures'} 
		</p>
		<div className="center">
			<div className="form center pa4 br3 shadow-5px">
				<input className="f4 pa2 w-70 center" type='text' placeholder='Enter Url' onChange={onInputChange}/>
				<button className="w-30 grow f4 link ph3 pv2 dib bg-light-blue" onClick={onButtonSubmit}> Detect </button>
			</div>
		</div>
	</div>
	);
}

ImageLinkForm.propTypes = {
	onInputChange: T.func.isRequired,
	onButtonSubmit: T.func.isRequired
}

export default ImageLinkForm