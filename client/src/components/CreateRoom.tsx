/* eslint-disable react-hooks/exhaustive-deps */

import { ChangeEvent, useState } from "react";
import { UPDATE_GAME_MODE } from "../app/actions";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getGameMode } from "../reducers/game.reducer";
import { getPlayerNickname } from "../reducers/player.reducer";

export default function CreateRoomInput() {
	const game_mode = useAppSelector(getGameMode)
	const playerName = useAppSelector(getPlayerNickname)
	const [roomName, setRoomName] = useState<string>("")
	const [error, setError] = useState<string>("")

	const dispatch = useAppDispatch()
	function handleGameModeChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.checked)
			dispatch(UPDATE_GAME_MODE("multiplayer"))
		else
			dispatch(UPDATE_GAME_MODE("solo"))
	}

	function handleCreateRoom(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (roomName && /^[a-zA-Z0-9]{1,10}$/.test(roomName))
			window.location.hash = `#${roomName}[${playerName}]`
		else
			setError("alphabetic/numbers only (length between 1<x<10)")
	}
	return (
		<div
			className="flex my-1  rounded-sm pt-3 pb-3 pr-4 pl-4  bg-blue-50 justify-between items-center">
			<div className="flex flex-justify-start gap-1 items-center">
				<div
					className="relative inline-block w-10 mr-1 align-middle select-none transition duration-200 ease-in">
					<input type="checkbox" name="toggle" id="toggle" value={game_mode}
					data-testid="toggle"
						className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
						onChange={handleGameModeChange} defaultChecked={game_mode === "multiplayer" ? true : false}
					/>
					<label htmlFor="toggle"
						className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
				</div>

				<span className="uppercase font-bold text-gray-700">
					<label htmlFor="toggle" className="">{game_mode}</label>
				</span>
			</div>
			<div>
				<form className="m-0 flex">
				<input
					className="text-xl w-full rounded-l-md p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
					placeholder="room name..."
					value={roomName}
					id="roomNameInput"
					onChange={(e) => { setRoomName(e.target.value); }} />

				<button
					className="text-md w-1/2 font-bold px-1 rounded-r-md bg-blue-400  text-gray-800 font-bold p-1 uppercase border-none" onClick={handleCreateRoom}>Create
				</button>
			</form>
				<p className="text-xs text-red-600">{error}</p>
			</div>

		</div>

	);
}
