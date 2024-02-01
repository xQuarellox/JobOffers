import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
const WorkerNav = () => {
	const navigate = useNavigate();
	return (
		<Nav className='me-auto'>
			<Nav.Link onClick={() => navigate('/')}>Ofert pracy</Nav.Link>
			<Nav.Link onClick={() => navigate('/user-applications')}>Twoje zgłoszenia</Nav.Link>
		</Nav>
	);
};

export default WorkerNav;
