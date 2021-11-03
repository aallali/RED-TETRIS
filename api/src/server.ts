// import * as express from "express";
// import * as socketio from "socket.io";
// import * as path from "path";

// const app = express();
// app.set("port", process.env.PORT || 3000);

// let http = require("http").Server(app);
// // set up socket.io and bind it to our
// // http server.
// let io = require("socket.io")(http, {
// 	pingInterval: 60000,
// 	cors: {
// 	  origin: "*",
// 	},
//   });
//   io.on
// app.get("/", (req: any, res: any) => {
// 	res.send("HELLO MFK!!")
// });

// // whenever a user connects on port 3000 via
// // a websocket, log that a user has connected
// io.on("connection", function (socket: any) {
// 	console.log(socket.id)
// 	console.log("a user connected");
// 	io.emit("connection", {type: "connection", id: socket.id})
// });

// const server = http.listen(4242, function () {
// 	console.log("listening on *:4242");
// });

import app from "./app";

app.listen()