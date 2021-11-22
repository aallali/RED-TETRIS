import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { isAdmin as ifAdmin } from "../reducers/player.reducer"
import audioOn from "../assets/images/mute.png"
import audioOff from "../assets/images/sound.png"
import locked from "../assets/images/lock.png"
import unlocked from "../assets/images/unlocked.png"
import plus from "../assets/images/plus.png"
import minus from "../assets/images/minus.png"
import "../pages/playboard.css"
// Actions
import { UPDATE_GAME_MODE } from "../app/actions"
import {store} from "../app/store";


const Options: React.FC = () => {
	const dispatch = useAppDispatch()
	const gameMode = store.getState().game.mode
	const isAdminS = useAppSelector<boolean>(ifAdmin)
	const [soundOn, toggleSound] = useState<boolean>(true)
	const [isLocked, toggleLock] = useState<boolean>(gameMode === "solo" ? true : false)
	const [roomSize, setRoomSize] = useState<number>(gameMode === "solo" ? 1: 5)
	useEffect(() => {
		if (isLocked === true || isLocked === false) {
			if (isLocked)
				dispatch(UPDATE_GAME_MODE("solo"))
			else
				dispatch(UPDATE_GAME_MODE("multiplayer"))
		}
	}, [isLocked])
	return (
		<div className="font-bold backdrop-filter backdrop-blur-xs" >
			<p >
				<button className="inline-flex items-center justify-center w-9 h-9 m-1 text-indigo-100 transition-colors duration-150 rounded-lg focus:shadow-outline bg-yellow-300 hover:bg-yellow-500"
					onClick={() => toggleSound(prev => !prev)}>
					<img className="h-5" src={soundOn ? audioOn : audioOff} alt="sound" />
				</button>
				<i className="text-sm ">: {soundOn ? "Sound On" : "Sound Off"}</i>
			</p>
			{isAdminS ? (
				<p>
					<button
						className="inline-flex items-center justify-center w-9 h-9 m-1 text-indigo-100 transition-colors duration-150 rounded-lg focus:shadow-outline bg-yellow-300 hover:bg-yellow-500"
						onClick={() => toggleLock(prev => !prev)}
					>
						<img className="h-5" src={isLocked ? locked : unlocked} alt="sound" />
					</button>
					<i className="text-sm">: {isLocked ? "Locked Mode" : "Open Mode"}</i>
				</p>) : null}


			{isAdminS ? (<div className="flex flex-row">
				<div className=" flex flex-row  ml-1 mt-1 h-8 w-20 rounded-lg  relative align-middle">
					<button
						className="
						font-semibold
						bg-yellow-300
						hover:bg-yellow-500
						textblack
						h-full
						w-14
						flex rounded-l
						focus:outline-none
						cursor-pointer
						 align-middle"
						onClick={() => setRoomSize((prev) => prev > 1 ?  --prev : prev)}
					>
						<span className="m-auto">
							<img className="h-3" src={minus} alt="minus" />
						</span>
					</button>
					{/* <input type="hidden" className="md:p-0 p-0 text-xs md:text-base  focus:outline-none text-center" readOnly name="custom-input-number" /> */}
					<div className="bg-white text-black w-14 text-xs md:text-base flex items-center justify-center cursor-default font-bold">
						<span>{roomSize}</span>
					</div>
					<button
						className="font-semibold
						bg-yellow-300
						hover:bg-yellow-500
						text-black
						h-full
						w-14 flex
						rounded-r
						focus:outline-none
						cursor-pointer"
						onClick={() => setRoomSize((prev) => prev < 5 ? ++prev : prev)}
					>
						<span className="m-auto">
							<img className="h-3" src={plus} alt="plus" />
						</span>
					</button>
				</div>
				<div className="pt-4">
					<i className=""> : Room Size</i>
				</div>

			</div>) : null}

		</div>

	)
}


export default Options
