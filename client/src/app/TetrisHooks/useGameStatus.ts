import React, { useState } from 'react';
import { ROWPOINTS } from '../../helpers/tetrominos';
import { UPDATE_SCORE } from "../../reducers/player.reducer"
import { useAppDispatch } from '../hooks';
import popMp3 from "../../assets/audio/scoring.mp3"
export const useGameStatus = (rowsCleared: number, stage: any) => {
	rowsCleared = Math.ceil(rowsCleared / 2)
	const dispatch = useAppDispatch()
	const [score, setScore] = React.useState(0);
	const [rows, setRows] = React.useState(0);
	const [level, setLevel] = React.useState(1);
	const [audio2] = useState(new Audio(popMp3));

	React.useEffect(() => {
		if (rowsCleared > 0) {
			setScore(prev => prev + (ROWPOINTS[rowsCleared - 1]) * level);
			setRows(prev => prev + rowsCleared);
			try {
				audio2.play()
			} catch (error) {

			}
		}
		dispatch(UPDATE_SCORE({ level: level, rows: rows, score: score, stage: stage }))

	}, [rowsCleared, stage, level, dispatch, rows, score, audio2]);

	return { score, setScore, rows, setRows, level, setLevel };
};
