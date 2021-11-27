'use-strict';

import { Socket } from "socket.io";
import { ROOM_MODE, IPlayer } from "./types"

export default class ROOM {

	public title: string
	public tetrominos: string[]
	public started: boolean
	public size: number

	public winner?: IPlayer | null
	public players: IPlayer[]
	public admin: IPlayer
	public mode: ROOM_MODE

	private io?: Socket

	constructor(
		{ title, mode, admin, io, size }
			: { title: string, mode: ROOM_MODE, admin: IPlayer, io?: Socket, size: number }) {

		this.title = title
		this.mode = mode
		this.players = []
		this.io = io
		this.started = false
		this.size = this.mode === ROOM_MODE.SOLO ? 1 : size || 5
		this.admin = admin
		this.players = []
		this.JOIN(admin)
	}

	emit(event: string, pyld: any) {
		this.io.in(this.title).emit(event, pyld)
	}

	MODE(mode?: string) {
		if (mode && (mode === "solo" || mode === "multiplayer")) {
			this.mode = mode === "solo" ? ROOM_MODE.SOLO : ROOM_MODE.MULTIPLAYER
			if (this.mode === ROOM_MODE.MULTIPLAYER)
				this.size = 10
			else
				this.size = this.players.length || 1
			this.emit("ROOM_INFOS", this.INFO())
		}
	}
	SIZE(size: number) {
		if (size > 0 && size <= 10) {
			this.size = size
			this.emit("ROOM_INFOS", this.INFO())
		}

	}
	START() {
		this.players.map(l => {
			l.stage = []
			l.score = 0
			l.level = 0
			l.rows = 0
			l.lost = false
		})
		this.started = true
		this.winner = null
		this.emit("GAME_START", true)
		this.emit("ROOM_INFOS", this.INFO())
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
		if (this.mode === ROOM_MODE.SOLO && this.players.length === 1)
			throw "Game is solo"
		if (this.started === true)
			throw "Game Already Started"
		if (this.players.length >= this.size)
			throw "ROOM IS FULL"
		if (this.players.filter(p => p.name == player_instance.name).length > 0)
			throw 'Name already exists'

		player_instance.room = this.title
		this.players.push(player_instance)
		if (this.players.length == 1)
			this.admin = player_instance
		this.REFRESH_ROOM()
		return player_instance
	}
	QUIT(player_id: string) {
		this.players = this.players.filter(p => p.id !== player_id)
		this.admin = this.players[0]
		this.REFRESH_ROOM()
		return
	}
	IS_ENDED() {
		if (this.players.length == 0)
			return true
		return false
	}
	REFRESH_ROOM() {
		if (this.started === true) {
			if (this.players.length > 1 && this.players.filter(p => p.lost === false).length == 1 && this.mode !== "solo") {
				this.winner = this.players.filter(p => p.lost === false)[0]
				this.started = false
				this.emit("GAME_OVER", null)
			} else if (this.players.length === 1 && this.started === true && this.mode !== "solo") {
				this.started = false
				this.emit("GAME_OVER", null)
			} else if (this.players.length === 1 && this.players.filter(p => p.lost === true).length == 1) {
				this.started = false
				this.emit("GAME_OVER", null)
			}

		}
		this.emit("ROOM_INFOS", this.INFO())
		return this.INFO()
	}
}