import { deactiveJobOffer, fetchRecruiterOffers } from 'appSlice';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { ButtonWrapper, Wrapper } from './HomePage.styles';
import { format } from 'date-fns';
import Alert from 'react-bootstrap/Alert';

const RecruiterHomePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, offers } = useSelector(state => state.app);

	useEffect(() => {
		dispatch(fetchRecruiterOffers());
	}, [dispatch]);
	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<Wrapper>
					<Row xs={1} md={2} lg={3} className='g-4'>
						{offers.map(offer => (
							<Col key={offer.id}>
								<Card className='text-center'>
									<Card.Body>
										<Card.Title>{offer.title}</Card.Title>
										<Card.Subtitle className='mb-2 text-muted'>Pracodawca: {offer.company}</Card.Subtitle>
										<Card.Text>{offer.address}</Card.Text>
										<Card.Text>
											<Badge bg='primary'>
												Płaca od: {offer.wagesFrom} PLN do: {offer.wagesTo} PLN
											</Badge>
										</Card.Text>
										{offer.active ? (
											<ButtonWrapper>
												<Button variant='primary' onClick={() => navigate(`/offer-applications/${offer.id}`)}>
													Zgłoszenia
												</Button>
												<Button variant='warning' onClick={() => navigate(`/offer-edit/${offer.id}`)}>
													Edytuj
												</Button>
												<Button
													variant='danger'
													onClick={async () => {
														await dispatch(deactiveJobOffer(offer.id));
														dispatch(fetchRecruiterOffers());
													}}>
													Dezaktywuj
												</Button>
											</ButtonWrapper>
										) : (
											<Alert variant='light'>Oferta wygasła</Alert>
										)}
									</Card.Body>
									<Card.Footer className='text-muted'>
										{format(new Date(offer.created), 'd MMMM yyyy, HH:mm')}
									</Card.Footer>
								</Card>
							</Col>
						))}
					</Row>
				</Wrapper>
			)}
		</>
	);
};

export default RecruiterHomePage;
