import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TETROMINOS } from "../helpers/tetrominos"

type TypeGameMode = "multiplayer" | "solo"
interface IGame {
	title: string
	started: boolean
	inGame: boolean
	winner: string | undefined
	tetros: (keyof typeof TETROMINOS)[]
	mode: TypeGameMode
	gameOver: boolean
}
const initialState: IGame = {
	title: "",
	started: false,
	inGame: false,
	winner: undefined,
	tetros: [],
	mode: "multiplayer",
	gameOver: false
};

export const gameSlice = createSlice({
	name: 'Game',
	initialState,
	reducers: {
		SET_GAME_STARTED(state) {
			state.tetros = []
			state.started = true
			state.gameOver = false
			state.winner = undefined
		},
		SET_GAME_TITLE(state, action: PayloadAction<string>) {
			state.title = action.payload
		},
		SET_IN_GAME(state) {
			state.inGame = true
		},
		SET_GAME_OVER(state) {
			state.gameOver = true
			state.started = false
		},
		SET_WINNER(state, action: PayloadAction<string>) {
			state.winner = action.payload
		},
		RESET_GAME(state) {
			state.started = false
			state.inGame = false
			state.winner = undefined
			state.tetros = []
			state.mode = "multiplayer"
			state.gameOver = false
		},
		SET_GAME_MODE(state, action: PayloadAction<TypeGameMode>) {
			state.mode = action.payload
		},
		SHIFT_TETRO: (state) => {
			let clone = [...state.tetros]
			clone.shift()
			state.tetros = clone
		},
		MORE_TETROS(state, action: PayloadAction<(keyof typeof TETROMINOS)[]>) {
			state.tetros = [...state.tetros, ...action.payload]
		}
	}
});

export const {
	SHIFT_TETRO, MORE_TETROS,
	SET_GAME_MODE, SET_GAME_OVER,
	SET_GAME_STARTED, SET_IN_GAME,
	SET_WINNER, RESET_GAME
} = gameSlice.actions;
export const isGameStarted = (state: RootState) => state.game.started;
export const isGameOver = (state: RootState) => state.game.gameOver
export const getWinner = (state: RootState) => state.game.winner
export const getGameWinner = (state: RootState) => state.game.winner
export const getTetros = (state: RootState) => state.game.tetros
export default gameSlice.reducer;
