import RecruiterHomePage from './RecruiterHomePage';
import UnloggedHomePage from './UnloggedHomePage';
import WorkerHomePage from './WorkerHomePage';

const HomePage = ({ user }) => {
	if (!user) return <UnloggedHomePage />;
	if (user.role === 'Rekruter') return <RecruiterHomePage />;
	if (user.role === 'Pracownik') return <WorkerHomePage />;
};

export default HomePage;
