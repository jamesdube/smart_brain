import React from 'react';
import { PropTypes as T } from 'prop-types';

const Rank = ({name, entries}) =>{
	return(
	<div>
		<div className='white f2'>
			{`${name}, Your Current Entry Count Is ... `}
		</div>
			<div className=' white f2'>
				{entries}
			</div>
	</div>
	);
}

Rank.propTypes = {
	name: T.string,
	entries: T.string
}

Rank.defaultProps = {
	name: '',
	entries: ''
}

export default Rank