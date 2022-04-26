import check from '../assets/images/checkmark.png';
import userpng from '../assets/images/user.png';

import { isAuthenticated } from '../utils/auth';
export default function AuthStatusIndicator() {
	return (
		<>
			{isAuthenticated() ? (
				<div className='auth-status-indicator'>
					<img src={check} alt='checkmark' className='status-indicator-image' />
					{/* <img src={userpng} alt='user' /> */}
				</div>
			) : (
				<div className='auth-status-indicator'>
					<img src={userpng} alt='user' className='status-indicator-image' />
				</div>
			)}
		</>
	);
}
