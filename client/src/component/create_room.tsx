import { ChangeEvent, ComponentProps, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getGameMode, getPlayerNickname, UPDATE_GAME_MODE } from "../reducers/player.reducer";

export default function CreateRoomInput(props: ComponentProps<any>) {
	const game_mode = useAppSelector(getGameMode)
	const playerName = useAppSelector(getPlayerNickname)
	const [roomName, setRoomName] = useState<string>("arena")
	const dispatch = useAppDispatch()
	function handleGameModeChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.checked)
			dispatch(UPDATE_GAME_MODE("multiplayer"))
		else
			dispatch(UPDATE_GAME_MODE("solo"))
	}
	return (
		<div
			className="flex my-10  rounded-sm p-5 bg-blue-50 justify-between items-center">
			<div className="flex justify-start gap-5 items-center">
				<div>
					<span className="tracking-widers uppercase text-xs text-blue-700 font-bold">
						<label htmlFor="toggle" className="text-sm text-gray-700">Game Mode :</label>
					</span>
					<h1>
						<div
							className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
							<input type="checkbox" name="toggle" id="toggle"
								className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
								onChange={handleGameModeChange}
							/>
							<label htmlFor="toggle"
								className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
						</div>
					</h1>
					<span className="tracking-wider uppercase text-xs text-blue-700 font-bold">
						<label htmlFor="toggle" className="text-sm text-gray-700">{game_mode}</label>
					</span>
				</div>
			</div>

			<form className="m-4 flex">
				<input
					className="text-xl w-full rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
					placeholder="room name..."
					value={roomName}
					onChange={(e) => { setRoomName(e.target.value); }} />
				<button
					className="lg:text-xl md:text-xl w-1/2 font-bold px-1 rounded-r-lg bg-blue-400  text-gray-800 font-bold p-1 uppercase border-none" onClick={(e) => {
						e.preventDefault();
						window.location.hash = `#${roomName}[${playerName}]`
						props.callback()
					}}>Create
				</button>
			</form>



		</div>

	);
}
