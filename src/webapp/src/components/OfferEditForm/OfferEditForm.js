import Form from 'react-bootstrap/Form';
import { ButtonAndLinkWrapper, Title, Wrapper } from './OfferEditForm.styles';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOfferById, offerEditRequest, setError } from 'appSlice';
import Alert from 'react-bootstrap/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

const OfferEditForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const { error, loading, offer } = useSelector(state => state.app);
	const [formState, setFormState] = useState({
		title: '',
		company: '',
		address: '',
		wagesFrom: 0,
		wagesTo: 0,
		description: ''
	});

	useEffect(() => {
		if (id) dispatch(fetchOfferById(id));
	}, [id, dispatch]);

	useEffect(() => {
		if (offer) setFormState(offer);
	}, [offer]);

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
			if (typeof value === 'string') {
				if (value.length === 0) {
					dispatch(setError('Uzupełnij wszystkie pola!'));
					empty = true;
				}
			}
			if (typeof value === 'number') {
				if (value <= 0) {
					dispatch(setError('Zarobki muszą być większe od 0!'));
					empty = true;
				}
			}
		});
		if (!empty) {
			const actionResult = await dispatch(offerEditRequest(formState));
			if (actionResult.type.endsWith('fulfilled')) {
				navigate('/');
			}
		}
	};

	return (
		<>
			{loading && !offer ? (
				<LoadingSpinner />
			) : (
				<Wrapper>
					<Form onSubmit={e => handleSubmit(e)}>
						<Title>Edycja oferty pracy</Title>
						<Form.Group className='mb-3' controlId='title'>
							<Form.Label>Tytuł oferty</Form.Label>
							<Form.Control
								type='text'
								placeholder='PROGRAMISTA JAVA'
								value={formState.title}
								onChange={e => handleForm(e)}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='company'>
							<Form.Label>Pracodawca</Form.Label>
							<Form.Control
								type='text'
								placeholder='MDEV SP. Z.O.O.'
								value={formState.company}
								onChange={e => handleForm(e)}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='address'>
							<Form.Label>Adres</Form.Label>
							<Form.Control
								type='text'
								placeholder='ul. Sporotwa 5, Warszawa'
								value={formState.address}
								onChange={e => handleForm(e)}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='wagesFrom'>
							<Form.Label>Zarobki od</Form.Label>
							<Form.Control
								type='number'
								placeholder='4000'
								value={formState.wagesFrom}
								onChange={e => handleForm(e)}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='wagesTo'>
							<Form.Label>Zarobki do</Form.Label>
							<Form.Control type='number' placeholder='8000' value={formState.wagesTo} onChange={e => handleForm(e)} />
						</Form.Group>
						<Form.Group className='mb-3' controlId='description'>
							<Form.Label>Opis</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								placeholder='Szukamy programisty Java.'
								value={formState.description}
								onChange={e => handleForm(e)}
							/>
						</Form.Group>
						{error && <Alert variant='danger'>{error}</Alert>}
						<ButtonAndLinkWrapper>
							<Button variant='success' type='submit' className='m-1'>
								Zapisz zmiany
							</Button>
							<Button variant='danger' type='submit' className='m-1' onClick={() => navigate('/')}>
								Anuluj
							</Button>
						</ButtonAndLinkWrapper>
					</Form>
				</Wrapper>
			)}
		</>
	);
};

export default OfferEditForm;
