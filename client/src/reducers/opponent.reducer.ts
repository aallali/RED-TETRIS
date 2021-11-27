import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { IOpponents, IOpponent, IOpponentData } from "../types"

const initialState: IOpponents = {
	players: []
};

export const opponentSlice = createSlice({
	name: 'Opponents',
	initialState,
	reducers: {
		UPDATE_PLAYERS: (state, action: PayloadAction<any>) => {
			const players = action.payload.players

			if (players.length > 0)
				state.players = players.map((el: IOpponentData): IOpponent => {
					return ({
						name: el.name,
						stage: el.stage || [],
						lost: el.lost,
						rows: el.rows,
						score: el.score,
						level: el.level,
						admin: action.payload.admin.name === el.name,
					})
				})
			else state.players = []
		},
		CLEAR_OPPONENTS(state) {
			state.players = []
		}
	}
});

export const { UPDATE_PLAYERS, CLEAR_OPPONENTS } = opponentSlice.actions;
export const getOpponents = (state: RootState) => state.opponents.players;

export default opponentSlice.reducer;
