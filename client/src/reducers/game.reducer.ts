import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TETROMINOS } from "../helpers/tetrominos"


type TypeGameMode = "multiplayer" | "solo"
interface IGame {
	started: boolean
	inGame: boolean
	winner: string | undefined
	tetros: (keyof typeof TETROMINOS)[]
	mode: TypeGameMode
	gameOver: boolean
}
const initialState: IGame = {
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
			state.started = true
		},
		SET_IN_GAME(state) {
			state.inGame = true
		},
		SET_GAME_OVER(state) {
			state.gameOver = true
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
			// console.log(Array.from(state.tetros))
			if (state.tetros.length === 0) {
				console.log("requesting new tetros ..... wait motherfucker >:(")
			}
		},
		MORE_TETROS(state, action: PayloadAction<(keyof typeof TETROMINOS)[]>) {
			state.tetros = [...state.tetros, ...action.payload]
		}
	}
});

export const { SHIFT_TETRO, MORE_TETROS } = gameSlice.actions;
export const isGameStarted = (state: RootState) => state.game;
export const getTetros = (state: RootState) => state.game.tetros
export default gameSlice.reducer;
