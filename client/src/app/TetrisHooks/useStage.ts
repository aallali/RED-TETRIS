import React from 'react';
import { BROADCAST_SCORE } from '../../actions';
import { createStage } from '../../helpers/gameHelpers';
// Types
import { IStage, IStageCell, IPlayer } from "../../types"
import { useAppDispatch } from '../hooks';

export const useStage = (player: IPlayer, resetPlayer: () => void) => {
	const [stage, setStage] = React.useState(createStage());
	const [rowsCleared, setRowsCleared] = React.useState(0);
	const dispatch = useAppDispatch()
	React.useEffect(() => {
		if (!player.pos) return;

		setRowsCleared(0);

		const sweepRows = (newStage: IStage): IStage => {
			return newStage.reduce((ack, row) => {
				// If we don't find a 0 it means that the row is full and should be cleared
				if (row.findIndex((cell) => cell[0] === 0 || cell[0] === "X") === -1) {
					setRowsCleared(prev => prev + 1);
					// Create an empty row at the beginning of the array to push the Tetrominos down
					// instead of returning the cleared row
					ack.unshift(new Array(newStage[0].length).fill([0, 'clear']) as IStageCell[]);
					return ack;
				}

				ack.push(row);
				return ack;
			}, [] as IStage);
		};

		const updateStage = (prevStage: IStage): IStage => {
			// First flush the stage
			// If it says "clear" but don't have a 0 it means that it's the players move and should be cleared
			const newStage = prevStage.map(
				row => row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)) as IStageCell[]
			);

			// Then draw the tetromino
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newStage[y + player.pos.y][x + player.pos.x] = [value, `${player.collided ? 'merged' : 'clear'}`];
					}
				});
			});

			if (player.collided) {
				resetPlayer();
				return sweepRows(newStage);
			}

			return newStage;
		};

		setStage(prev => updateStage(prev));
	}, [player.collided, player.pos, player.tetromino, resetPlayer]);

	return { stage, setStage, rowsCleared };
};
