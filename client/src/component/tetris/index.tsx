/* eslint-disable react-hooks/exhaustive-deps */
import React, { ComponentProps, useEffect, useState } from 'react';
import { createStage, isColliding } from '../../helpers/gameHelpers';
// Custom hooks
import { useInterval } from '../../app/TetrisHooks/useInterval';
import { usePlayer } from '../../app/TetrisHooks/usePlayer';
import { useStage } from '../../app/TetrisHooks/useStage';
import { useGameStatus } from '../../app/TetrisHooks/useGameStatus';
// Components
import Stage from './Stage/Stage';
// Configs
import { STAGE_HEIGHT, STAGE_WIDTH } from '../../helpers/tetrominos';
// Reducers
import { getRows2Add } from "../../reducers/player.reducer"
import { isGameStarted as isGameStartedS, isGameOver as isGameOverS, getTetros, SHIFT_TETRO } from "../../reducers/game.reducer"
// Styles
import { StyledTetrisWrapper } from './tetris.styles'
import { socket, useAppDispatch, useAppSelector } from '../../app/hooks';
// Actions
import { PLAYER_LOST, BROADCAST_SCORE } from "../../actions"
import { TETROMINOS } from '../../helpers/tetrominos';
// Audio assets
import gameOverMp3 from "../../assets/game-over-sound-effect.mp3"
import youLoseMp3 from "../../assets/you-lose-sound-effect.mp3"

const Tetris: React.FC = (props: ComponentProps<any>) => {
	console.log("_TETRIS")
	const dispatch = useAppDispatch()
	// Selectors
	const isGameOver = useAppSelector<boolean>(isGameOverS)
	const isGameStarted = useAppSelector(isGameStartedS)
	const tetros = useAppSelector(getTetros)
	const rows2add = useAppSelector(getRows2Add)

	// Staters [costum , default]
	const [audio_game_over] = useState(new Audio(gameOverMp3));
	const [audio_you_lose] = useState(new Audio(youLoseMp3));
	const [dropTime, setDroptime] = React.useState<null | number>(null);
	const gameArea = React.useRef<HTMLDivElement>(null);

	const { player, updatePlayerPos, resetPlayer, playerRotate, setPlayer } = usePlayer();
	const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
	const { setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared, stage);
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
				dispatch(BROADCAST_SCORE(stage))

			}




		}
	}, [rows2add]);
	// useEffect(() => {
	// 	dispatch(BROADCAST_SCORE(stage))
	// }, [rows])
	const movePlayer = (dir: number) => {
		if (!isColliding(player, stage, { x: dir, y: 0 })) {
			updatePlayerPos({ x: dir, y: 0, collided: false });
		}
	};

	const keyUp = ({ keyCode }: { keyCode: number }): void => {
		if (!isGameOver) {
			// Change the droptime speed when user releases down arrow
			if (keyCode === 40) {
				setDroptime(1000 / level + 200);
			}
		}
	};

	useEffect(() => {
		if (isGameOver)
			setDroptime(null);
	}, [isGameOver])

	useEffect(() => {
		if (isGameStarted && tetros.length <= 5) {
			socket.emit("TETROS_PLEASE")
		}
	}, [tetros.length, isGameStarted])

	useEffect(() => {
		if (isGameStarted === true) {
			handleStartGame()
		}
	}, [isGameStarted])
	const handleStartGame = (): void => {

		// Need to focus the window with the key events on start
		if (gameArea.current) gameArea.current.focus();
		// Reset everything
		setPlayer({
			pos: {
				x: 0,
				y: 0,
			},
			tetromino: TETROMINOS[0].shape,
			collided: true,
		})
		setStage(createStage());
		setDroptime(1000);
		resetPlayer();
		setScore(0);
		setLevel(1);
		setRows(0);
		return
	};

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
	const move = ({ keyCode, repeat }: { keyCode: number; repeat: boolean }): void => {
		if (!isGameOver) {
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
		return
	};

	const drop = (): void => {

		// Increase level when player has cleared 5 rows
		if (rows > level * 2) {
			setLevel(prev => prev + 1);
			// Also increase speed
			setDroptime(1000 / level + 1000);
		}

		if (!isColliding(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false });

		} else {
			// dispatch(BROADCAST_SCORE(stage))
			// Game over!
			if (player.pos.y < 1) {
				socket.emit("PLAYER_LOST", "this asshole lost")
				setDroptime(null);
				dispatch(PLAYER_LOST())
				audio_game_over.play()
				audio_you_lose.play()
			} else {
				setDroptime(1000 / level + 200);
			}

			dispatch(SHIFT_TETRO())
			updatePlayerPos({ x: 0, y: 0, collided: true });

			dispatch(BROADCAST_SCORE(stage))

		}

		return
	};
	useInterval(() => {
		drop();
	}, dropTime);

	return (
		<StyledTetrisWrapper role='button' tabIndex={0} onKeyDown={move} onKeyUp={keyUp} ref={gameArea}>
			<Stage
				stage={stage}
				STAGE_WIDTH={STAGE_WIDTH}
				STAGE_HEIGHT={STAGE_HEIGHT}
				CELL_SIZE={24} />
		</StyledTetrisWrapper>
	);
};

export default Tetris;

