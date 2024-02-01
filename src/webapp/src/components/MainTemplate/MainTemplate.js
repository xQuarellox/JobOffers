import Navigation from 'components/Navigation/Navigation';
import { MainWrapper } from './MainTemplate.styles';

const MainTemplate = ({ children }) => {
	return (
		<>
			<MainWrapper>
				<Navigation />
				{children}
			</MainWrapper>
		</>
	);
};

export default MainTemplate;
