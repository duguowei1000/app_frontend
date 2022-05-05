import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
const Div = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;

	&& .link {
		margin: 0 auto;
		color: blue;
		text-decoration: underline;
		&:hover {
			font-weight: bold;
		}
	}
`;
export default function Forbidden() {
	const navigate = useNavigate();
	useEffect(() => {
		document.title = 'Forbidden';
		setTimeout(() => {
			navigate('/');
		}, 1800);
		return () => {
			document.title = 'Home';
		};
	}, [navigate]);
	return (
		<Div>
			<h1>You do not have access to this page. Redirecting...</h1>
			<Link to='/' className='link'>
				go back
			</Link>
		</Div>
	);
}
