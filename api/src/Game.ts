
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
		console.log(path)
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
		// console.table(this.topranked)
		return
	}
	/**
	 * 
	 * @param playername : player name that want to record his store in the list
	 * @param level : the level he want to record
	 * @process : fetch the top ranked list from the file and verify if the player exits
	 * 	- yes : update his level
	 * 	- no  : create new entry with his name and level
	 * sort the list by the level in DESCENT order
	 * shrink the list to keep just top 6 players
	 * save list again to file as raw text 
	 * @returns void
	 */
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
	/**	
	 * subscribe all the events for the connected player
	 * @returns void
	 */
	INIT_LISTERNERS() {

		this.io.on("connection", function (socket: any) {
			this.events.forEach((event: string) => {
				socket.on(event, (pyld: any) => {
					if (this.players.get(socket.id) || event == "JOIN_ROOM") {
						/**
						 * set this global infos needed by all events in the context
						 * such as :
						 * 		username : current player name if exits
						 * 		roomname : current room of the player if exits
						 * 		rommAdmin: {true||false} if the current player is the owner of his current joined room
						 */
						const username = this.players.get(socket.id)?.name
						const roomname = this.players.get(socket.id)?.room
						const roomAdmin = this.rooms.get(roomname)?.admin.name
						
						/**
						 * leave the current player in the context from the room he is in
						 * @returns void
						 */
						const ft_player_left = () => {
							if (username && roomname) {
								socket.leave(roomname)
								this.rooms.get(roomname)?.QUIT(socket.id)
								if (this.rooms.get(roomname)?.players.length == 0)
									this.rooms.delete(roomname)
							}
							this.players.delete(socket.id)
							return
							// socket.leave(roomname)
						}
						/**
						 * start the current joined room of the player fired this event
						 * @returns void
						 */
						const ft_start_game = () => {
							if (roomname) {
								this.rooms.get(roomname).START()
							}
							return 
						}

						switch (event) {
							/**
							 * JOIN_ROOM : event called to join a given room by name 
							 * 1 - join the room by socket only as initial step
							 * 2 - check if room exits :
							 * 		a - yes : keep going to '3' step
							 * 		b - no  : create new room instance with that name then move on the '3' step
							 * try {
							 * 3 : join player room and protect against multiple event fire
							 * 4 : add player instance to the list of players in the live server
							 * 5 : emit the JOIN_ROOM event back to the player to inform him with the success join /or create room
							 * } catch {
							 * 6 : emit JOIN_ROOM event back to player with Error message
							 * 7 : leave the player from the socket room which was done in step 1
							 * }
							 */
							case 'JOIN_ROOM':
								const player = new PLAYER(socket.id, pyld.playerName)
								/**
								 * join the current user socket id to the room requested by him
								 *  just as initial step and then later it will remove him if something not valid
								 */
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

									// check if player is not the admin
									// this check is solve an issue for multiple event fire when creating a room
									// that cause the player to join/create roon multiple time
									// Update : this issue of duplicated events is solved, but u can keep 
									// 			this condition just in case
									if (this.rooms.get(pyld.room).admin.id !== player.id)
										this.rooms.get(pyld.room).JOIN(player)
									this.ADD_PLAYER(player)

									socket.emit("JOIN_ROOM", { name: pyld.playerName, room: pyld.room })

								} catch (error) {
									socket.emit("ERROR", { title: "JOIN ROOM ERROR", message: error })
									socket.leave(pyld.room)
								}

								break
							
							/**
							 * START_GAME : event fired by the room owner to start the game that will 
							 * 				change the room/player state to live/ongoing game
							 */
							case 'START_GAME':
								ft_start_game()
								break
							/**
							 * PLAYER_STAGE :	event called periodically from the user end to update 
							 * 					his stage and broadcase it to all his opponents
							 */
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
							/**
							 * CHAT_MSG :	event called to send msg to current players in room
							 * 				joined by the player who sent the msg
							 */
							case 'CHAT_MSG':
								if (username && roomname) {
									if (pyld.msg && typeof pyld.msg === "string" && pyld.msg.trim().length <= 100 && pyld.msg.trim().length > 0)
										socket.broadcast.to(roomname).emit('CHAT_MSG', { from: username, msg: pyld.msg });
									else {
										console.log("WRONG MSG FROM ", username)
										console.log(pyld.msg)
									}
								}
							/**
							 * PLAYER_LOST : set player instance to loose == true
							 */
							case 'PLAYER_LOST':
								this.players.get(socket.id).LOOSE()
								break

							/**
							 * PLAYER_LEFT : player left the room
							 */
							case 'PLAYER_LEFT':
								ft_player_left()

							/**
							 * disconnect : player disconnected completly from the client , 
							 * 				so fire the player_left method also
							 */
							case 'disconnect':
								ft_player_left()
								break

							/**
							 * TETROS_PLEASE :	event called when the number of tetros in client store is getting low
							 * 					so we distribute a new X random tetros to him and all the players in same room
							 * 					so they keep having same pieces simultaneously and with same Order
							 */
							case 'TETROS_PLEASE':
								this.io.in(roomname).emit('HAK_TETROS', tetrosInst.getRandomTetros(10));
								break

							/**
							 * UPDATE_GAME_MODE : only called by the room owner to update the game mode state {locked,open}
							 */
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
							/**
							 * UPDATE_ROOM_SIZE : only called by the room owner to update the game size state {mac number of players to join}
							 */
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
							/**
							 * in case of an event not handled here, lets just print its name until the boss comes in
							 */
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
	/**
	 * create new room instance if not exists
	 * @param {ROOM} room
	 * @returns 
	 */
	ADD_ROOM(room: ROOM) {
		this.rooms.set(room.title, room)
		return
	}
	/**
	 * add new player instance if not exits
	 * @param {PLAYER} player 
	 * @returns 
	 */
	ADD_PLAYER(player: PLAYER) {
		this.players.set(player.id, player)
		return
	}
}
