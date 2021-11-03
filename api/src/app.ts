
import * as express from "express";
import * as cors from "cors"
class App {

	public app: express.Application;
	public http: any
	public io: any
	private port: number = 4242
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
			console.log(socket.id)
			console.log("a user connected");
			this.io.emit("connection", { type: "connection", id: socket.id })
		}.bind(this));
	}

	public listen() {
		this.http.listen(this.port, () =>
			console.log(`🚀 Server is running on PORT ${this.port}`)
		);
	}
}

export default new App();
