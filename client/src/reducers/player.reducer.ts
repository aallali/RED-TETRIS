import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { socket } from "../app/hooks"
export interface IScore {
	rows: number
	level: number
	score: number
	stage: any
}
export interface IPlayer extends IScore {
	nickname: string
	inGame: boolean
	inRoom?: string
	isAdmin: boolean
	highestLevel: number
	gameStarted: boolean
	gameOver: boolean,
	rows2add: number
	lost: boolean
}

const initialState: IPlayer = {
	nickname: localStorage.getItem("nickname") || "",
	rows: 0,
	level: 1,
	score: 0,
	inGame: false,
	lost: false,
	isAdmin: false,
	gameStarted: false,
	gameOver: false,
	rows2add: 0,
	stage: [],
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
		PLAYER_LOST(state) {
			// state.gameStarted = false
			state.gameOver = true
			state.lost = true
		},
		SET_GAME: (state, action: PayloadAction<{ room: string }>) => {
			state.inRoom = action.payload.room
			state.rows = 0
			state.level = 0
			state.score = 0
			state.inGame = true
			state.gameStarted = false
			state.gameOver = false
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
			state.rows2add = 0
			state.stage = []
			state.gameStarted = false
			state.gameOver = false
			socket.emit("PLAYER_LEFT")
		},
		START_GAME(state) {
			state.gameStarted = true
			state.gameOver = false
		},
		SET_PLAYER_ADMIN(state) {
			state.isAdmin = true
		},
		ADD_ROW(state, action: PayloadAction<number>) {
			state.rows2add = state.rows2add + action.payload
		},
		SET_STAGE(state, action: PayloadAction<any>) {
			state.stage = action.payload
		},
		UPDATE_SCORE: (state, action: PayloadAction<IScore>) => {
			state.rows = action.payload.rows
			state.level = action.payload.level
			state.score = action.payload.score
			if (state.level > state.highestLevel) {
				state.highestLevel = state.level
				localStorage.setItem("highestLevel", state.highestLevel.toString())
			}
			socket.emit("PLAYER_STAGE", {
				score: state.score,
				rows: state.rows,
				level: state.level,
				stage: action.payload.stage
			})

		}

	}
});

export const {
	SET_PLAYER,
	SET_GAME,
	LOGOUT_PLAYER,
	UPDATE_SCORE,
	SET_PLAYER_ADMIN,
	START_GAME,
	ADD_ROW,
	PLAYER_LOST
} = playerSlice.actions;
export const getPlayer = (state: RootState) => state.player;
export const getPlayerNickname = (state: RootState) => state.player.nickname;
export const getPlayerInGame = (state: RootState) => state.player.inGame;
export const getRows2Add = (state: RootState) => state.player.rows2add;
export const isLost = (state: RootState) => state.player.lost
export const isAdmin = (state: RootState) => state.player.isAdmin
export const isGameStarted = (state: RootState) => state.player.gameStarted
export const isGameOver = (state: RootState) => state.player.gameOver
export const getPlayerScore = (state: RootState) => ({ level: state.player.level, rows: state.player.rows, score: state.player.score });
export default playerSlice.reducer;
