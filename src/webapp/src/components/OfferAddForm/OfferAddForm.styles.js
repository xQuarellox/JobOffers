import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
	margin: 0 auto;
	width: 50%;
	background-color: white;
	border: 1px solid black;
	border-radius: 25px;
	padding: 50px;
	margin-top: 100px;
`;

export const Title = styled.h2`
	text-align: center;
	font-size: 42px;
	font-weight: bold;
`;

export const ButtonAndLinkWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledLink = styled(Link)`
	text-align: center;
`;
