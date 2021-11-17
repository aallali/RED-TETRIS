import React from 'react';
import { STAGE_WIDTH } from '../../helpers/tetrominos';
import { isColliding } from '../../helpers/gameHelpers';
import { IPlayer, IStage } from "../../types"
import { useAppDispatch, useAppSelector } from '../hooks';
import { getTetros, SHIFT_TETRO } from '../../reducers/game.reducer';
import { TETROMINOS } from '../../helpers/tetrominos';


export const usePlayer = () => {
	const [player, setPlayer] = React.useState({
		pos: {
			x: 0,
			y: 0,
		},
		tetromino: TETROMINOS[0].shape,
		collided: true,
	} as IPlayer)
	const dispatch = useAppDispatch()
	const tetros = useAppSelector(getTetros)
	const rotate = (matrix: IPlayer['tetromino']) => {
		// Make the rows to become cols (transpose)
		const mtrx = matrix.map((_, i) => matrix.map(column => column[i]));
		// Reverse each row to get a rotated matrix
		return mtrx.map(row => row.reverse());
	};

	const playerRotate = (stage: IStage): void => {
		const clonedPlayer = JSON.parse(JSON.stringify(player));
		clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

		// This one is so the player can't rotate into the walls or other tetrominos that's merged
		const posX = clonedPlayer.pos.x;
		let offset = 1;
		while (isColliding(clonedPlayer, stage, { x: 0, y: 0 })) {
			clonedPlayer.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));

			if (offset > clonedPlayer.tetromino[0].length) {
				clonedPlayer.pos.x = posX;
				return;
			}
		}

		setPlayer(clonedPlayer);
	};

	const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided: boolean }): void => {
		setPlayer(prev => {
			if (prev.pos.y + y >= 0)
				return ({
					...prev,
					pos: { x: (prev.pos.x + x), y: (prev.pos.y + y) },
					collided
				})
			return prev
		});
	};

	const resetPlayer = React.useCallback(
		(): void => {
			if (tetros.length > 0) {
				const tetro = tetros[0]
				dispatch(SHIFT_TETRO())
				setPlayer({
					pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
					tetromino: TETROMINOS[tetro].shape,
					collided: false
				})
			}
		},
		[tetros, dispatch]
	);

	return { player, updatePlayerPos, resetPlayer, playerRotate };
};
