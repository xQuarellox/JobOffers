import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchApplicationsByOfferId, setInterviewDateTime } from 'appSlice';

const DateModal = ({ show, handleClose, selectedId }) => {
	const getCurrentDateTimeLocal = () => {
		const now = new Date();
		const offset = now.getTimezoneOffset() * 60000;
		const localISOTime = new Date(now - offset).toISOString().slice(0, -1);
		return localISOTime.substring(0, 16);
	};
	const [dateTime, setDateTime] = useState(getCurrentDateTimeLocal());
	const dispatch = useDispatch();
	const { id } = useParams();

	const handleSubmit = async event => {
		event.preventDefault();
		await dispatch(setInterviewDateTime({ id: selectedId, dateTime: dateTime }));
		await dispatch(fetchApplicationsByOfferId(id));
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Wybierz termin</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId='formDate'>
						<Form.Label>Wybierz datę</Form.Label>
						<Form.Control
							type='datetime-local'
							min={getCurrentDateTimeLocal()}
							value={dateTime}
							onChange={e => setDateTime(e.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Anuluj
					</Button>
					<Button variant='primary' type='submit'>
						Zapisz
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default DateModal;
