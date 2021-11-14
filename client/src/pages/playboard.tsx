
import ProfileCard from "../component/profileCard";
import Opponents from "../component/opponents"
import styled from "styled-components";
import "./playboard.css"
import Tetris from "../component/tetris";
import { socket, useAppSelector } from "../app/hooks";
import { useCallback, useEffect, useState } from "react";
import looser from "../images/looser.gif"
import winner from "../images/winner.gif"
import audioOn from "../images/mute.png"
import audioOff from "../images/sound.png"
import locked from "../images/lock.png"
import unlocked from "../images/unlocked.png"

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
	return (
		// Start of left side of the lobby page
		<div className="bg-gray-500 min-h-screen flex justify-center items-center shadow-xl" style={{ backgroundColor: "#aeb6bf" }}>
			<div className="mt-0  flex flex-col lg:flex-row w-full justify-center gap-2 p-4">
				<div className="bg-white lg:w-8/12 p-4 rounded-md ">

					<div className="w-full mx-auto">
						<div className="flex flex-col sm:flex-row gap-1 content-center">
							{/* <StyledOverlay> */}
							<div style={{ width: "100%", backgroundColor: "grays" }}> </div>
							<div style={{ width: "100%", backgroundColor: "grays" }}> </div>


							<div style={{ width: "100%" }}>

								<div className={(isGameOverS ? "resource resourceanimation" : "resource")}>
									<Tetris />
									<div id="overlay">
										<img className="trohpy-icon" src={isLostS ? looser : winner} alt="statPlayer" />
										<h2 className="overlay-message text-center">{isLostS ? "What a shame looser" : "Congrats! you won."}</h2>
										{isAdminS ? (<button className="bg-green-400 hover:bg-green-300 w-1/2 py-1 px-4 m-0 rounded-sm text-black text-sm font-bold">Play Again</button>) : null}
									</div>
								</div>


							</div>
							<div className="bg-grays-200 pl-2" style={{ width: "100%" }}>
								<p><i>Activate Sound :</i>
									<button className="inline-flex items-center justify-center w-9 h-9 m-1 text-indigo-100 transition-colors duration-150 rounded-lg focus:shadow-outline bg-yellow-200 hover:bg-yellow-100"
										onClick={() => toggleSound(prev => !prev)}>
										<img className="h-5" src={soundOn ? audioOn : audioOff} alt="sound" />
									</button></p>

								<p><i>Switch Game Mode:</i>
									<button className="inline-flex items-center justify-center w-9 h-9 m-1 text-indigo-100 transition-colors duration-150 rounded-lg focus:shadow-outline bg-yellow-200 hover:bg-yellow-100" >
										<img className="h-5" src={locked} alt="sound" />
									</button></p>



							</div>
							<div style={{ width: "100%", backgroundColor: "grays" }}> </div>


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
