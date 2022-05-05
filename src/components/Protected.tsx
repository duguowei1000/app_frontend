import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Authentication/Provider';

export default function Protected({
	credType,
	children,
}: {
	credType: string;
	children: JSX.Element;
}) {
	const [loginState, _] = useContext(AuthContext);

	const allowed = ['admin', credType];

	if (!allowed.includes(loginState.accountType)) {
		<Navigate to='fourohthree' replace />;
	}

	return children;
}
