import { endApplicationRequest, fetchApplicationsByOfferId } from 'appSlice';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { Wrapper } from './OfferApplications.styles';
import { format } from 'date-fns';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ButtonWrapper } from './OfferApplications.styles';
import DateModal from 'components/DateModal/DateModal';

const OfferApplications = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { loading, applications } = useSelector(state => state.app);

	const [show, setShow] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		dispatch(fetchApplicationsByOfferId(id));
	}, [dispatch, id]);
	return (
		<>
			<DateModal show={show} handleShow={handleShow} handleClose={handleClose} selectedId={selectedId} />
			{loading ? (
				<LoadingSpinner />
			) : (
				<>
					{applications.length > 0 ? (
						<Wrapper>
							<Row xs={1} md={1} lg={1} className='g-4'>
								{applications.map(application => (
									<Col key={application.id}>
										<Card className='text-center'>
											<Card.Body>
												<Card.Title>{application.jobOffer.title}</Card.Title>
												<Card.Subtitle className='mb-2 text-muted'>
													Pracodawca: {application.jobOffer.company}
												</Card.Subtitle>
												<Card.Text>
													Osoba: {application.applicationUser.firstName} {application.applicationUser.lastName}
												</Card.Text>
												<Card.Text>
													<p>Email: {application.applicationUser.username}</p>
													<p>Telefon: {application.phoneNumber}</p>
												</Card.Text>
												<Card.Text>
													<p>Doświadczenie</p>
													{application.experience}
												</Card.Text>
												<Card.Text>
													<Badge bg='primary'>Oczekiwane zarobki: {application.expectedWages}</Badge>
												</Card.Text>
												{application.end ? (
													<Alert variant='secondary'>Rekrutacja zakończona</Alert>
												) : (
													<>
														{application.dateOfInterview ? (
															<Alert variant='info'>Termin rozmowy rekrutacyjnej: {application.dateOfInterview}</Alert>
														) : (
															<Alert variant='light'>Termin rozmowy nie został jeszcze ustalony</Alert>
														)}
														<ButtonWrapper>
															<Button
																variant='warning'
																onClick={() => {
																	setSelectedId(application.id);
																	handleShow();
																}}>
																{application.dateOfInterview ? 'Zmień termin rekrutacji' : 'Ustaw termin rekrutacji'}
															</Button>
															<Button
																variant='danger'
																onClick={async () => {
																	await dispatch(endApplicationRequest(application.id));
																	dispatch(fetchApplicationsByOfferId(id));
																}}>
																Zakończ
															</Button>
														</ButtonWrapper>
													</>
												)}
											</Card.Body>
											<Card.Footer className='text-muted'>
												<div>Data aplikacji: {format(new Date(application.applicationDate), 'd MMMM yyyy, HH:mm')}</div>
											</Card.Footer>
										</Card>
									</Col>
								))}
							</Row>
						</Wrapper>
					) : (
						<Alert className='text-center m-3'>Brak zgłoszeń do wybranej oferty</Alert>
					)}
				</>
			)}
		</>
	);
};

export default OfferApplications;
