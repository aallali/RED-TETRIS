
import PLAYER from "./Player"
import ROOM from "./Room"
import { Socket } from "socket.io"
import { IPlayer, ROOM_MODE } from "./types"
import Pieces from "./Pieces"
const tetrosInst = new Pieces(undefined)
export default class Game {
	public rooms = new Map()
	public players = new Map()
	public io: Socket
	public events: string[] = ['JOIN_ROOM', 'LEAVE_ROOM', 'START_GAME', 'GET_TETROS', 'disconnect', 'PLAYER_STAGE', 'PLAYER_LOST', 'PLAYER_LEFT', 'TETROS_PLEASE', 'UPDATE_GAME_MODE']
	constructor(io: Socket) {
		this.io = io
		this.INIT_LISTERNERS()
	}
	GET_ROOMS() {
		const roomsNames = Array.from(this.rooms.keys())
		let rooms = []
		for (let key in roomsNames) {
			const room = this.rooms.get(roomsNames[key])
			if (room && !room.started)
				rooms.push({
					title: room.title,
					size: room.size,
					mode: room.mode,
					started: room.started,
					active_players: room.players.length
				})
		}

		return rooms
	}
	INIT_LISTERNERS() {

		this.io.on("connection", function (socket: any) {
			this.events.forEach((event: string) => {
				socket.on(event, (pyld: any) => {
					if (this.players.get(socket.id) || event == "JOIN_ROOM") {
						const username = this.players.get(socket.id)?.name
						const roomname = this.players.get(socket.id)?.room

						/**
						 *
						 */
						const ft_player_left = () => {
							if (this.players.get(socket.id) && this.players.get(socket.id).room) {
								socket.leave(roomname)
								this.rooms.get(roomname).QUIT(socket.id)
								if (this.rooms.get(roomname).players.length == 0)
									this.rooms.delete(roomname)

							}
							this.players.delete(socket.id)
							// socket.leave(roomname)
						}
						/**
						 *
						 * @param sid
						 */
						const ft_start_game = (sid: string) => {
							if (roomname) {
								this.rooms.get(roomname).START()
							}
						}



						switch (event) {
							case 'JOIN_ROOM':
								const player = new PLAYER(socket.id, pyld.playerName)
								socket.join(pyld.room)
								if (!this.rooms.get(pyld.room)) {
									const room = new ROOM({
										title: pyld.room,
										mode: pyld.mode,
										admin: player,
										size: 5,
										io: this.io
									})
									this.rooms.set(pyld.room, room)
								}
								try {

									if (this.rooms.get(pyld.room).admin.id !== player.id)
										this.rooms.get(pyld.room).JOIN(player)
									this.ADD_PLAYER(player)
									socket.emit("JOIN_ROOM", { name: pyld.playerName, room: pyld.room })

									// console.log(this.io.sockets.adapter.rooms)
								} catch (error) {
									socket.emit("ERROR", { title: "JOIN ROOM ERROR", message: error })
									socket.leave(pyld.room)
								}

								break
							case 'START_GAME':
								ft_start_game(socket.id)

								break
							case 'PLAYER_STAGE':
								const new_pyld = this.players.get(socket.id).NEW_SCORE(pyld.score, pyld.level, pyld.rows, pyld.stage)
								if (new_pyld.new_roows > 0) {
									console.log(username, new_pyld.new_roows, roomname)
									socket.broadcast.to(roomname).emit('ADD_ROW', new_pyld.new_roows);
								}
								this.rooms.get(roomname).REFRESH_ROOM()

								break
							case 'PLAYER_LOST':
								this.players.get(socket.id).LOOSE()
								break
							case 'PLAYER_LEFT':
								ft_player_left()
							case 'disconnect':
								ft_player_left()
								break
							case 'TETROS_PLEASE':
								this.io.in(roomname).emit('HAK_TETROS', tetrosInst.getRandomTetros(10));
								break
							case 'UPDATE_GAME_MODE':
								const roomAdmin = this.rooms.get(roomname)?.admin.name
								if (username
									&& roomname
									&& roomAdmin
									&& (pyld === "solo" || pyld === "multiplayer")) {

									if (roomAdmin === username) {
										this.rooms.get(roomname).MODE(pyld)
										console.log(username, roomname, "CHANGED GAME MODE TO : ", pyld)

									}
								}
							default:
								console.log(`Event [DEFAULT:${event}] fired`)

								break
						}
					}
				})
			})

		}.bind(this));


		return false
	}

	ADD_ROOM(room: ROOM) {
		this.rooms.set(room.title, room)
	}

	ADD_PLAYER(player: PLAYER) {
		this.players.set(player.id, player)
	}
}
