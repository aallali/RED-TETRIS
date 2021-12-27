
import * as express from "express";
import * as cors from "cors"
import { Socket } from "socket.io";
import Game from "./Game"

// const log = console.log

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
		this.gameIns = new Game(this.io)
	}
	/**
	 * initiat the routes of our backend app
	 */
	private routes() {
		/**
		 * get list of all players inst.
		 */
		this.app.get("/", (req: any, res: any) => {
			res.send(Array.from(this.gameIns.players))
		});

		/**
		 * get list of all rooms available (non started) in the server
		 */
		this.app.get("/rooms", (req: any, res: any) => {
			res.send(this.gameIns.GET_ROOMS())
		});

		/**
		 * get list of top 6 players [name,level] ... (stringified mode, needs to be parsed in the front)
		 */
		this.app.get("/top", (req: any, res: any) => {
			res.send(this.gameIns.topranked.map(l => l.join(",")).join("\n"))
		});
	}

	public listen() {
		console.clear()
		this.http.listen(this.port, () =>
			console.log(`🚀 Server is running on PORT ${this.port}`)
		);
	}
}

export default new App();
