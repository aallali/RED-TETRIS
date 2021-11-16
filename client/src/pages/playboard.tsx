
import ProfileCard from "../component/profileCard";
import Opponents from "../component/opponents"
import styled from "styled-components";
import "./playboard.css"
import Tetris from "../component/tetris";
import { socket, useAppSelector } from "../app/hooks";
import { useCallback, useEffect, useState } from "react";

// images import 
import looser from "../images/looser.gif"
import winner from "../images/winner.gif"
import audioOn from "../images/mute.png"
import audioOff from "../images/sound.png"
import locked from "../images/lock.png"
import unlocked from "../images/unlocked.png"
import plus from "../images/plus.png"
import minus from "../images/minus.png"



import { isLost, isGameOver, isAdmin } from "../reducers/player.reducer"
export const HashParser = (window_hash: string) => {
	const regexp = /(?<roomname>[a-zA-Z0-9]{1,10})\[(?<username>[a-zA-Z0-9]{1,10})\]/;
	const result = window_hash.match(regexp);
	if (result)
		return result;
	return false;
};



export const StyledOverlay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #333333;
  z-index: 2;
  outline: 4px solid #333333;
  opacity: 0.9;
`


export default function Playboard() {
	const isLostS = useAppSelector<boolean>(isLost)
	const isAdminS = useAppSelector<boolean>(isAdmin)
	const isGameOverS = useAppSelector<boolean>(isGameOver)
	const [soundOn, toggleSound] = useState(true)
	const [isLocked, toggleLock] = useState(true)

	return (
		// Start of left side of the lobby page
		<div className="bg-gray-500 min-h-screen flex justify-center items-center shadow-xl" style={{ backgroundColor: "#aeb6bf" }}>
			<div className="mt-0  flex flex-col lg:flex-row w-full justify-center gap-2 p-4">
				<div className="bg-white lg:w-8/12 p-4 rounded-md ">

					<div className="w-full mx-auto">
						<div className="flex flex-col sm:flex-row gap-1 content-center">
							{/* <StyledOverlay> */}
							<div className="w-1/3 bg-gray-300"> 1</div>
							<div className="w-1/3 bg-gray-300"> 2</div>


							<div className="w-auto bg-gray-300 content-end">

								<div className={(isGameOverS ? "resource resourceanimation" : "resource")}>
									<Tetris />
									<div id="overlay">
										<img className="trohpy-icon" src={isLostS ? looser : winner} alt="statPlayer" />
										<h2 className="overlay-message text-center">{isLostS ? "What a shame looser" : "Congrats! you won."}</h2>
										{isAdminS ? (<button className="bg-green-400 hover:bg-green-300 w-1/2 py-1 px-4 m-0 rounded-sm text-black text-sm font-bold">Play Again</button>) : null}
									</div>
								</div>

							</div>
							<div className="bg-gray-300 pl-0 lg:w-1/3 sm:w-auto">
								<p>
									<button className="inline-flex items-center justify-center w-9 h-9 m-1 text-indigo-100 transition-colors duration-150 rounded-lg focus:shadow-outline bg-yellow-300 hover:bg-yellow-500"
										onClick={() => toggleSound(prev => !prev)}>
										<img className="h-5" src={soundOn ? audioOn : audioOff} alt="sound" />
									</button>
									<i className="text-sm">: Activate Sound</i>
								</p>

								<p>
									<button
										className="inline-flex items-center justify-center w-9 h-9 m-1 text-indigo-100 transition-colors duration-150 rounded-lg focus:shadow-outline bg-yellow-300 hover:bg-yellow-500"
										onClick={() => toggleLock(prev => !prev)}
									>
										<img className="h-5" src={isLocked ? locked : unlocked} alt="sound" />
									</button>
									<i className="text-sm">: Switch Game Mode</i>
								</p>


								<div className="flex flex-row">
									<div className="flex flex-row  h-7 w-20 rounded-lg  relative align-middle">
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
								</div>

							</div>
							{/* <div style={{ width: "100%", backgroundColor: "grays" }}> </div> */}


							{/* </StyledOverlay> */}
						</div>
					</div>
				</div>
				<div className="w-full lg:w-1/12 order-1 lg:order-last flex flex-col flex-1 justify-start gap-1">
					<ProfileCard playboard={true} />
					<div className="w-full mx-auto">

						<Opponents />

						
					</div>
				</div>
			</div>
		</div >
	)

}
