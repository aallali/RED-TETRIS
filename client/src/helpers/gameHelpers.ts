import { IPlayer, IStage } from "../types"

import { STAGE_WIDTH, STAGE_HEIGHT } from './tetrominos';

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));
export const costumStage = (t: string | number) => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([t, 'clear']));

// export const randomTetromino = () => {
// 	// ['I', 'J', 'L', 'I', 'O', 'S', 'I', 'T', 'Z'] 
// 	const tetrominos =  ['I', 'J', 'L', 'I', 'O', 'S', 'I', 'T', 'Z']  as (keyof typeof TETROMINOS)[];
// 	const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
// 	return TETROMINOS[randTetromino];
// };

export const isColliding = (player: IPlayer, stage: IStage, { x: moveX, y: moveY }: { x: number; y: number }) => {
	// Using for loops to be able to return (and break). Not possible with forEach
	for (let y = 0; y < player.tetromino.length; y += 1) {
		for (let x = 0; x < player.tetromino[y].length; x += 1) {
			// 1. Check that we're on an actual Tetromino cell
			if (player.tetromino[y][x] !== 0 && player.tetromino[y][x] !== "X") {
				if (
					// 2. Check that our move is inside the game areas height (y)
					// That we're not moving through the bottom of the grid
					!stage[y + player.pos.y + moveY] ||
					// 3. Check that our move is inside the game areas width (x)
					!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
					// 4. Check that the cell we're moving to isn't set to clear
					stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
				) {
					return true;
				}
			}
		}
	}

	// 5. If everything above is false
	return false;
};
