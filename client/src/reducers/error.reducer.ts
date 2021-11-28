import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { IError } from '../types';

const initialState: IError = {
	title: "",
	message: "",
}
export const errorSlice = createSlice({
	name: 'ErrorReducer',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		SET_ERROR: (state, action: PayloadAction<IError>) => {
			state.title = action.payload.title
			state.message = action.payload.message
		},
		CLEAR_ERROR: (state) => {
			state.title = ""
			state.message = ""
			state.secondaryMessage = ""
		}
	}
});

export const { SET_ERROR, CLEAR_ERROR } = errorSlice.actions;
export const getError = (state: RootState) => state.error;
export default errorSlice.reducer;
