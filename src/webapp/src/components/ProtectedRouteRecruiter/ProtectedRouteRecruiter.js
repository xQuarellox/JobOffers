import { Navigate } from 'react-router-dom';

const ProtectedRouteRecruiter = ({ user, children }) => {
	if (!user) {
		return <Navigate to='/login' replace />;
	}

	if (user.role !== 'Rekruter') {
		return <Navigate to='/' replace />;
	}

	return children;
};

export default ProtectedRouteRecruiter;
