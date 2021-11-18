import {
	SET_PLAYER, SET_GAME,
	LOGOUT_PLAYER, UPDATE_SCORE,
	SET_PLAYER_ADMIN,
	ADD_ROW, PLAYER_LOST, RESET_STATES
} from "../reducers/player.reducer";
import { UPDATE_PLAYERS } from "../reducers/opponent.reducer"
import { SET_ERROR, CLEAR_ERROR } from "../reducers/error.reducer"

import {
	SHIFT_TETRO, MORE_TETROS,
	SET_GAME_MODE, SET_GAME_OVER,
	SET_GAME_STARTED, SET_IN_GAME,
	SET_WINNER, RESET_GAME
} from "../reducers/game.reducer"

export {
	// Players actions
	SET_PLAYER, SET_GAME,
	LOGOUT_PLAYER, UPDATE_SCORE,
	SET_PLAYER_ADMIN,
	ADD_ROW, PLAYER_LOST,
	RESET_STATES,

	// Opponents actions
	UPDATE_PLAYERS,

	// Error actions
	SET_ERROR, CLEAR_ERROR,

	// game actions
	SHIFT_TETRO, MORE_TETROS,
	SET_GAME_MODE, SET_GAME_OVER,
	SET_GAME_STARTED, SET_IN_GAME,
	SET_WINNER, RESET_GAME
}
