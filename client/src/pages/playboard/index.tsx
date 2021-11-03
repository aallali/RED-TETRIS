
import ProfileCard from "../../component/profileCard";
import { getStage } from "../../reducers/stage.reducer";
import Tetris from "../../component/tetris/board";
import Stage from "../../component/tetris/Stage";
import { useAppSelector, socket } from "../../app/hooks";
import { ComponentProps, useEffect, useState } from "react";
import { getPlayer } from "../../reducers/player.reducer";

function Opponent(props: ComponentProps<any>) {
	const miniStage = useAppSelector(getStage)
	return (<div className="sm:w-1/4 p-0">
		<div className="bg-white p-1 rounded-lg shadow-lg text-center">
			<h2 className="text-md font-bold text-gray-700">#{props.name}</h2>
			<div className="">
				{miniStage ? <Stage gridSize={10} stage={miniStage} /> : null}
			</div>
			<span className="text-red-500 font-bold block mb-1">LOST</span>
		</div>
	</div>)
}


export const HashParser = (window_hash: string) => {
	const regexp = /(?<roomname>[a-zA-Z0-9]{1,10})\[(?<username>[a-zA-Z0-9]{1,10})\]/;
	const result = window_hash.match(regexp);
	if (result)
		return result;
	return false;
};

export default function Playboard() {
	const player = useAppSelector(getPlayer).nickname
	console.log("Rerender mini stage")
	const checkHash: any | boolean = HashParser(window.location.hash.substring(1));
	const [canJoin, setCJoin] = useState(false)
	const [msg, setMsg] = useState("Wait...")

	function join() {
		if (checkHash && checkHash.groups)
			socket.emit('join', { room: checkHash.groups.roomname, playerName: checkHash.groups.username });
		socket.on('join', function (res: any) {
			console.log(res)
			if (res.status ==true)
				setCJoin(true)
			setMsg(res.msg)
		})
		return
	}
	useEffect(() => {
		if (checkHash)
			join()
	})
	if (checkHash === false)
		return (

			<div className="flex flex-col h-screen bg-gray-800">
				<div className="grid place-items-center mx-0 my-0 sm:my-auto">



					<div className="bg-white p-3 rounded-xl shadow">
						<div className="m-auto space-y-10">
							<div className="flex gap-4 bg-red-100 p-4 rounded-md">
								<div className="w-max">
									<div className="h-10 w-10 flex rounded-full bg-gradient-to-b from-red-100 to-red-300 text-red-700">

									</div>
								</div>
								<div className="space-y-1 text-sm">
									<h6 className="font-medium text-red-900">OUUPS!</h6>
									<p className="text-red-700 leading-tight">
										Invalid Hash Query please respect the following format
									</p>
									<p className="text-red-700 leading-tight">while the (room/player) names should be alphabetics between 1-10 character
									</p>


									<p>http://&lt;server_name_or_ip&gt;:&lt;port&gt;/#&lt;room&gt;[&lt;player_name&gt;] </p>
									<p><b>Example : </b> http://localhost:3003/#arena[aallali]</p>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>

		)
	if (canJoin)
		return (
			// Start of left side of the lobby page
			<div className="bg-gray-200 min-h-screen flex justify-center items-center shadow-xl">
				<div className="mt-0  flex flex-col lg:flex-row w-full justify-center gap-2 p-4">
					<div className="bg-white lg:w-7/12 p-4 rounded-lg order-2 lg:order-first">

						<div className="w-full mx-auto">
							<div className="flex flex-col flex-1 sm:flex-row gap-0">
								<Tetris />
							</div>
						</div>
					</div>
					<div className="w-full lg:w-1/12 order-1 lg:order-last flex flex-col flex-1 justify-start gap-2">

						{/*START OF RANKING*/}
						<div className="w-full mx-auto">
							<div className="flex flex-row sm:flex-row gap-1">
								{/* Oponent 1 */}
								<Opponent name={"user1"} />
								{/* Oponent 2 */}
								<Opponent name={"user2"} />
								{/* Oponent 3 */}
								<Opponent name={"user3"} />
								{/* Oponent 4 */}
								<Opponent name={"user4"} />
							</div>
						</div>
						{/*END OF RANKING*/}
						<ProfileCard playboard={true} />
					</div>
				</div>
			</div>
		)
	else
		return (<h1>{msg}</h1>)
}
