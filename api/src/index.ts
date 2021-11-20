
// import ROOM from "./Room"
// import PLAYER from "./Player"
// import { ROOM_MODE } from "./types"
// const log = console.log
// const player = new PLAYER("SDG230G34", "player1")
// const player2 = new PLAYER("RTG230G34", "player2")
// const player3 = new PLAYER("ZZZZ0G34", "player3")
// const player4 = new PLAYER("__50bZZ0G35", "player4")
// const room   = new ROOM({title:"arena", mode:ROOM_MODE.MULTIPLAYER, admin:player, size:4})

// 'use-string';
// (async () => {
// 	try {
// 		log("[index.js]")
// 		room.JOIN(player2)
// 		room.JOIN(player3)
// 		room.JOIN(player4)
// 		room.START()
// 		log(room.players.map(l => l.name))

// 		player.NEW_SCORE(0,0,13)
// 		player.NEW_SCORE(0,0,14)
// 		// room.JOIN(player2)
// 		// await player.LOOSE()
// 		// room.REFRESH_ROOM()

// 		// await player2.LOOSE()
// 		// room.REFRESH_ROOM()

// 		// await player3.LOOSE()
// 		// room.REFRESH_ROOM()
// 		room.QUIT(player.id)
// 		room.QUIT(player2.id)
// 		room.QUIT(player3.id)

// 		log(room.players.map(l => l.name))

// 	} catch (error) {
// 		console.log(error)
// 	}
	
// })()




// // socket.on("stage", function (pyld: any) {
// // 	if (this.players[socket.id])
// // 		this.io.emit("stage", { player: this.players[socket.id].name, stage:pyld })
// // }.bind(this))
// // socket.once("disconnect", function (pyld: any) {
// // 	console.log('Scoket id : ' + socket.id)
// // 	if (this.players[socket.id]) {
// // 		const hisRoom = this.players[socket.id].currentRoom
// // 		const hisName = this.players[socket.id].name
// // 		// console.log("=======>")
// // 		// console.log(this.rooms[hisRoom].players)
// // 		// console.log(hisName, this.rooms[hisRoom].players.indexOf(hisName))
// // 		this.rooms[hisRoom].players.splice(this.rooms[hisRoom].players.indexOf(hisName), 1)

// // 		delete (this.players[socket.id])
// // 	}

// // 	this.io.emit("unsubscribe", { type: "unsubscribe", id: socket.id })
// // }.bind(this));

// // socket.once("join", function (pyld: any) {
// // 	console.log(this.rooms)
// // 	console.log(this.players)
// // 	console.log(pyld)
// // 	console.log("=====================================")
// // 	const { playerName, room } = pyld
// // 	if (this.rooms[room] != null && this.rooms[room].players.length >= 20) {

// // 		this.io.to(socket.id).emit('join', { status: false, msg: "Sorry, room is full !" });

// // 	}
// // 	else {
// // 		this.players[socket.id] = { name: playerName, currentRoom: room }
// // 		this.rooms[room] = this.rooms[room] || {}
// // 		this.rooms[room].players = this.rooms[room].players || []
// // 		this.rooms[room].players.push(playerName)
// // 		this.rooms[room].players = [...new Set(this.rooms[room].players)]

// // 		this.io.to(socket.id).emit('join', { status: true, msg: "You can Join" });

// // 	}
// // 	console.log(this.rooms)
// // 	console.log(this.players)


// // 	console.log("***************************************")
// // }.bind(this))