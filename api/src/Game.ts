
import PLAYER from "./Player"
import ROOM from "./Room"
import { Socket } from "socket.io"
const fs = require("fs")
import { IPlayer, ROOM_MODE } from "./types"
import Pieces from "./Pieces"
const tetrosInst = new Pieces(undefined)
export default class Game {
	public rooms = new Map()
	public players = new Map()
	public io: Socket
	public topranked: [string, number][]
	public events: string[] = [
		'JOIN_ROOM', 'LEAVE_ROOM',
		'START_GAME', 'GET_TETROS',
		'disconnect', 'PLAYER_STAGE',
		'PLAYER_LOST', 'PLAYER_LEFT',
		'TETROS_PLEASE', 'UPDATE_GAME_MODE',
		'CHAT_MSG',
		'UPDATE_ROOM_SIZE'
	]
	constructor(io: Socket) {
		this.io = io
		this.INIT_LISTERNERS()
		this.FETCH_TOP_RANKED_FILE("data/top_players.txt")
		// this.ADD_TOP_RANKED("lamiae", 60)
		// this.ADD_TOP_RANKED("allali", 50)
		// this.FETCH_TOP_RANKED_FILE("data/top_players.txt")

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
	FETCH_TOP_RANKED_FILE(path: string) {
		const raw = fs.readFileSync(path, 'utf8');
		let data = raw.split("\n").map((l: string) => l.trim()).filter((l: string) => l)
		data = data.map((l: any) => {
			l = l.split(",")
			l[1] = parseInt(l[1])
			return l
		})
		data.sort((b: [string, number], a: [string, number]) => a[1] - b[1])
		data = data.splice(0, 6)
		this.topranked = data
		console.table(this.topranked)

		return
	}
	ADD_TOP_RANKED(playername: string, level: number) {
		const saveTopRankedToFile = () => {
			const rawTxT = this.topranked.map(l => l.join(",")).join("\n")
			fs.writeFile("data/top_players.txt", rawTxT, function (err: any) {
				if (err) return console.log(err);
				// this.FETCH_TOP_RANKED_FILE("data/top_players.txt")
			});
		}
		let isNew = true
		let changed = false
		for (let i = 0; i < this.topranked.length; i++) {
			const el = this.topranked[i]
			if (playername === el[0]) {
				if (level > el[1]) {// el[1] : represent the level in this.topranked array
					el[1] = level
					changed = true
				}
				isNew = false
			}

		}
		if (isNew === true) {
			this.topranked.push([playername, level])
			changed = true
		}

		this.topranked.sort((b: [string, number], a: [string, number]) => a[1] - b[1])
		this.topranked = this.topranked.splice(0, 6)

		if (changed)
			saveTopRankedToFile()


		return
	}
	INIT_LISTERNERS() {

		this.io.on("connection", function (socket: any) {
			this.events.forEach((event: string) => {
				socket.on(event, (pyld: any) => {
					if (this.players.get(socket.id) || event == "JOIN_ROOM") {
						const username = this.players.get(socket.id)?.name
						const roomname = this.players.get(socket.id)?.room
						const roomAdmin = this.rooms.get(roomname)?.admin.name


						/**
						 *
						 */
						const ft_player_left = () => {
							if (username && roomname) {
								socket.leave(roomname)
								this.rooms.get(roomname)?.QUIT(socket.id)
								if (this.rooms.get(roomname)?.players.length == 0)
									this.rooms.delete(roomname)
							}
							this.players.delete(socket.id)
							// socket.leave(roomname)
						}
						/**
						 *
						 * @param None
						 */
						const ft_start_game = () => {
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

								} catch (error) {
									socket.emit("ERROR", { title: "JOIN ROOM ERROR", message: error })
									socket.leave(pyld.room)
								}

								break

							case 'START_GAME':
								ft_start_game()

								break

							case 'PLAYER_STAGE':
								if (this.players.get(socket.id)?.level && this.players.get(socket.id)?.level < pyld.level) {

									this.ADD_TOP_RANKED(username, pyld.level)
								}

								const new_pyld = this.players.get(socket.id).NEW_SCORE(pyld.score, pyld.level, pyld.rows, pyld.stage)
								if (new_pyld.new_roows > 0) {
									socket.broadcast.to(roomname).emit('ADD_ROW', new_pyld.new_roows);
								}
								this.rooms.get(roomname).REFRESH_ROOM()

								break
							case 'CHAT_MSG':
								if (username && roomname) {
									if (pyld.msg && typeof pyld.msg === "string" && pyld.msg.trim().length <= 100 && pyld.msg.trim().length > 0)
										socket.broadcast.to(roomname).emit('CHAT_MSG', { from: username, msg: pyld.msg });
									else {
										console.log("WRONG MSG FROM ", username)
										console.log(pyld.msg)
									}
								}
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
								if (username
									&& roomname
									&& roomAdmin
									&& (pyld === "solo" || pyld === "multiplayer")) {

									if (roomAdmin === username) {
										this.rooms.get(roomname).MODE(pyld)
									}
								}
								break
							case 'UPDATE_ROOM_SIZE':
								if (username
									&& roomname
									&& roomAdmin
									&& (typeof pyld === "number" && pyld > 0 && pyld <= 10)) {
									if (roomAdmin === username) {
										this.rooms.get(roomname).SIZE(pyld)
									}
								}
								break
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
