
import { socket } from "../app/hooks"
import { UPDATE_PLAYERS, SET_PLAYER, SET_ERROR, SET_GAME, SET_PLAYER_ADMIN, START_GAME, ADD_ROW } from "../actions"
import { IError, IRoom } from "../types"
import { store } from "../app/store"
type ITodo = any

function SocketListerners() {
	console.log("[SOCKET] listeners loaded ...")
	const dispatch = store.dispatch

	socket.on("ROOM_INFOS", function (pyld: any) {
		const playerName = localStorage.getItem("nickname")
		if (playerName) {
			if (playerName === pyld.admin.name)
				dispatch(SET_PLAYER_ADMIN())
			pyld.players = pyld.players.filter((l: any) => l.name !== playerName)
			dispatch(UPDATE_PLAYERS(pyld))
		}
	})

	socket.on("JOIN_ROOM", function (pyld: { name: string, room: string }) {
		const playerName = localStorage.getItem("nickname")
		if (!playerName)
			dispatch(SET_PLAYER({ name: pyld.name, room: pyld.room }))
		dispatch(SET_GAME({ room: pyld.room }))
	})

	socket.on('ERROR', function (res: IError) {
		console.log("[ROOM_ERROR]", res)
		dispatch(SET_ERROR(res))
	})

	socket.on("GAME_START", function (pyld: any) {
		dispatch(START_GAME())
	})

	socket.on("ADD_ROW", function (pyld: number) {
		console.log("ROWS TO ADD : ", pyld)
		dispatch(ADD_ROW(pyld))
		
	})

	socket.on("ROOMS", function (pyld: IRoom[]) {

	})

	socket.on("VALID_NAME", function (pyld: boolean) {

	})


}

export default SocketListerners