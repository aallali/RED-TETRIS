import { ComponentProps } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getPlayer } from "../reducers/player.reducer";
import { isGameStarted } from "../reducers/game.reducer"
import { LOGOUT_PLAYER } from "../actions";
import { socket } from "../app/hooks";
export default function ProfileCard(props: ComponentProps<any>) {
	const player = useAppSelector(getPlayer)
	const gameStarted = useAppSelector(isGameStarted)
	const dispatch = useAppDispatch()
	function start() {
		if (!gameStarted) {
			console.log("START GAME ...")
			socket.emit("START_GAME")
		}
	}
	return (

		<div className="bg-white p-1 rounded-md text-center">
			<img
				src="https://images.launchbox-app.com/db8057c0-f51e-403f-9d59-46100abed4c6.png"
				alt="deflat"
				className="h-14  w-full object-cover content-center rounded-t-md"
			/>
			<div className="flex justify-center">
				<img
					src="https://ui-avatars.com/api/?background=B82E1F&bold=true&color=fff&name=Abdellah+Allali"
					alt="gogba"
					className="w-10 h-10 rounded-full object-cover content-center -mt-5 border-4 border-white"
				/>
			</div>
			<h1 className="text-center font-bold tracking-wider text-gray-700   m-0">
				{player.isAdmin ? '★' : '#'}{player.nickname} {player.isAdmin}
			</h1>


			<button
				className="bg-blue-100  border-1 border-blue-700 py-2 px-2 rounded-md text-blue-700 text-md font-bold m-0">
				Level {player.level}
			</button>
			<div className="mt-0 flex justify-between mx-10 mb-1">
				<div className="text-left">
					<h1 className="text-gray-500">level</h1>
					<p className="text-xl text-gray-800">{player.level}</p>
				</div>
				<div className="text-left">
					<h1 className="text-gray-500">Score</h1>
					<p className="text-xl text-gray-800">{player.score}</p>
				</div>
				<div className="text-left">
					<h1 className="text-gray-500">rows cleared</h1>
					<p className="text-xl text-gray-800">{player.rows}</p>
				</div>
			</div>

			<div className="w-full mx-auto">
				<div className="flex flex-col flex-1 sm:flex-row gap-1">
					<button
						className="bg-red-300 hover:bg-red-700 w-full py-1 px-4 mr-0 rounded-sm text-white text-sm font-semibold"
						onClick={() => dispatch(LOGOUT_PLAYER())}>
						Leave
					</button>
					{props.playboard && player.isAdmin && !gameStarted ?
						(<button
							className="bg-green-300 hover:bg-green-700 w-full py-1 px-4 m-0 rounded-sm text-white text-sm font-bold"
							onClick={() => start()}
						>
							Start
						</button>) : null
					}
				</div>
			</div>


		</div>


	);
}
