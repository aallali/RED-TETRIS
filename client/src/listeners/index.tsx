
import { socket } from "../app/hooks"
import {
	UPDATE_PLAYERS, SET_PLAYER, SET_ERROR, SET_GAME_TITLE,
	SET_PLAYER_ADMIN, ADD_ROW, MORE_TETROS, SET_GAME_STARTED,
	SET_WINNER, SET_GAME_OVER, RESET_STATES, UNSET_PLAYER_ADMIN, CLEAR_OPPONENTS
} from "../app/actions"
import { IError } from "../types"
import { store } from "../app/store"

function SocketListerners() {
	console.log("[SOCKET] listeners loaded ...")
	const dispatch = store.dispatch

	socket.on("ROOM_INFOS", function (pyld: any) {
		const playerName = store.getState().player.nickname
		if (pyld.winner?.name) {
			dispatch(SET_WINNER(pyld.winner.name))
		}
		if (playerName) {
			if (!store.getState().game.started) {
				if (playerName === pyld.admin.name)
					dispatch(SET_PLAYER_ADMIN())
				else
					dispatch(UNSET_PLAYER_ADMIN())
			}
			pyld.players = pyld.players.filter((l: any) => l.name !== playerName)
			dispatch(UPDATE_PLAYERS(pyld))
		}
	})

	socket.on("JOIN_ROOM", function (pyld: { name: string, room: string }) {
		const playerName = localStorage.getItem("nickname")
		if (!playerName)
			dispatch(SET_PLAYER({ name: pyld.name}))

		dispatch(SET_GAME_TITLE(pyld.room))
		dispatch(RESET_STATES())
		// dispatch(SET_GAME({ room: pyld.room }))
	})

	socket.on('ERROR', function (res: IError) {
		dispatch(SET_ERROR(res))
	})
	socket.on('HAK_TETROS', function (pyld: (0 | "I" | "J" | "L" | "O" | "S" | "T" | "Z" | "X")[]) {
		dispatch(MORE_TETROS(pyld))
	})
	socket.on("GAME_OVER", function () {
		dispatch(SET_GAME_OVER())
	})

	socket.on("GAME_START", function () {
		dispatch(CLEAR_OPPONENTS())
		dispatch(RESET_STATES())
		dispatch(SET_GAME_STARTED())
	})

	socket.on("ADD_ROW", function (pyld: number) {
		dispatch(ADD_ROW(pyld))
	})


}

export default SocketListerners

