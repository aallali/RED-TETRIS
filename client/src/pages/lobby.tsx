import RoomBar from "../components/RoomBar"
import RankedPlayers from "../components/RankedPlayers";
import CreateRoomInput from "../components/CreateRoom";
import ProfileCard from "../components/ProfileCard";
import { useEffect, useState } from "react";
import axios from "axios"
interface IRooms {
	title: string
	size: number
	mode: string
	started: boolean
	active_players: number
}
export default function Lobby({ callback }: { callback: CallableFunction }) {
	const [rooms, getRooms] = useState<IRooms[]>([])

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/rooms`)
			.then((res: any) => {
				getRooms([...res.data])
			})
		return () => {

		};
	}, []);
	return (
		// Start of left side of the lobby page
		<div className="  min-h-screen flex justify-center items-center shadow-xl">
			<div className="mt-0  flex flex-col lg:flex-row w-full justify-center gap-2 p-4">
				<div className="bg-white lg:w-7/12 p-4 rounded-lg order-2 lg:order-first">
					<h1 className="text-gray-700 text-xl  font-bold">
						Start your own room now !
					</h1>
					{/*Creat a room input*/}
					<CreateRoomInput />
					{/*End of Creat a room input*/}
					<h1 className="text-gray-700 font-bold text-xl tracking-wider">
						Rooms Online now :
					</h1>
					<div className="my-0">
						{rooms.length === 0 ? (<h1 className="text-md">No open room available ... create yours now!</h1>) :
							rooms.sort((a, b) => a.active_players - b.active_players).map(room =>
							(
								<RoomBar key={room.title} {...room} />
							)
							)}
					</div>
				</div>
				<div className="w-full lg:w-1/12 order-1 lg:order-last flex flex-col flex-1 justify-start gap-2">
					<ProfileCard />
					{/*START OF RANKING*/}
					<div className="gap-2 justify-between flex flex-row">
						<div className="w-3/5">
							<RankedPlayers />
						</div>

						<div className="bg-white rounded-lg p-1 pl-0 pr-0 w-full ">
							<h1 className="font-bold tracking-wider text-gray-800 text-xl p-2">
								About :
							</h1>
							<div className="flex flex-col items-center">
								<div className="w-full md:w-full flex flex-col items-center h-60">
									<div className="w-full px-2 overflow-x-auto">
										<p><b>Red-Tetris</b> is an online multiplayer tetris game, realised in following stack [<b>reactJs</b>, <b>redux</b>, <b>sockets</b>, <b>express</b>] and written in typescript, it provides many features such playing in open/locked room and specify the size of your current room where you are the owner, play the game synchronously with joined members with same pieces, where one of you wins the game at the end, each time you clear a row, your opponents receive a n -1 row in their board, so be fast and clear more rows faster, the game just recently deployed to public so there is more feautures incomming to add and more bugs to fix :)</p>
										<p>if you ever wanted to contact the creator, please feel free to reach me via : <b>hi@allali.me</b> </p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*END OF RANKING*/}
				</div>
			</div>
		</div>
	);
}
