import { Link } from 'react-router-dom';
import SignUp from '../components/SignUp';

function Home() {
	return (
		<div>
			<div className='homePage'>
				<h1 className='text-5xl font-bold'>WELCOME TO REALLISTIC</h1>
			</div>
			<SignUp />

			{/* <div className='signup'>
					<Link to={`/signup`}>
						<button className='signup'>
							<span>Sign Up</span>
						</button>
					</Link>
				</div>
				<div className='login'>
					<Link to={`/auth`}>
						<button className='login'>
							<span>Log In</span>
						</button>
					</Link>
				</div>
			<div className='guest'>
				<Link to='/listings/all'> Browse All Listings As Guest</Link>
			</div>
		</div> */}
		</div>
	);
}

export default Home;
