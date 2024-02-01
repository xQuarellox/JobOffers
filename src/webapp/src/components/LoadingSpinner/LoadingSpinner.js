import Spinner from 'react-bootstrap/Spinner';
import { Wrapper, Text } from './LoadingSpinner.styles';

const LoadingSpinner = () => (
	<Wrapper>
		<Spinner animation='border' role='status' variant='light' />
		<Text>Proszę czekać</Text>
	</Wrapper>
);

export default LoadingSpinner;
