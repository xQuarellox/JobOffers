import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	user: null,
	token: null,
	loading: false,
	error: null,
	roles: [],
	offers: [],
	offer: null,
	userApplications: [],
	applications: []
};

export const loginRequest = createAsyncThunk('app/loginRequest', async (loginForm, { rejectWithValue }) => {
	try {
		const res = await axios.post('/auth/signin', {
			email: loginForm.email,
			password: loginForm.password
		});
		const loginData = await res.data;
		const token = loginData.token;

		const res2 = await axios.get('/auth/user', { headers: { Authorization: `Bearer ${token}` } });
		const userData = await res2.data;
		return { token: token, user: userData };
	} catch (error) {
		if (error.response) {
			return rejectWithValue(error.response.data);
		}
		return rejectWithValue('Wystąpił nieoczekiwany błąd podczas logowania');
	}
});

export const fetchRoles = createAsyncThunk('app/fetchRoles', async (_, { rejectWithValue }) => {
	try {
		const res = await axios.get('/auth/roles');
		const data = await res.data;
		return data;
	} catch (error) {
		if (error.response) {
			return rejectWithValue(error.response.data);
		}
		return rejectWithValue('Wystąpił nieoczekiwany błąd podczas logowania!');
	}
});

export const signUpRequest = createAsyncThunk('app/signUpRequest', async (signUpForm, { rejectWithValue }) => {
	try {
		await axios.post('/auth/signup', {
			...signUpForm
		});
	} catch (error) {
		if (error.response) {
			return rejectWithValue(error.response.data);
		}
		return rejectWithValue('Wystąpił nieoczekiwany błąd podczas rejestracji!');
	}
});

export const offerAddRequest = createAsyncThunk(
	'app/offerAddRequest',
	async (offerAddForm, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const token = state.app.token;
			await axios.post('/job-offers', { ...offerAddForm }, { headers: { Authorization: `Bearer ${token}` } });
		} catch (error) {
			if (error.response) {
				return rejectWithValue(error.response.data);
			}
			return rejectWithValue('Wystąpił nieoczekiwany błąd podczas dodawania oferty!');
		}
	}
);

export const fetchRecruiterOffers = createAsyncThunk(
	'app/fetchRecruiterOffers',
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const token = state.app.token;
			const res = await axios.get('/job-offers/user', { headers: { Authorization: `Bearer ${token}` } });
			const data = await res.data;
			return data;
		} catch (error) {
			if (error.response) {
				return rejectWithValue(error.response.data);
			}
		}
	}
);

export const fetchAllOffers = createAsyncThunk('app/fetchAllOffers', async (_, { rejectWithValue }) => {
	try {
		const res = await axios.get('/job-offers');
		const data = await res.data;
		return data;
	} catch (error) {
		if (error.response) {
			return rejectWithValue(error.response.data);
		}
	}
});

