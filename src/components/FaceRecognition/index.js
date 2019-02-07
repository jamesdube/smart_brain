import React from 'react';
import { PropTypes as T } from 'prop-types';
import './index.css';

const FaceRecognition = ({imageUrl, box }) =>{
	return(
		<div className="center ma">
			<div className="absolute mt2">
				<img id="inputimage" alt='' src={imageUrl} width='500px' heigh='auto' />
				<div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}
FaceRecognition.propTypes = {
	imageUrl: T.string.isRequired,
	box: T.object
}

FaceRecognition.defaultProps = {
	box: {}
}

export default FaceRecognition