

import Home from './pages/home'
import Lobby from './pages/lobby'
import Error from './component/Error';
import {
	getPlayerNickname,
	getPlayerInGame
} from './reducers/player.reducer';
import PlayBoard from "./pages/playboard";
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { getError } from './reducers/error.reducer';
import { SET_ERROR } from './actions';
import { socket } from "./app/hooks"
import { useEffect } from 'react';


const HashParser = (window_hash: string) => {
	const regexp = /(?<roomname>[a-zA-Z0-9]{1,10})\[(?<username>[a-zA-Z0-9]{1,10})\]/;
	const result = window_hash.match(regexp);
	if (result)
		return result;
	return false;
};
const namevalidtor = (u: string, r: string) => {
	if (typeof u == "string" && typeof r == "string" && u.length <= 10 && r.length <= 10)
		return true
	return false
}
function App() {
	console.log("_APP")
	const dispatch = useAppDispatch()
	const playerNickname = useAppSelector(getPlayerNickname)
	const playerIngame = useAppSelector(getPlayerInGame)

	const error = useAppSelector(getError)
	const checkHash = HashParser(window.location.hash.substring(1))
	useEffect(() => {
		if (window.location.hash.substring(1)) {
			if (checkHash && checkHash.groups) {
				const { roomname, username } = checkHash.groups
				if (namevalidtor(username, roomname)) {
					console.log("hna 1")
					if (playerNickname && playerIngame === false) {
						console.log("hna 2")
						if (username !== playerNickname) {
							console.log("hna 3")
							dispatch(SET_ERROR({ title: "Error :", message: "there is an username already set to this browser, try to leave first to register new account" }))
						} else {
							console.log("hna join room")
							socket.emit('JOIN_ROOM', { room: checkHash.groups.roomname, playerName: checkHash.groups.username });
						}
					} else {
						socket.emit('JOIN_ROOM', { room: checkHash.groups.roomname, playerName: checkHash.groups.username });
					}
				} else {
					console.log("hna 4")
					dispatch(SET_ERROR({ title: "hash_query_error", message: "" }))
				}

			} else {
				console.log("hna 5")

				dispatch(SET_ERROR({ title: "hash_query_error", message: "" }))
			}
		}


	}, [])

	return (
		<div>
			{error.title ?
				(<Error title={error.title} message={error.message} />)
				: (!playerNickname ?
					(<Home />)
					: (playerIngame ?
						(<PlayBoard />)
						: (<Lobby />)))}

		</div>

	)
		;
}

export default App;
