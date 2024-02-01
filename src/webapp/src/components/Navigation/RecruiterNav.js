import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

const RecruiterNav = () => {
	const navigate = useNavigate();
	return (
		<Nav className='me-auto'>
			<Nav.Link onClick={() => navigate('/')}>Twoje oferty</Nav.Link>
			<Nav.Link onClick={() => navigate('/offer-add')}>Dodaj ofertę</Nav.Link>
		</Nav>
	);
};

export default RecruiterNav;
