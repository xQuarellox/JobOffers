import Form from 'react-bootstrap/Form';
import { ButtonAndLinkWrapper, Title, Wrapper, StyledLink } from './LoginPage.styles';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, setError } from 'appSlice';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, token, loading } = useSelector(state => state.app);

	const [formState, setFormState] = useState({
		email: '',
		password: ''
	});

	useEffect(() => {
		if (token) navigate('/');
	}, [token, navigate]);

	const handleForm = e => {
		let tmp = { ...formState };
		tmp[e.target.id] = e.target.value;
		setFormState(tmp);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const keys = Object.keys(formState);
		let empty = false;
		keys.forEach(key => {
			const value = formState[key];
			if (value.length === 0) {
				dispatch(setError('Uzupełnij wszystkie pola!'));
				empty = true;
			}
		});
		if (!empty) dispatch(loginRequest(formState));
	};

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<Wrapper>
					<Form onSubmit={e => handleSubmit(e)}>
						<Title>Logowanie</Title>
						<Form.Group className='mb-3' controlId='email' value={formState.email} onChange={e => handleForm(e)}>
							<Form.Label>Adres email</Form.Label>
							<Form.Control type='email' placeholder='name@example.com' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='password'>
							<Form.Label>Hasło</Form.Label>
							<Form.Control
								type='password'
								placeholder='********'
								value={formState.password}
								onChange={e => handleForm(e)}
							/>
						</Form.Group>
						{error && <Alert variant='danger'>{error}</Alert>}
						<ButtonAndLinkWrapper>
							<StyledLink to='/signup'>Nie masz konta? Stwórz je!</StyledLink>
							<Button variant='success' type='submit'>
								Zaloguj
							</Button>
						</ButtonAndLinkWrapper>
					</Form>
				</Wrapper>
			)}
		</>
	);
};

export default LoginPage;
