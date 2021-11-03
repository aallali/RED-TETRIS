
import * as express from "express";
import * as cors from "cors"

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
	public io: any
	private port: number = 4242
	private players: object = {}
	private rooms: object = {}
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
	}

	private routes() {
		this.app.get("/", (req: any, res: any) => {
			res.send("HELLO MFK!!")
		});
	}

	private initSocketEvents() {

		this.io.on("connection", function (socket: any) {

			this.io.emit("connection", { type: "connection", id: socket.id })

			socket.on("disconnect", function (pyld: any) {
				console.log('Scoket id : ' + socket.id)
				if (this.players[socket.id]) {
					const hisRoom = this.players[socket.id].currentRoom
					const hisName = this.players[socket.id].name
					// console.log("=======>")
					// console.log(this.rooms[hisRoom].players)
					// console.log(hisName, this.rooms[hisRoom].players.indexOf(hisName))
					this.rooms[hisRoom].players.splice(this.rooms[hisRoom].players.indexOf(hisName), 1)

					delete (this.players[socket.id])
				}

				this.io.emit("unsubscribe", { type: "unsubscribe", id: socket.id })
			}.bind(this));

			socket.on("join", function (pyld: any) {
				console.log(this.rooms)
				console.log(this.players)
				console.log(pyld)
				console.log("=====================================")
				const { playerName, room } = pyld
				if (this.rooms[room] != null && this.rooms[room].players.length >= 1) {
					
					this.io.to(socket.id).emit('join', {status:false, msg: "Sorry, room is full !"});
				
				}
				else {
					this.players[socket.id] = { name: playerName, currentRoom: room }
					this.rooms[room] = this.rooms[room] || {}
					this.rooms[room].players = this.rooms[room].players || []
					this.rooms[room].players.push(playerName)
					this.rooms[room].players = [...new Set(this.rooms[room].players)]
					
					this.io.to(socket.id).emit('join', {status:true, msg: "You can Join"});
				
				}
				console.log(this.rooms)
				console.log(this.players)

				
				console.log("***************************************")
			}.bind(this))
		}.bind(this));

	}

	public listen() {
		console.clear()
		this.http.listen(this.port, () =>
			console.log(`🚀 Server is running on PORT ${this.port}`)
		);
	}
}

export default new App();
