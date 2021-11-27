import { ComponentProps } from "react";
import { useAppSelector } from "../app/hooks";
import { getPlayerNickname } from "../reducers/player.reducer";

export default function RoomBar(props: ComponentProps<any>) {
	const playerName = useAppSelector(getPlayerNickname)
	return (
		<div className="flex justify-between items-center mt-5 border-b-4 rounded-lg ">
			<div className="flex justify-items-start gap-3 items-stretch rounded-md">
				<img className="rounded-l-lg h-14 "
					src={"https://ui-avatars.com/api/?background=B82E1F&bold=true&color=fff&name=" + props.title}
					alt="" />
				<div>
					<h1 className="font-bold text-gray-700">Room : #{props.title}</h1>
					<p className="text-sm text-gray-500">{props.active_players}/{props.size} Players</p>
				</div>
			</div>
			<div className="flex justify-items-start gap-3 items-stretch rounded-md">

				<div>

					{/*<h1 className="font-bold text-white">.</h1>*/}
					<h1 className="font-bold text-md text-gray-700">Mode :{props.mode}</h1>
				</div>
				<button onClick={() => { window.location.hash = `#${props.title}[${playerName}]`; }}
					className={"bg-blue-500 h-14 hover:bg-blue-400 text-white font-bold py-2 px-4 " +
						"order-b-4 border-blue-700 hover:border-blue-500 rounded-r-lg " + (props.active_players === 10 ? "opacity-50 cursor-not-allowed" : null)}
				>
					JOIN
				</button>
			</div>
		</div >);
}
