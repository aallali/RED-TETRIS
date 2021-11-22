/* eslint-disable react-hooks/exhaustive-deps */
// Hooks, Staters
import { useAppSelector } from "../app/hooks";
// Stylesheets
import "./playboard.css"
// Components
import Profile_card from "../component/profile_card";
import Opponents from "../component/opponents"
import NextTetros from "../component/next_tetros";
import Tetris from "../component/tetris";
import Options from "../component/options"
import YoutubeEmbed from "../component/youtube_embed"
import ChatBox from "../component/chatbox";
// images import
import looser from "../assets/images/looser.gif"
import winner from "../assets/images/winner.gif"

// States Selectors
import { isLost } from "../reducers/player.reducer"
import { isGameOver } from "../reducers/game.reducer"


export const HashParser = (window_hash: string) => {
	const regexp = /(?<roomname>[a-zA-Z0-9]{1,10})\[(?<username>[a-zA-Z0-9]{1,10})\]/;
	const result = window_hash.match(regexp);
	if (result)
		return result;
	return false;
};


export default function Playboard() {
	console.log("_PLAYBOARD")
	const isLostS = useAppSelector<boolean>(isLost)
	const isGameOverS = useAppSelector<boolean>(isGameOver)

	return (
		// Start of left side of the lobby page
		<div className=" min-h-screen flex justify-center items-center shadow-xl">

			<div className="mt-0   flex flex-col lg:flex-row w-full justify-center gap-2 p-4">
				<div className="lg:w-9/12 p-4 rounded-md ">

					<div className="w-full mx-auto">
						<div className="flex flex-col sm:flex-row gap-2 content-center">
							<div className="w-6/12 ">
								<div className="w-full mx-auto">
									<Opponents />
								</div>

								{/*<ChatBox />*/}

							</div>


							<div className="w-auto content-endy">

								<div className={(isGameOverS || isLostS ? "resource resourceanimation" : "resource")}>
									<Tetris />
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
				<div className="w-full   order-1 lg:order-last flex flex-col flex-1 justify-start gap-1">
					<Profile_card playboard={true} />
					<div className="w-full mx-auto">
						<YoutubeEmbed embedId="s-Dq5FJEH10" />
					</div>
				</div>
			</div>
		</div >
	)

}
