/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { createStage, isColliding } from '../../helpers/gameHelpers';

// Custom hooks
import { useGameStatus ,usePlayer, useStage, useInterval} from '../../app/hooks';

// Components
import Stage from './components/Stage/Stage';

// Styles

// Costum Constans
import { STAGE_HEIGHT, STAGE_WIDTH } from "../../helpers/tetrominos"
import { socket, useAppDispatch, useAppSelector } from '../../app/hooks';

// Actions
import { PLAYER_LOST, SET_GAME_OVER, SHIFT_TETRO, UPDATE_SCORE } from '../../app/actions';

// Selectors
import { isGameStarted as isGameStartedS, isGameOver, getTetros, } from "../../reducers/game.reducer"
import { getRows2Add } from '../../reducers/player.reducer';


const TetrisV2: React.FC = () => {
	const dispatch = useAppDispatch()

	const isGameStarted = useAppSelector(isGameStartedS)
	const gameOver = useAppSelector<boolean>(isGameOver)
	const rows2add = useAppSelector(getRows2Add)
	const tetros = useAppSelector(getTetros)

	const [dropTime, setDroptime] = React.useState<null | number>(null);
	const gameArea = React.useRef<HTMLDivElement>(null);

	const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
	const { stage, setStage, rowsCleared } = useStage(player, resetPlayer, (tetros[0] || 0));
	const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared);

	useEffect(() => {
		dispatch(UPDATE_SCORE({ level: level, rows: rows, score: score, stage: stage }))
	}, [rowsCleared])

	useEffect(() => {
		if (isGameStarted === true) {
			handleStartGame()
		}
	}, [isGameStarted])

	useEffect(() => {
		if (gameOver)
			setDroptime(null);
	}, [gameOver])
	useEffect(() => {
		if (isGameStarted && tetros.length <= 5) {
			socket.emit("TETROS_PLEASE")
		}
	}, [tetros.length, isGameStarted])

	useEffect(() => {
		if (isGameStarted) {
			let f = rows2add
			let tmp = new Array(10).fill(["X", "merged"]);
			for (let i = 0; i < STAGE_HEIGHT; i++)
				if (stage[i][0][0] === "X" && stage[i][0][1] === "merged") f--;

			if (f > 0) {
				while (f > 0) {
					updatePlayerPos({ x: 0, y: -1, collided: false });
					stage.push(tmp);
					stage.shift();
					f--;
				}
				dispatch(UPDATE_SCORE({ level: level, rows: rows, score: score, stage: stage }))
			}
		}
	}, [rows2add]);
	const verticalDrop = () => {
		let tmp = 0;
		for (let i = 0; i < STAGE_HEIGHT; i++) {
			if (isColliding(player, stage, { x: 0, y: i })) {
				tmp = i;
				break;
			}
		}
		for (let i = tmp; i > 0; i--) {
			if (!isColliding(player, stage, { x: 0, y: i })) {
				updatePlayerPos({ x: 0, y: i, collided: false });
				break;
			}
		}
		return
	};
	const movePlayer = (dir: number) => {
		if (!isColliding(player, stage, { x: dir, y: 0 })) {
			updatePlayerPos({ x: dir, y: 0, collided: false });
		}
	};

	const keyUp = ({ keyCode }: { keyCode: number }): void => {
		if (!gameOver) {
			// Change the droptime speed when user releases down arrow
			if (keyCode === 40) {
				setDroptime(1000 / level + 100);
			}
		}
	};

	const handleStartGame = (): void => {
		// Need to focus the window with the key events on start
		if (gameArea.current) gameArea.current.focus();
		// Reset everything
		setStage(createStage());
		setDroptime(1000);
		resetPlayer(0);
		setScore(0);
		setLevel(1);
		setRows(0);
	};

	const move = ({ keyCode, repeat }: { keyCode: number; repeat: boolean }): void => {
		if (!gameOver) {
			if (keyCode === 37) {
				movePlayer(-1);
			} else if (keyCode === 39) {
				movePlayer(1);
			} else if (keyCode === 40) {
				// Just call once
				if (repeat) return;
				setDroptime(30);
			} else if (keyCode === 38) {
				playerRotate(stage);
			} else if (keyCode === 32) {
				verticalDrop()
			}
		}
	};

	const drop = (): void => {
		// Increase level when player has cleared 10 rows
		if (rows > level + 1) {
			setLevel(prev => prev + 1);
			// Also increase speed
			setDroptime(1000 / level + 100);
		}

		if (!isColliding(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false });
		} else {
			// Game over!
			if (player.pos.y < 1) {
				setDroptime(null);
				dispatch(PLAYER_LOST())
				// dispatch(SET_GAME_OVER())
			}
			dispatch(SHIFT_TETRO())
			updatePlayerPos({ x: 0, y: 0, collided: true });
			dispatch(UPDATE_SCORE({ level: level, rows: rows, score: score, stage: stage }))
		}
	};

	useInterval(() => {
		drop();
	}, dropTime);

	return (
		<div role='button' tabIndex={0} onKeyDown={move} onKeyUp={keyUp} ref={gameArea}>
			<Stage
				stage={stage}
				STAGE_WIDTH={STAGE_WIDTH}
				STAGE_HEIGHT={STAGE_HEIGHT}
				CELL_SIZE={23} />
		</div>
	);
};

export default TetrisV2;
