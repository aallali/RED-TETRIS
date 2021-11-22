
/* eslint-disable react-hooks/exhaustive-deps */
import Home from './pages/home'
import Lobby from './pages/lobby'
import Error from './component/error';
import {
	getPlayerNickname
} from './reducers/player.reducer';
import PlayBoard from "./pages/playboard";
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { getError } from './reducers/error.reducer';
import { SET_ERROR } from './app/actions';
import { socket } from "./app/hooks"
import { useCallback, useEffect } from 'react';
import { getGameMode, getGameTitle } from './reducers/game.reducer';
import {useSelector} from "react-redux";
import {store} from "./app/store";


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
	const dispatch = useAppDispatch()
	const playerIngame = useAppSelector(getGameTitle)
	const playerNickname = useAppSelector(getPlayerNickname)
	const gameMode = useAppSelector(getGameMode)
	const error = useAppSelector(getError)
	const checkhash = () => {
		const playername = store.getState().player.nickname
		console.log("CHECK HASH CALLED ", window.location.hash)
		socket.emit("PLAYER_LEFT")
		if (window.location.hash.substring(1)) {
			let checkHash = HashParser(window.location.hash.substring(1))
			if (checkHash && checkHash.groups) {
				const { roomname, username } = checkHash.groups
				if (namevalidtor(username, roomname)) {
					console.log("===>",  playername, playerIngame, username)
					if (playername && username !== playername) {
						dispatch(SET_ERROR({ title: "Error :", message: "there is an username already set to this browser, try to leave first to register new account" }))
					} else {
						dispatch(SET_ERROR({ title: "", message: "" }))
						socket.emit('JOIN_ROOM', { room: checkHash.groups.roomname, playerName: checkHash.groups.username, mode: gameMode });
					}

				} else {
					dispatch(SET_ERROR({ title: "hash_query_error", message: "" }))
				}

			} else {
				dispatch(SET_ERROR({ title: "hash_query_error", message: "" }))
			}
		} else {
			console.log("No hash")
			dispatch(SET_ERROR({ title: "", message: "" }))
			// dispatch(LEAVE_GAME())
			// dispatch(RESET_STATES())
			socket.emit("PLAYER_LEFT")

		}
	}
	useEffect(() => {
		checkhash()
		window.removeEventListener("hashchange", () => { })
		window.addEventListener('hashchange', function () {
			checkhash()
		}, true);
	}, [])

	return (
		<div>
			{error.title ?
				(<Error title={error.title} message={error.message} />)
				: (!playerNickname ?
					(<Home />)
					: (playerIngame ?
						(<PlayBoard />)
						: (<Lobby callback={() => 0} />)))}

		</div>

	)
		;
}

export default App;
