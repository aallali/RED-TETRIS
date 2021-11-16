
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
		this.admin = admin
		this.players = []
		this.JOIN(admin)
	}
	emit(event: string, pyld: any) {
		this.io.in(this.title).emit(event, pyld)
	}
	START() {
		this.started = true
		this.winner = null
		// this.REFRESH_ROOM()
		this.emit("GAME_START", true)
		// this.io.in(this.title).emit("START_GAME", { start: true })
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
		// if (this.mode === ROOM_MODE.SOLO && this.players.length > 0)
		// 	throw "Game is solo"
		if (this.started === true)
			throw "Game Already Started"
		if (this.players.length >= this.size)
			throw "ROOM IS FULL"
		if (this.players.filter(p => p.name == player_instance.name).length > 0)
			throw 'Name already exists'

		player_instance.room = this.title
		this.players.push(player_instance)
		console.log(`[ ${player_instance.name} ] has joined the room [${this.title}] ${this.players.length == 1 ? 'as Admin' : ''}`)
		if (this.players.length == 1)
			this.admin = player_instance
		this.REFRESH_ROOM()
		return player_instance
	}
	QUIT(player_id: string) {
		console.log(`[QUIT] : (${this.players.filter(p => p.id === player_id)[0]?.name}) left the room (${this.title})`)
		this.players = this.players.filter(p => p.id !== player_id)
		this.admin = this.players[0]
		this.REFRESH_ROOM()
		return
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
		if (this.started === true)
			if (this.players.length > 1 && this.players.filter(p => p.lost === false).length == 1 || this.players.length == 1) {
				this.winner = this.players.filter(p => p.lost === false)[0]
				this.started = false
			}
		this.emit("ROOM_INFOS", this.INFO())
		return this.INFO()
	}
}