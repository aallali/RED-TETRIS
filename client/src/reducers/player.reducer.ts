import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { socket } from "../app/hooks"
import { IStage, IScore, IPlayerState } from "../types"


const initialState: IPlayerState = {
	nickname: localStorage.getItem("nickname") || "",
	rows: 0,
	level: parseInt(localStorage.getItem("highestLevel") || "0"),
	score: 0,
	lost: false,
	isAdmin: false,
	rows2add: 0,
	highestLevel: parseInt(localStorage.getItem("highestLevel") || "0"),
	stage: []
};

export const playerSlice = createSlice({
	name: 'Player',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		SET_PLAYER: (state, action: PayloadAction<{ name: string }>) => {
			if (state.nickname !== action.payload.name) {
				state.nickname = action.payload.name
				localStorage.setItem("nickname", state.nickname)
				localStorage.setItem("highestLevel", "1")
			}

		},
		PLAYER_LOST(state) {
			// state.gameStarted = false
			socket.emit("PLAYER_LOST", "this asshole lost")
			state.lost = true
		},
		SET_GAME: (state, action: PayloadAction<{ room: string }>) => {
			state.rows = 0
			state.level = 0
			state.score = 0
		},
		RESET_STATES(state) {
			state.rows = 0
			state.level = 0
			state.score = 0
			state.lost = false
			state.rows2add = 0
		},
		LOGOUT_PLAYER: (state) => {
			localStorage.removeItem("nickname")
			localStorage.removeItem("highestLevel")
			state.nickname = ""
			state.rows = 0
			state.level = 0
			state.score = 0
			state.isAdmin = false
			state.highestLevel = 0
			state.rows2add = 0
			socket.emit("PLAYER_LEFT")
		},
		UNSET_PLAYER_ADMIN(state) {
			if (state.isAdmin) {
				state.isAdmin = false
			}
		},
		SET_PLAYER_ADMIN(state) {
			if (!state.isAdmin) {
				state.isAdmin = true
			}
		},
		ADD_ROW(state, action: PayloadAction<number>) {
			state.rows2add = state.rows2add + action.payload
		},
		UPDATE_SCORE: (state, action: PayloadAction<IScore>) => {
			state.rows = action.payload.rows
			state.level = action.payload.level
			state.score = action.payload.score

			socket.emit("PLAYER_STAGE", {
				score: state.score,
				rows: state.rows,
				level: state.level,
				stage: action.payload.stage
			})
			if (state.level > state.highestLevel) {
				state.highestLevel = state.level
				localStorage.setItem("highestLevel", state.highestLevel.toString())
			}

		},
		BROADCAST_SCORE: (state, action: PayloadAction<IStage>) => {
			socket.emit("PLAYER_STAGE", {
				score: state.score,
				rows: state.rows,
				level: state.level,
				stage: action.payload
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
	RESET_STATES,
	BROADCAST_SCORE,
	UNSET_PLAYER_ADMIN
} = playerSlice.actions;

export const getPlayer = (state: RootState) => state.player;
export const getPlayerNickname = (state: RootState) => state.player.nickname;
export const getRows2Add = (state: RootState) => state.player.rows2add;
export const getPlayerScore = (state: RootState) => ({ level: state.player.level, rows: state.player.rows, score: state.player.score });
export const isLost = (state: RootState) => state.player.lost
export const isAdmin = (state: RootState) => state.player.isAdmin

export default playerSlice.reducer;
