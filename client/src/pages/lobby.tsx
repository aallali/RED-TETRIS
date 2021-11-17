import RoomBar from "../component/room_bar"
import RankedPlayers from "../component/ranked_players";
import CreateRoomInput from "../component/create_room";
import ProfileCard from "../component/profileCard";
import { useEffect, useState } from "react";
import axios from "axios"
interface IRooms {
	title: string
	size: number
	mode: string
	started: boolean
	active_players: number
}
export default function Lobby({ callback }: { callback: any }) {
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
		<div className="bg-gray-200 min-h-screen flex justify-center items-center shadow-xl">
			<div className="mt-0  flex flex-col lg:flex-row w-full justify-center gap-2 p-4">
				<div className="bg-white lg:w-7/12 p-4 rounded-lg order-2 lg:order-first">
					<h1 className="text-gray-700 text-xl  font-bold">
						Start your own room now !
					</h1>
					{/*Creat a room input*/}
					<CreateRoomInput callback={callback} />
					{/*End of Creat a room input*/}
					<h1 className="text-gray-700 font-bold text-xl tracking-wider">
						Rooms Online now :
					</h1>
					<div className="my-0">
						{rooms.length === 0 ? (<h1 className="text-md">No open room available ... create yours now!</h1>) :
							rooms.sort((a, b) => a.active_players - b.active_players).map(room =>
							(
								<RoomBar key={room.title} {...room} callback={callback} />
							)
							)}
					</div>
				</div>
				<div className="w-full lg:w-1/12 order-1 lg:order-last flex flex-col flex-1 justify-start gap-2">
					<ProfileCard />
					{/*START OF RANKING*/}
					<RankedPlayers />
					{/*END OF RANKING*/}
				</div>
			</div>
		</div>
	);
}
