import {
	SET_PLAYER,
	SET_GAME,
	LOGOUT_PLAYER,
	UPDATE_SCORE,
	SET_PLAYER_ADMIN,
	START_GAME,
	SOCKET_LOADED
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
	SOCKET_LOADED,

	// Opponents actions
	UPDATE_PLAYERS,

	// Error actions
	SET_ERROR,
	CLEAR_ERROR
}
