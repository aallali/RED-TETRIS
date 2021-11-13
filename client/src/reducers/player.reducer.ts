import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
export interface IScore {
	rows: number
	level: number
	score: number
}
export interface IPlayer extends IScore {
	nickname: string
	inGame: boolean
	inRoom?: string
	isAdmin: boolean
	highestLevel: number
	gameStarted: boolean
	socketInitiated: boolean
}

const initialState: IPlayer = {
	nickname: localStorage.getItem("nickname") || "",
	rows: 0,
	level: 1,
	score: 0,
	inGame: false,
	isAdmin: false,
	gameStarted: false,
	socketInitiated: false,
	highestLevel: parseInt(localStorage.getItem("highestLevel") || "1")
};

export const playerSlice = createSlice({
	name: 'Player',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		SET_PLAYER: (state, action: PayloadAction<{ name: string, room?: string }>) => {
			state.nickname = action.payload.name
			if (action.payload.room) {
				state.inRoom = action.payload.room
				state.inGame = true
			}
			console.log(state.nickname)
			localStorage.setItem("nickname", state.nickname)
			localStorage.setItem("highestLevel", "1")

		},
		SET_GAME: (state, action: PayloadAction<{ room: string }>) => {
			state.inRoom = action.payload.room
			state.rows = 0
			state.level = 0
			state.score = 0
			state.inGame = true
		},
		LOGOUT_PLAYER: (state) => {
			localStorage.removeItem("nickname")
			localStorage.removeItem("highestLevel")
			state.nickname = ""
			state.rows = 0
			state.level = 1
			state.score = 0
			state.inGame = false
			state.isAdmin = false
			state.highestLevel = 1
		},
		START_GAME(state) {
			state.gameStarted = !state.gameStarted
		},
		SET_PLAYER_ADMIN(state) {
			state.isAdmin = true
		},
		SOCKET_LOADED(state) {
			state.socketInitiated = true
		},
		UPDATE_SCORE: (state, action: PayloadAction<IScore>) => {
			state.rows = action.payload.rows
			state.level = action.payload.level
			state.score = action.payload.score
			if (state.level > state.highestLevel) {
				state.highestLevel = state.level
				localStorage.setItem("highestLevel", state.highestLevel.toString())
			}
		}

	}
});

export const { SET_PLAYER, SET_GAME, LOGOUT_PLAYER, UPDATE_SCORE, SET_PLAYER_ADMIN, START_GAME, SOCKET_LOADED } = playerSlice.actions;
export const getPlayer = (state: RootState) => state.player;
export const getPlayerNickname = (state: RootState) => state.player.nickname;
export const getPlayerInGame = (state: RootState) => state.player.inGame;
export const getGameStartStatus = (state: RootState) => state.player.gameStarted
export const getPlayerScore = (state: RootState) => ({ level: state.player.level, rows: state.player.rows, score: state.player.score });
export default playerSlice.reducer;
