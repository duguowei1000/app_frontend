/// <reference types="react" />
export declare const AuthContext: import('react').Context<any[]>;
declare const Provider: ({
	children,
}: {
	children: React.ReactNode;
}) => JSX.Element;
export declare const AuthConsumer: () => JSX.Element;
export declare const AuthToggler: () => JSX.Element;
export default Provider;
