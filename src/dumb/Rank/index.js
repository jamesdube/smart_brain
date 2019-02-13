import React, {useContext} from 'react';
import {User} from '../context'

const Rank = ({entries}) =>{
	const user = useContext(User)
	return(
	<>
		<div className='white f2'>
			{`${user.name}, Your Current Entry Count Is ... `}
		</div>
			<div className=' white f2'>
				{entries}
			</div>
	</>
	);
} 
export default Rank