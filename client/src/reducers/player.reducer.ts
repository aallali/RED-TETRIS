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
	inRoom?: string
	isAdmin: boolean
	highestLevel: number
	rows2add: number
	lost: boolean
	mode: string
}

const initialState: IPlayer = {
	nickname: localStorage.getItem("nickname") || "",
	rows: 0,
	level: parseInt(localStorage.getItem("highestLevel") || "1"),
	score: 0,
	lost: false,
	isAdmin: false,
	rows2add: 0,
	mode: "multiplayer",
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
			}
			localStorage.setItem("nickname", state.nickname)
			localStorage.setItem("highestLevel", "1")

		},
		PLAYER_LOST(state) {
			// state.gameStarted = false
			state.lost = true
		},
		UPDATE_GAME_MODE(state, action: PayloadAction<string>) {
			console.log("Game mode updating to :: " + action.payload)
			state.mode = action.payload
		},
		SET_GAME: (state, action: PayloadAction<{ room: string }>) => {
			state.inRoom = action.payload.room
			state.rows = 0
			state.level = 0
			state.score = 0
 
		},
		RESET_STATES(state) {
			state.rows = 0
			state.level = 0
			state.score = 0
			state.lost = false

		},
		LOGOUT_PLAYER: (state) => {
			localStorage.removeItem("nickname")
			localStorage.removeItem("highestLevel")
			state.nickname = ""
			state.rows = 0
			state.level = 1
			state.score = 0
			state.isAdmin = false
			state.highestLevel = 1
			state.rows2add = 0
			state.stage = []
			socket.emit("PLAYER_LEFT")
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
	ADD_ROW,
	PLAYER_LOST,
	UPDATE_GAME_MODE,
	RESET_STATES
} = playerSlice.actions;

export const getPlayer = (state: RootState) => state.player;
export const getGameMode = (state: RootState) => state.player.mode
export const getPlayerNickname = (state: RootState) => state.player.nickname;
// export const getPlayerInGame = (state: RootState) => state.player.inGame;
export const getRows2Add = (state: RootState) => state.player.rows2add;
export const getRoomTitle = (state: RootState) => state.player.inRoom;

export const isLost = (state: RootState) => state.player.lost
export const isAdmin = (state: RootState) => state.player.isAdmin
// export const isGameStarted = (state: RootState) => state.player.gameStarted
// export const isGameOver = (state: RootState) => state.player.gameOver
export const getPlayerScore = (state: RootState) => ({ level: state.player.level, rows: state.player.rows, score: state.player.score });
export default playerSlice.reducer;
