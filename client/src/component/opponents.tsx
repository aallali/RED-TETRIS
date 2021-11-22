import React, { ComponentProps } from "react"
import { useAppSelector } from "../app/hooks";
import Stage from "../component/tetris/Stage/Stage";
import { getOpponents } from "../reducers/opponent.reducer"
import "../pages/playboard.css"
import { isGameOver } from "../reducers/game.reducer";

function Opponent(props: ComponentProps<any>) {
	const { stage, name, admin, score, lost, level, rows } = props.p
	return (
		<div className="w-1/3 p-0">
			<div className="bg-white p-0 rounded-md shadow-lg text-center">
				<h2 className="text-md font-bold text-gray-700">{admin ? '★' : '#'}{name}</h2>
				<div className="flex flex-row  justify-center items-center">
					{stage ? (<div className={(lost || props.gameOver ? "resource resourceanimation" : "resource")}>
						<Stage stage={stage} STAGE_HEIGHT={20} STAGE_WIDTH={10} CELL_SIZE={9} />
						<div id="overlay">
							<span className={" font-bold text-bold block " + (lost ? "text-red-500" : "text-yellow-500")}> {lost ? 'LOST' : ": Winner! :"}</span>

						</div>
					</div>
					) : null}
				</div>
				<span className="font-bold block text-left ml-2 p-0 text-xs">level : ({level}) </span>
				<span className="font-bold block text-left ml-2 p-0 text-xs">Score : ({score}) </span>
				<span className="font-bold block text-left ml-2 p-0 text-xs">Rows c. : ({rows}) </span>
			</div>
		</div>
	)
}

const Opponents: React.FC = () => {
	const players = useAppSelector(getOpponents)
	const gameOver = useAppSelector(isGameOver)
	return (
		<div className="flex gap-1 flex-wrap">
			{
				players.map(p => (<Opponent key={p.name} p={p} gameOver={gameOver} />))
			}
		</div>
	)
}


export default Opponents
