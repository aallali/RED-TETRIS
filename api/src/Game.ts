
import PLAYER from "./Player"
import ROOM from "./Room"
import { Socket } from "socket.io"
import { IPlayer, ROOM_MODE } from "./types"

export default class Game {
	public rooms = new Map()
	public players = new Map()
	public io: Socket
	public events: string[] = ['JOIN_ROOM', 'LEAVE_ROOM', 'START_GAME', 'GET_TETROS', 'disconnect']
	constructor(io: Socket) {
		this.io = io
		this.INIT_LISTERNERS()
	}

	INIT_LISTERNERS() {
		this.io.on("connection", function (socket: any) {
			// // console.log(socket.id)
			this.events.forEach((event: string) => {
				socket.on(event, (pyld: any) => {
					// console.log(event)
					// console.log("ROOMS :: ")
					// console.log(this.rooms.keys())
					switch (event) {
						case 'JOIN_ROOM':
							// // console.log(`Event [JOIN_ROOM] fired`)
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
								// console.log("=>" + Array.from(this.players).map((l: IPlayer) => l.name))
								
								// console.log(this.io.sockets.adapter.rooms)
							} catch (error) {
								console.log(error)
								// // console.log(error,this.rooms.get(pyld.room).players.map(p => p.name))
								socket.emit("ROOM_ERROR", error)
								socket.leave(pyld.room)
							}

							break
						case 'START_GAME':
							// // console.log(`Event [START_GAME] fired`)
							break
						case 'disconnect':
							// console.log(Array.from(this.players).map((l: IPlayer) => l.name))
							if (this.players.get(socket.id) && this.players.get(socket.id).room) {
								const playerRoom = this.players.get(socket.id).room
								// console.log("PLAYER DISCONNECTED ::" + this.players.get(socket.id).name)
 								
								this.rooms.get(playerRoom).QUIT(socket.id)

								if (this.rooms.get(playerRoom).players.length == 0)
									this.rooms.delete(playerRoom)
							}
							this.players.delete(socket.id)
							break
						default:
							// console.log(`Event [DEFAULT:${event}] fired`)
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