import { Navigate } from 'react-router-dom';

const ProtectedRouteWorker = ({ user, children }) => {
	if (!user) {
		return <Navigate to='/login' replace />;
	}

	if (user.role !== 'Pracownik') {
		return <Navigate to='/' replace />;
	}

	return children;
};

export default ProtectedRouteWorker;
