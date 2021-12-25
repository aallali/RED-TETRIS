/* eslint-disable react-hooks/exhaustive-deps */
// Hooks, Staters
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
// Stylesheets
import "./playboard.css"
// Components
import ProfileCard from "../components/ProfileCard";
import Opponents from "../components/OpponentBox"
import NextTetros from "../components/NextTetros";
import TetrisV2 from "../components/TetrisV2";

import Options from "../components/Options"
import ChatBox from "../components/Chatbox";
// images import
import looser from "../assets/images/looser.gif"
import winner from "../assets/images/winner.gif"

// States Selectors
import { isLost } from "../reducers/player.reducer"
import { isGameOver } from "../reducers/game.reducer"
import YoutubeEmbed from "../components/YoutubeBox";

// Sound Effects
import lostAudioUrl from "../assets/audio/game-over-sound-effect.mp3";
import wonAudioUrl from "../assets/audio/victory-sound-effect.mp3";

export default function Playboard() {

	const isLostS = useAppSelector<boolean>(isLost)
	const isGameOverS = useAppSelector<boolean>(isGameOver)
	const [lostAudio] = useState(new Audio(lostAudioUrl));
	const [wonAudio] = useState(new Audio(wonAudioUrl));

	useEffect(() => {
		if (isGameOverS || isLostS) {
			if (isLostS) {
				lostAudio.play()
			} else  {
				wonAudio.play()
			}
		}
	}, [isLost, isGameOverS])
	return (
		// Start of left side of the lobby page
		<div className="min-h-screen flex justify-center items-center shadow-xl">

			<div className="mt-0   flex flex-col lg:flex-row w-full justify-center gap-2 p-4 ">
				<div className="lg:w-9/12 p-4 rounded-md   ">

					<div className="w-full mx-auto">
						<div className="flex flex-col sm:flex-row gap-2 content-center">
							<div className="w-full inline-block ">
								<Opponents gameOver={isGameOverS}/>
							</div>
							<div className="w-auto content-endy">
								<div className={(isGameOverS || isLostS ? "resource resourceanimation" : "resource")}>
									{/* <Tetris /> */}
									<TetrisV2 />
									<div id="overlay">
										<img className="trohpy-icon" src={isLostS ? looser : winner} alt="statPlayer" />
										<h2 className="overlay-message text-center">{isLostS ? "What a shame looser" : "Congrats! you won."}</h2>
										{/* {isAdminS ? (<button className="bg-green-400 hover:bg-green-300 w-1/2 py-1 px-4 m-0 rounded-sm text-black text-sm font-bold" onClick={() => socket.emit("START_GAME")}>Play Again</button>) : null} */}
									</div>
								</div>

							</div>


							<div className="text-white pl-0 w-1/4 ">
								<NextTetros />
								<Options />
							</div>
							{/* <div style={{ width: "100%", backgroundColor: "grays" }}> </div> */}
						</div>
					</div>
				</div>
				<div className="w-auto   order-1 lg:order-last flex flex-col flex-1 justify-start gap-1">
					<ProfileCard playboard={true} />
					<div className="w-auto">
						<YoutubeEmbed embedId="s-Dq5FJEH10" />
					</div>
					<ChatBox />

				</div>
			</div>
		</div >
	)

}
