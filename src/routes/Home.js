import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className='homePage'>
			<h1>WELCOME TO REALLISTIC</h1>
			<div className='homeScreen'>
				<div className='signup'>
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
			</div>
			<div className='guest'>
				<Link to='/listings/all'> Browse All Listings As Guest</Link>
			</div>
		</div>
	);
}

export default Home;
