import Form from 'react-bootstrap/Form';
import { ButtonWrapper, Title, Wrapper } from './RegistrationPage.styles';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, setError, signUpRequest } from 'appSlice';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

const RegistrationPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, roles, loading } = useSelector(state => state.app);
	const [formState, setFormState] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
		roleName: ''
	});

	useEffect(() => {
		dispatch(fetchRoles());
	}, [dispatch]);

	const handleForm = e => {
		let tmp = { ...formState };
		tmp[e.target.id] = e.target.value;
		setFormState(tmp);
	};

	const handleSubmit = async e => {
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

		if (!empty) await dispatch(signUpRequest(formState));
		if (!error && !empty) navigate('/');
	};

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<Wrapper>
					<Form onSubmit={e => handleSubmit(e)}>
						<Title>Rejestracja</Title>
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
						<Form.Group className='mb-3' controlId='confirmPassword'>
							<Form.Label>Potwierdź hasło</Form.Label>
							<Form.Control
								type='password'
								placeholder='********'
								value={formState.confirmPassword}
								onChange={e => handleForm(e)}
							/>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='firstName'
							value={formState.firstName}
							onChange={e => handleForm(e)}>
							<Form.Label>Imie</Form.Label>
							<Form.Control type='text' placeholder='Jan' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='lastName' value={formState.lastName} onChange={e => handleForm(e)}>
							<Form.Label>Nazwisko</Form.Label>
							<Form.Control type='text' placeholder='Nowak' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='roleName'>
							<Form.Select
								aria-label='Default select example'
								id='roleName'
								value={formState.role}
								onChange={e => handleForm(e)}>
								<option value=''>Wybierz role</option>
								{roles.map(role => (
									<option key={role} value={role}>
										{role}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						{error && <Alert variant='danger'>{error}</Alert>}
						<ButtonWrapper>
							<Button variant='success' type='submit' className='m-2'>
								Stwórz konto
							</Button>
						</ButtonWrapper>
					</Form>
				</Wrapper>
			)}
		</>
	);
};

export default RegistrationPage;
