import HomePage from 'components/HomePage/HomePage';
import LoginPage from 'components/LoginPage/LoginPage';
import MainTemplate from 'components/MainTemplate/MainTemplate';
import OfferAddForm from 'components/OfferAddForm/OfferAddForm';
import ProtectedRouteRecruiter from 'components/ProtectedRouteRecruiter/ProtectedRouteRecruiter';
import ProtectedRouteWorker from 'components/ProtectedRouteRecruiter/ProtectedRouteWorker';
import RegistrationPage from 'components/RegistrationPage/RegistrationPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OfferEditForm from 'components/OfferEditForm/OfferEditForm';
import OfferDetails from 'components/OfferDetails/OfferDetails';
import UserApplications from 'components/UserApplications/UserApplications';
import OfferApplications from 'components/OfferApplications/OfferApplications';

const App = () => {
	const { user } = useSelector(state => state.app);
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={
						<MainTemplate>
							<HomePage user={user} />
						</MainTemplate>
					}
				/>
				<Route
					path='/login'
					element={
						<MainTemplate>
							<LoginPage />
						</MainTemplate>
					}
				/>
				<Route
					path='/signup'
					element={
						<MainTemplate>
							<RegistrationPage />
						</MainTemplate>
					}
				/>
				<Route
					path='/offer-add'
					element={
						<ProtectedRouteRecruiter user={user}>
							<MainTemplate>
								<OfferAddForm />
							</MainTemplate>
						</ProtectedRouteRecruiter>
					}
				/>
				<Route
					path='/offer-edit/:id'
					element={
						<ProtectedRouteRecruiter user={user}>
							<MainTemplate>
								<OfferEditForm />
							</MainTemplate>
						</ProtectedRouteRecruiter>
					}
				/>
				<Route
					path='/offer-details/:id'
					element={
						<ProtectedRouteWorker user={user}>
							<MainTemplate>
								<OfferDetails />
							</MainTemplate>
						</ProtectedRouteWorker>
					}
				/>
				<Route
					path='/user-applications/'
					element={
						<ProtectedRouteWorker user={user}>
							<MainTemplate>
								<UserApplications />
							</MainTemplate>
						</ProtectedRouteWorker>
					}
				/>
				<Route
					path='/offer-applications/:id'
					element={
						<ProtectedRouteRecruiter user={user}>
							<MainTemplate>
								<OfferApplications />
							</MainTemplate>
						</ProtectedRouteRecruiter>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
