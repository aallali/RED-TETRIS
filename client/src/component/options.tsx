import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { isAdmin as ifAdmin } from "../reducers/player.reducer"
import audioOn from "../images/mute.png"
import audioOff from "../images/sound.png"
import locked from "../images/lock.png"
import unlocked from "../images/unlocked.png"
import plus from "../images/plus.png"
import minus from "../images/minus.png"
import "../pages/playboard.css"
// Actions
import { UPDATE_GAME_MODE } from "../actions"


const Options: React.FC = () => {
	const dispatch = useAppDispatch()

	const isAdminS = useAppSelector<boolean>(ifAdmin)
	const [soundOn, toggleSound] = useState<boolean>(true)
	const [isLocked, toggleLock] = useState<boolean>(true)
	useEffect(() => {
		if (isLocked)
			dispatch(UPDATE_GAME_MODE("solo"))
		else
			dispatch(UPDATE_GAME_MODE("multiplayer"))

	}, [isLocked])
	return (
		<div >
			<p>
				<button className="inline-flex items-center justify-center w-9 h-9 m-1 text-indigo-100 transition-colors duration-150 rounded-lg focus:shadow-outline bg-yellow-300 hover:bg-yellow-500"
					onClick={() => toggleSound(prev => !prev)}>
					<img className="h-5" src={soundOn ? audioOn : audioOff} alt="sound" />
				</button>
				<i className="text-sm">: {soundOn ? "Sound On" : "Sound Off"}</i>
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
				<div className="flex flex-row  ml-1 h-7 w-20 rounded-lg  relative align-middle">
					<button className="font-semibold   bg-yellow-300 hover:bg-yellow-500 textblack h-full w-14 flex rounded-l focus:outline-none cursor-pointer align-middle">
						<span className="m-auto">
							<img className="h-3" src={minus} alt="minus" />
						</span>
					</button>
					{/* <input type="hidden" className="md:p-0 p-0 text-xs md:text-base  focus:outline-none text-center" readOnly name="custom-input-number" /> */}
					<div className="bg-white w-24 text-xs md:text-base flex items-center justify-center cursor-default font-bold">
						<span>2</span>
					</div>
					<button className="font-semibold   bg-yellow-300 hover:bg-yellow-500 text-black h-full w-14 flex rounded-r focus:outline-none cursor-pointer">
						<span className="m-auto">
							<img className="h-3" src={plus} alt="plus" />
						</span>
					</button>
				</div>
				<div className="">
					<i className="text-sm">: Room Size</i>

				</div>

			</div>) : null}

		</div>

	)
}


export default Options