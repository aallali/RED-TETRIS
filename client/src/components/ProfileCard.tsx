import { ComponentProps } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
// Selectors
import { getPlayer } from "../reducers/player.reducer";
import { getGameMode, isGameStarted } from "../reducers/game.reducer"
import { getOpponents } from "../reducers/opponent.reducer";
// actions
import { LOGOUT_PLAYER } from "../app/actions";
//socket
import { socket } from "../app/hooks";
// assets
import cover_profile from "../assets/images/cover_profile.png"

// Component Function , i dunno why i'm writing this xD
export default function ProfileCard(props: ComponentProps<any>) {
	const player = useAppSelector(getPlayer)
	const gameStarted = useAppSelector(isGameStarted)
	const gameMode = useAppSelector(getGameMode)
	const onlineOpponents = useAppSelector(getOpponents)
	const dispatch = useAppDispatch()

	function start() {
		socket.emit("START_GAME")
		return
	}

	function handleLeaveEvent() {
		if (props.playboard) {
			socket.emit("PLAYER_LEFT")
			window.location.href = window.location.href.split('#')[0]
		} else dispatch(LOGOUT_PLAYER())
	}
	return (

		<div className="bg-white p-1 rounded-md text-center">
			<img
				src={cover_profile}
				alt="deflat"
				className="h-24  w-full object-cover content-center rounded-t-md"
			/>
			<div className="flex justify-center">
				<img
					src={"https://ui-avatars.com/api/?background=B82E1F&bold=true&color=fff&name=" + player.nickname}
					alt={player.nickname || "Mr.Abdellah Allali"}
					className="w-14 h-14 rounded-full object-cover content-center -mt-8 border-4 border-white"
				/>
			</div>
			<h1 className="text-center font-bold tracking-wider text-gray-700   m-0">
				{player.isAdmin ? '★' : ''}{player.nickname} {player.isAdmin}
			</h1>

			{!props.playboard ? (<button
				className="bg-blue-100  border-1 border-blue-700 py-2 px-2 rounded-md text-blue-700 text-md font-bold mb-2">
				Max Level: {player.level}
			</button>) : null
			}


			{props.playboard ? (<div className="mt-0 flex justify-between mx-10 mb-1">
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
			</div>) : null
			}

			<div className="w-full mx-auto">
				<div className="flex flex-col flex-1 sm:flex-row gap-1">
					<button
						className="bg-red-500 hover:bg-red-400 w-full py-1 px-4 mr-0 rounded-sm text-white text-sm font-semibold"
						onClick={() => handleLeaveEvent()}>
						Leave
					</button>
					{props.playboard && player.isAdmin && !gameStarted && (gameMode === "solo" || (gameMode === "multiplayer" && onlineOpponents.length > 0)) ?
						(<button
							className="bg-green-300 hover:bg-green-700 w-full py-1 px-4 m-0 rounded-sm text-white text-sm font-bold"
							onClick={() => start()}
						>
							Start
						</button>) : null
					}
				</div>
			</div>
		</div >
	);
}
