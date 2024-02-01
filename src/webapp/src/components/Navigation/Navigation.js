import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RecruiterNav from './RecruiterNav';
import WorkerNav from './WorkerNav';
import { logout } from 'appSlice';
const Navigation = () => {
	const { user } = useSelector(state => state.app);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<Navbar bg='light' data-bs-theme='light'>
			<Container>
				<Navbar.Brand onClick={() => navigate('/')}>Job offers</Navbar.Brand>
				<Nav className='me-auto'>{user ? user.role === 'Rekruter' ? <RecruiterNav /> : <WorkerNav /> : null}</Nav>
				{user ? (
					<Navbar.Collapse className='justify-content-end'>
						<NavDropdown title={<Navbar.Text>Zalogowany jako: {user.username}</Navbar.Text>} id='basic-nav-dropdown'>
							<NavDropdown.Item
								onClick={() => {
									dispatch(logout());
								}}>
								Wyloguj
							</NavDropdown.Item>
						</NavDropdown>
					</Navbar.Collapse>
				) : (
					<Button onClick={() => navigate('/login')}>Zaloguj</Button>
				)}
			</Container>
		</Navbar>
	);
};

export default Navigation;
