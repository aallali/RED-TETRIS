import {
	SET_PLAYER,
	SET_GAME,
	LOGOUT_PLAYER,
	UPDATE_SCORE,
	SET_PLAYER_ADMIN,
	START_GAME,
	ADD_ROW,
	PLAYER_LOST
} from "../reducers/player.reducer";

import { UPDATE_PLAYERS } from "../reducers/opponent.reducer"
import { SET_ERROR, CLEAR_ERROR } from "../reducers/error.reducer"

export {
	// Players actions
	SET_PLAYER,
	SET_GAME,
	LOGOUT_PLAYER,
	UPDATE_SCORE,
	SET_PLAYER_ADMIN,
	START_GAME,
	ADD_ROW,
	PLAYER_LOST,

	// Opponents actions
	UPDATE_PLAYERS,

	// Error actions
	SET_ERROR,
	CLEAR_ERROR
}
