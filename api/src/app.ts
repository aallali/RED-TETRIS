
import * as express from "express";
import * as cors from "cors"
import { Socket } from "socket.io";
import Game from "./Game"

import ROOM from "./Room"
import PLAYER from "./Player"
import { ROOM_MODE } from "./types"


const log = console.log
interface IPlayer {
	id: string;
	nickname: string;
}
interface IRoom {
	id: string;
	name: string;
	players: []
	admin: IPlayer
}
class App {

	public app: express.Application;
	public http: any
	public io: Socket
	private port: number = 4242
	private gameIns: Game
	constructor() {
		this.app = express();
		this.app.use(
			cors({
				origin: "*",
				credentials: true,
			})
		);
		this.http = require("http").Server(this.app);
		this.io = require("socket.io")(this.http, {
			pingInterval: 60000,
			cors: {
				origin: "*",
			},
		});
		this.routes()
		this.initSocketEvents()
		this.gameIns = new Game(this.io)

	}
	/**
	 * 
	 */
	private routes() {
		this.app.get("/", (req: any, res: any) => {
			console.log(Array.from(this.gameIns.players))
			res.send(Array.from(this.gameIns.players))
		});
	}
	private initSocketEvents() {
	}
	public listen() {
		console.clear()
		this.http.listen(this.port, () =>
			console.log(`🚀 Server is running on PORT ${this.port}`)
		);
	}
}

export default new App();
