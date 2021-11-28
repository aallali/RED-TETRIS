import React from "react"
import { useAppSelector } from "../app/hooks";
import Stage from "./TetrisV2/components/Stage/Stage";
import { TETROMINOS } from "../helpers/tetrominos";
import "../pages/playboard.css"
import { getTetros } from "../reducers/game.reducer";


const NextTetros: React.FC = () => {
	const tetros = useAppSelector(getTetros)
	function generateMiniStageFromTetro(t: keyof typeof TETROMINOS) {
		let stage = Array.from(Array(4), () => Array(4).fill([0, 'clear']))
		const nextTetro = TETROMINOS[t].shape
		let pos = { x: 0, y: 0 }
		switch (t) {
			case 'O':
				pos = { x: 1, y: 1 }
				break
			case 'Z':
				pos = { x: 1, y: 1 }
				break
			default:
				break
		}
		nextTetro.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value !== 0) {
					stage[y + pos.y][x + pos.x] = [value, 'merged'];
				}
			});
		});
		return stage
	}
	return (
		<div>
			{/*{tetros.length > 0 ? (<h1 className={"text-xl text-gray-200 font-bold"}>Next Tetros :</h1>): null}*/}
			<div className="inline-blocks  flex   space-x-2">
				{tetros.slice(1, 4).map((l, i) => (<Stage  key={i} stage={generateMiniStageFromTetro(l)} STAGE_HEIGHT={4} STAGE_WIDTH={4} CELL_SIZE={15}/>
				))}
			</div>
		</div>

	)
}
export default NextTetros
