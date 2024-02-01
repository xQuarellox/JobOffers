import { fetchAllOffers } from 'appSlice';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { Wrapper } from './HomePage.styles';
import { format } from 'date-fns';


const UnloggedHomePage = () => {
	const dispatch = useDispatch();
	const { loading, offers } = useSelector(state => state.app);

	useEffect(() => {
		dispatch(fetchAllOffers());
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
									
									</Card.Body>
									<Card.Footer className='text-muted'>
										<div>{format(new Date(offer.created), 'd MMMM yyyy, HH:mm')}</div>
										<div>{`Dodano przez: ${offer.user.firstName} ${offer.user.lastName}`}</div>
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

export default UnloggedHomePage;
