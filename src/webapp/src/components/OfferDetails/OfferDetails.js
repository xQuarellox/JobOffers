import { applicationAddRequest, fetchOfferById, setError } from 'appSlice';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { ButtonAndLinkWrapper, Wrapper, Title, FormWrapper } from './OfferDetails.styles';
import { format } from 'date-fns';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

const OfferDetails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const { loading, offer, error } = useSelector(state => state.app);
	const [formState, setFormState] = useState({
		phoneNumber: '',
		expectedWages: 0,
		experience: ''
	});

	useEffect(() => {
		if (id) dispatch(fetchOfferById(id));
	}, [id, dispatch]);

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
			const actionResult = await dispatch(applicationAddRequest({ ...formState, jobOfferId: id }));
			if (actionResult.type.endsWith('fulfilled')) {
				navigate('/');
			}
		}
	};

	return (
		<>
			{loading || !offer ? (
				<LoadingSpinner />
			) : (
				<Wrapper>
					<Card className='text-center'>
						<Card.Body>
							<Card.Title>{offer.title}</Card.Title>
							<Card.Subtitle className='mb-2 text-muted'>Pracodawca: {offer.company}</Card.Subtitle>
							<Card.Text>{offer.address}</Card.Text>
							<Card.Text>
								<Badge bg='primary'>
									Płaca od: {offer.wagesFrom} do: {offer.wagesTo}
								</Badge>
							</Card.Text>
							<Card.Text>{offer.description}</Card.Text>
						</Card.Body>
						<Card.Footer className='text-muted'>
							<div>{format(new Date(offer.created), 'd MMMM yyyy, HH:mm')}</div>
							<div>{`Dodano przez: ${offer.user.firstName} ${offer.user.lastName}`}</div>
						</Card.Footer>
					</Card>
					<FormWrapper>
						<Form onSubmit={e => handleSubmit(e)}>
							<Title>Aplikuj</Title>
							<Form.Group className='mb-3' controlId='phoneNumber'>
								<Form.Label>Numer kontaktowy</Form.Label>
								<Form.Control
									type='text'
									placeholder='+48 600 500 400'
									value={formState.phoneNumber}
									onChange={e => handleForm(e)}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='expectedWages'>
								<Form.Label>Oczekiwana kwota</Form.Label>
								<Form.Control
									type='number'
									placeholder='3000'
									value={formState.expectedWages}
									onChange={e => handleForm(e)}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='experience'>
								<Form.Label>Doświadczenie</Form.Label>
								<Form.Control
									as='textarea'
									rows={3}
									placeholder='Pracowalem 5 lat jako Java senior deweloper w firmie ...'
									value={formState.experience}
									onChange={e => handleForm(e)}
								/>
							</Form.Group>
							{error && <Alert variant='danger'>{error}</Alert>}
							<ButtonAndLinkWrapper>
								<Button variant='success' type='submit'>
									Aplikuj
								</Button>
							</ButtonAndLinkWrapper>
						</Form>
					</FormWrapper>
				</Wrapper>
			)}
		</>
	);
};

export default OfferDetails;
