import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import playerReducer from "../reducers/player.reducer";
import opponentReducer from "../reducers/opponent.reducer"
import errorReducer from "../reducers/error.reducer"
import gameReducer from "../reducers/game.reducer"
export const store = configureStore({
	reducer: {
		player: playerReducer,
		opponents: opponentReducer,
		error: errorReducer,
		game: gameReducer
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
