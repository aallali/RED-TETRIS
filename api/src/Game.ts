
import PLAYER from "./Player"
import ROOM from "./Room"
import { Socket } from "socket.io"
import { IPlayer, ROOM_MODE } from "./types"

export default class Game {
	public rooms = new Map()
	public players = new Map()
	public io: Socket
	public events: string[] = ['JOIN_ROOM', 'LEAVE_ROOM', 'START_GAME', 'GET_TETROS', 'disconnect', 'PLAYER_STAGE', 'PLAYER_LOST']
	constructor(io: Socket) {
		this.io = io
		this.INIT_LISTERNERS()
	}

	INIT_LISTERNERS() {

		this.io.on("connection", function (socket: any) {
			this.events.forEach((event: string) => {
				socket.on(event, (pyld: any) => {
					const ft_player_left = () => {
						if (this.players.get(socket.id) && this.players.get(socket.id).room) {
							const playerRoom = this.players.get(socket.id).room
							this.rooms.get(playerRoom).QUIT(socket.id)
							if (this.rooms.get(playerRoom).players.length == 0)
								this.rooms.delete(playerRoom)

						}
						this.players.delete(socket.id)
						socket.leave(pyld.room)

					}
					const ft_start_game = (sid: string) => {
						const playerRoom = this.players.get(sid).room
						console.log("=========>", playerRoom)
						if (playerRoom) {
							this.rooms.get(playerRoom).START()
						}
					}

					if (this.players.get(socket.id) || event == "JOIN_ROOM")
						switch (event) {
							case 'JOIN_ROOM':
								const player = new PLAYER(socket.id, pyld.playerName)
								socket.join(pyld.room)
								if (!this.rooms.get(pyld.room)) {
									console.log("----CREATED NEW ROOM ----")
									const room = new ROOM({
										title: pyld.room,
										mode: ROOM_MODE.MULTIPLAYER,
										admin: player,
										size: 3,
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
								console.log("------>")
								ft_start_game(socket.id)

								break
							case 'PLAYER_STAGE':
								const new_pyld = this.players.get(socket.id).NEW_SCORE(pyld.score, pyld.level, pyld.rows, pyld.stage)
								const playerRoom = this.players.get(socket.id).room
								if (this.rooms.get(playerRoom)) {
									socket.broadcast.to(playerRoom).emit('ADD_ROW', new_pyld.new_roows);
									this.rooms.get(playerRoom).REFRESH_ROOM()
								}
								break
							case 'PLAYER_LOST':
								this.players.get(socket.id).LOOSE()
								break
							case 'PLAYER_LEFT':
								ft_player_left()
							case 'disconnect':
								ft_player_left()
								break
							default:
								console.log(`Event [DEFAULT:${event}] fired`)
								break
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