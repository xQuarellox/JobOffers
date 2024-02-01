import { fetchUserApplications } from 'appSlice';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { Wrapper } from './UserApplications.styles';
import { format } from 'date-fns';
import Alert from 'react-bootstrap/Alert';

const UserApplications = () => {
	const dispatch = useDispatch();
	const { loading, userApplications } = useSelector(state => state.app);

	useEffect(() => {
		dispatch(fetchUserApplications());
	}, [dispatch]);
	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<Wrapper>
					<Row xs={1} md={2} lg={3} className='g-4'>
						{userApplications.map(application => (
							<Col key={application.id}>
								<Card className='text-center'>
									<Card.Body>
										<Card.Title>{application.jobOffer.title}</Card.Title>
										<Card.Subtitle className='mb-2 text-muted'>
											Pracodawca: {application.jobOffer.company}
										</Card.Subtitle>
										<Card.Text>
											<Badge bg='primary'>
												Płaca od: {application.jobOffer.wagesFrom} do: {application.jobOffer.wagesTo}
											</Badge>
										</Card.Text>
										<Card.Text>
											<Badge bg='primary'>Oczekiwane zarobki: {application.expectedWages}</Badge>
										</Card.Text>
										{application.end ? (
											<Alert variant='secondary'>Rekrutacja zakończona</Alert>
										) : application.dateOfInterview ? (
											<Alert variant='info'>Termin rozmowy rekrutacyjnej: {application.dateOfInterview}</Alert>
										) : (
											<Alert variant='light'>Termin rozmowy nie został jeszcze ustalony</Alert>
										)}
									</Card.Body>
									<Card.Footer className='text-muted'>
										<div>Data aplikacji: {format(new Date(application.applicationDate), 'd MMMM yyyy, HH:mm')}</div>
										<div>{`Rekruter: ${application.jobOffer.user.firstName} ${application.jobOffer.user.lastName}`}</div>
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

export default UserApplications;
