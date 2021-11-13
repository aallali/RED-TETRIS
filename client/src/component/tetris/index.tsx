import React, { ComponentProps, useEffect } from 'react';
import { createStage, isColliding } from '../../helpers/gameHelpers';

// Custom hooks
import { useInterval } from '../../app/TetrisHooks/useInterval';
import { usePlayer } from '../../app/TetrisHooks/usePlayer';
import { useStage } from '../../app/TetrisHooks/useStage';
import { useGameStatus } from '../../app/TetrisHooks/useGameStatus';
// Components
import Stage from './Stage/Stage';
import Display from './Display/Display';
import StartButton from './StartButton/StartButton';
import { STAGE_HEIGHT } from '../../helpers/tetrominos';
import { getGameStartStatus } from "../../reducers/player.reducer"
// Styles
import { StyledTetrisWrapper, StyledTetris } from './tetris.styles'
import { socket, useAppSelector } from '../../app/hooks';

const Tetris: React.FC = (props: ComponentProps<any>) => {
	const [dropTime, setDroptime] = React.useState<null | number>(null);
	const [gameOver, setGameOver] = React.useState(true);
	const gameArea = React.useRef<HTMLDivElement>(null);
	const isGameStarted = useAppSelector(getGameStartStatus)
	const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
	const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
	const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared);
	// useEffect(() => {
	// 	let f = 1
	// 	let tmp = new Array(10).fill(["X", "merged"]);
	// 	for (let i = 0; i < STAGE_HEIGHT; i++) if (stage[i][0] === ["X", "merged"]) f++;
	// 	while (f > 0) {
	// 	  stage.push(tmp);
	// 	  stage.shift();
	// 	  f--;
	// 	}

	//   }, [xrow]);

	const movePlayer = (dir: number) => {
		if (!isColliding(player, stage, { x: dir, y: 0 })) {
			updatePlayerPos({ x: dir, y: 0, collided: false });
		}

	};

	const keyUp = ({ keyCode }: { keyCode: number }): void => {
		if (!gameOver) {
			// Change the droptime speed when user releases down arrow
			if (keyCode === 40) {
				setDroptime(1000 / level + 200);
			}
		}
	};
	useEffect(() => {

		if (isGameStarted) {
			console.log("===> handle start game ")
			handleStartGame()
		}
	}, [isGameStarted])
	const handleStartGame = (): void => {

		// Need to focus the window with the key events on start
		if (gameArea.current) gameArea.current.focus();
		// Reset everything
		setStage(createStage());
		setDroptime(1000);
		resetPlayer();
		setScore(0);
		setLevel(1);
		setRows(0);
		setGameOver(false);
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
		return
	};

	const drop = (): void => {
		// Increase level when player has cleared 10 rows
		if (rows > level * 10) {
			setLevel(prev => prev + 1);
			// Also increase speed
			setDroptime(1000 / level + 200);
		}

		if (!isColliding(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false });

		} else {
			// Game over!
			if (player.pos.y < 1) {
				socket.emit("PLAYER_LOST", "this asshole lost")
				setGameOver(true);
				setDroptime(null);
			} else {
				setDroptime(1000 / level + 200);
			}
			updatePlayerPos({ x: 0, y: 0, collided: true });
			socket.emit("PLAYER_STAGE", { score: score, rows: rows, level: level, stage: stage })


		}
		return
	};

	useInterval(() => {
		drop();
	}, dropTime);

	return (
		<StyledTetrisWrapper role='button' tabIndex={0} onKeyDown={move} onKeyUp={keyUp} ref={gameArea}>

			{/*START OF RANKING*/}

			<Stage

				stage={stage}
				STAGE_WIDTH={10}
				STAGE_HEIGHT={20}
				CELL_SIZE={24} />


			{/* 


								<div className="sm:w-1/4 p-0">

									{gameOver ? (
										<>
											<Display gameOver={gameOver} text='Game Over!' />
											<StartButton callback={handleStartGame} />
										</>
									) : (
										<>
											<Display text={`Score: ${score}`} />
											<Display text={`Rows: ${rows}`} />
											<Display text={`Level: ${level}`} />
										</>
									)}

								</div> */}

			{/*END OF RANKING*/}



		</StyledTetrisWrapper>
	);
};

export default Tetris;

