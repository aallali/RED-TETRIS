
import { Socket } from "socket.io";
import { ROOM_MODE, IPlayer } from "./types"

export default class ROOM {
	public title: string
	public mode: ROOM_MODE
	public started: boolean
	public players: IPlayer[]
	public admin: IPlayer
	private io?: Socket
	public tetrominos: string[]
	public size: number
	public winner?: IPlayer
	constructor({ title, mode, admin, io, size }: { title: string, mode: ROOM_MODE, admin: IPlayer, io?: Socket, size: number }) {
		this.title = title
		this.mode = mode
		this.players = []

		this.io = io
		this.started = false
		this.size = this.mode == ROOM_MODE.SOLO ? 1 : size || 5
		this.admin = this.JOIN(admin)
		this.players = [this.admin]
		this.emit("ROOM_INFOS", this.INFO())
	}
	emit(event: string, pyld: any) {

		this.io.in(this.title).emit(event, pyld)
	}
	START() {
		this.started = true
		this.winner = null
	}
	INFO() {
		const { winner, title, mode, players, size, admin, started } = this
		return {
			winner: winner,
			title: title,
			mode: mode,
			players: players,
			size: size,
			admin: admin,
			started: started
		}
	}
	JOIN(player_instance: IPlayer) {
		if (this.players.length >= this.size) {
			throw "ROOM IS FULL"
		}
		if (this.players.filter(p => p.name == player_instance.name).length > 0)
			throw 'Name already exists'
		player_instance.room = this.title
		this.players.push(player_instance)
		console.log(`[ ${player_instance.name} ] has joined the room [${this.title}] ${this.players.length == 1 ? 'as Admin' : ''}`)
		// player_instance.socket.join(this.title)
		// TODO: emit new list of player to room
		if (this.players.length !== 1)
			this.emit("ROOM_INFOS", this.INFO())
		return player_instance
	}
	QUIT(player_id: string) {
		// console.log("****=====>")
		// console.log(this.players)
		this.players = this.players.filter(p => p.id !== player_id)
		// console.log("**=====>")
		// console.log(this.players)
		this.admin = this.players[0]
		this.REFRESH_ROOM()
		return
		// TODO: emit room info to   
	}
	DISTRIBUTE_FUCKING_TETROMINOS() {
		this.tetrominos = ['I', 'J', 'L', 'I', 'O', 'S', 'I', 'T', 'Z']  // TODO: replace with random generator function
		// TODO : emit random tetrominos to player
		return this.tetrominos;
	}
	IS_ENDED() {
		if (this.players.length == 0)
			return true
		return false
	}
	REFRESH_ROOM() {
		// // console.log(`ROOM "${this.title}" REFRESHED FROM PLAYER Inst.`)
		if (this.started === true)
			if (this.players.length > 1 && this.players.filter(p => p.lost === false).length == 1 || this.players.length == 1) {
				this.winner = this.players.filter(p => p.lost === false)[0]
				this.started = false
			}


		// // console.log(this.INFO())
		this.emit("ROOM_INFOS", this.INFO())
		return this.INFO()
	}
}