export const deactiveJobOffer = createAsyncThunk('app/deactiveJobOffer', async (id, { getState, rejectWithValue }) => {
	try {
		const state = getState();
		const token = state.app.token;
		await axios.patch(`/job-offers/${id}`, null, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		if (error.response) {
			return rejectWithValue(error.response.data);
		}
	}
});

export const fetchOfferById = createAsyncThunk('app/fetchOfferById', async (id, { getState, rejectWithValue }) => {
	try {
		const state = getState();
		const token = state.app.token;
		const res = await axios.get(`/job-offers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
		const data = await res.data;
		return data;
	} catch (error) {
		if (error.response) {
			return rejectWithValue(error.response.data);
		}
	}
});

export const offerEditRequest = createAsyncThunk(
	'app/offerEditRequest',
	async (offerEditForm, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const token = state.app.token;
			await axios.put('/job-offers', { ...offerEditForm }, { headers: { Authorization: `Bearer ${token}` } });
		} catch (error) {
			if (error.response) {
				return rejectWithValue(error.response.data);
			}
			return rejectWithValue('Wystąpił nieoczekiwany błąd podczas edycji oferty!');
		}
	}
);

export const applicationAddRequest = createAsyncThunk(
	'app/applicationAddRequest',
	async (applicationAddForm, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const token = state.app.token;
			await axios.post(
				'/job-applications',
				{ ...applicationAddForm },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
		} catch (error) {
			if (error.response) {
				return rejectWithValue(error.response.data);
			}
			return rejectWithValue('Wystąpił nieoczekiwany błąd podczas aplikowania!');
		}
	}
);

export const fetchUserApplications = createAsyncThunk(
	'app/fetchUserApplications',
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const token = state.app.token;
			const res = await axios.get('/job-applications/worker', { headers: { Authorization: `Bearer ${token}` } });
			const data = await res.data;
			return data;
		} catch (error) {
			if (error.response) {
				return rejectWithValue(error.response.data);
			}
		}
	}
);

export const fetchApplicationsByOfferId = createAsyncThunk(
	'app/fetchApplicationsByOfferId',
	async (id, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const token = state.app.token;
			const res = await axios.get(`/job-applications/offer/${id}`, { headers: { Authorization: `Bearer ${token}` } });
			const data = await res.data;
			return data;
		} catch (error) {
			if (error.response) {
				return rejectWithValue(error.response.data);
			}
		}
	}
);

export const endApplicationRequest = createAsyncThunk(
	'app/endApplicationRequest',
	async (id, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const token = state.app.token;
			await axios.patch(`/job-applications/${id}`, null, { headers: { Authorization: `Bearer ${token}` } });
		} catch (error) {
			if (error.response) {
				return rejectWithValue(error.response.data);
			}
		}
	}
);

export const setInterviewDateTime = createAsyncThunk(
	'app/setInterviewDateTime',
	async (formState, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const token = state.app.token;
			await axios.patch(`/job-applications/datetime`, formState, { headers: { Authorization: `Bearer ${token}` } });
		} catch (error) {
			if (error.response) {
				return rejectWithValue(error.response.data);
			}
		}
	}
);

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setLoading(state) {
			state.loading = true;
		},
		logout(state) {
			state.user = null;
			state.token = null;
			state.loading = false;
		},
		setError(state, action) {
			state.error = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(loginRequest.pending, state => {
			state.loading = true;
		});
		builder.addCase(loginRequest.fulfilled, (state, action) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.error = null;
			state.loading = false;
		});
		builder.addCase(loginRequest.rejected, (state, action) => {
			state.loading = false;
			if (action.payload === 'Bad credentials') {
				state.error = 'Nieprawidłowy email lub hasło!';
			} else {
				state.error = action.payload;
			}
		});
		builder.addCase(fetchRoles.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchRoles.fulfilled, (state, action) => {
			state.roles = action.payload;
			state.error = null;
			state.loading = false;
		});
		builder.addCase(fetchRoles.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(signUpRequest.pending, state => {
			state.loading = true;
		});
		builder.addCase(signUpRequest.fulfilled, (state, action) => {
			state.error = null;
			state.loading = false;
		});
		builder.addCase(signUpRequest.rejected, (state, action) => {
			state.loading = false;
			if (typeof action.payload === 'object') {
				let errors = [];
				const keys = Object.keys(action.payload);
				keys.forEach(key => {
					errors.push(`${key}: ${action.payload[key]}`);
				});
				state.error = errors.join('\n');
			} else {
				state.error = action.payload;
			}
		});
		builder.addCase(offerAddRequest.pending, state => {
			state.loading = true;
		});
		builder.addCase(offerAddRequest.fulfilled, (state, action) => {
			state.error = null;
			state.loading = false;
		});
		builder.addCase(offerAddRequest.rejected, (state, action) => {
			state.loading = false;
			if (typeof action.payload === 'object') {
				let errors = [];
				const keys = Object.keys(action.payload);
				keys.forEach(key => {
					errors.push(`${key}: ${action.payload[key]}`);
				});
				state.error = errors.join('\n');
			} else {
				state.error = action.payload;
			}
		});
		builder.addCase(fetchRecruiterOffers.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchRecruiterOffers.fulfilled, (state, action) => {
			state.offers = action.payload;
			state.error = null;
			state.loading = false;
		});
		builder.addCase(fetchRecruiterOffers.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(fetchAllOffers.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchAllOffers.fulfilled, (state, action) => {
			state.offers = action.payload;
			state.error = null;
			state.loading = false;
		});
		builder.addCase(fetchAllOffers.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(deactiveJobOffer.pending, state => {
			state.loading = true;
		});
		builder.addCase(deactiveJobOffer.fulfilled, (state, action) => {
			state.error = null;
			state.loading = false;
		});
		builder.addCase(deactiveJobOffer.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(fetchOfferById.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchOfferById.fulfilled, (state, action) => {
			state.offer = action.payload;
			state.error = null;
			state.loading = false;
		});
		builder.addCase(fetchOfferById.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(offerEditRequest.pending, state => {
			state.loading = true;
		});
		builder.addCase(offerEditRequest.fulfilled, (state, action) => {
			state.error = null;
			state.loading = false;
		});
		builder.addCase(offerEditRequest.rejected, (state, action) => {
			state.loading = false;
			if (typeof action.payload === 'object') {
				let errors = [];
				const keys = Object.keys(action.payload);
				keys.forEach(key => {
					errors.push(`${key}: ${action.payload[key]}`);
				});
				state.error = errors.join('\n');
			} else {
				state.error = action.payload;
			}
		});
		builder.addCase(applicationAddRequest.pending, state => {
			state.loading = true;
		});
		builder.addCase(applicationAddRequest.fulfilled, (state, action) => {
			state.error = null;
			state.loading = false;
		});
		builder.addCase(applicationAddRequest.rejected, (state, action) => {
			state.loading = false;
			if (typeof action.payload === 'object') {
				let errors = [];
				const keys = Object.keys(action.payload);
				keys.forEach(key => {
					errors.push(`${key}: ${action.payload[key]}`);
				});
				state.error = errors.join('\n');
			} else {
				state.error = action.payload;
			}
		});
		builder.addCase(fetchUserApplications.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchUserApplications.fulfilled, (state, action) => {
			state.userApplications = action.payload;
			state.error = null;
			state.loading = false;
		});
		builder.addCase(fetchUserApplications.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(fetchApplicationsByOfferId.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchApplicationsByOfferId.fulfilled, (state, action) => {
			state.applications = action.payload;
			state.error = null;
			state.loading = false;
		});
		builder.addCase(fetchApplicationsByOfferId.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(endApplicationRequest.pending, state => {
			state.loading = true;
		});
		builder.addCase(endApplicationRequest.fulfilled, (state, action) => {
			state.error = null;
			state.loading = false;
		});
		builder.addCase(endApplicationRequest.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(setInterviewDateTime.pending, state => {
			state.loading = true;
		});
		builder.addCase(setInterviewDateTime.fulfilled, (state, action) => {
			state.error = null;
			state.loading = false;
		});
		builder.addCase(setInterviewDateTime.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	}
});
export const { setLoading, logout, setError } = appSlice.actions;
export default appSlice.reducer;
