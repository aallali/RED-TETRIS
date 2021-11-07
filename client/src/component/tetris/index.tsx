import React from 'react';
import { createStage, isColliding } from '../../helpers/gameHelpers';

// Custom hooks
import { useInterval } from '../../app/TetrisHooks/useInterval';
import { usePlayer } from '../../app/TetrisHooks/usePlayer';
import { useStage } from '../../app/TetrisHooks/useStage';
import { useGameStatus } from '../../app/TetrisHooks/useGameStatus';
import {socket} from "../../app/hooks"
// Components
import Stage from './Stage/Stage';
import Display from './Display/Display';
import StartButton from './StartButton/StartButton';
import { STAGE_HEIGHT } from '../../helpers/tetrominos';

// Styles
import { StyledTetrisWrapper, StyledTetris } from './tetris.styles'
import { SET_STAGE } from '../../reducers/stage.reducer';
import { useAppDispatch } from '../../app/hooks';

const Tetris: React.FC = () => {
	const dispatch = useAppDispatch()
	const [dropTime, setDroptime] = React.useState<null | number>(null);
	const [gameOver, setGameOver] = React.useState(true);
	const gameArea = React.useRef<HTMLDivElement>(null);

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
				console.log('Game over!');
				setGameOver(true);
				setDroptime(null);
			} else
				setDroptime(1000 / level + 200);
			updatePlayerPos({ x: 0, y: 0, collided: true });

		}
	};

	useInterval(() => {

		drop();
		// dispatch(SET_STAGE(stage))
	
		socket.emit("stage", JSON.stringify(stage))
	}, dropTime);

	return (
		<StyledTetrisWrapper role='button' tabIndex={0} onKeyDown={move} onKeyUp={keyUp} ref={gameArea}>
			<StyledTetris>



				<div className="bg-gray-600  flex justify-center items-center">

					<div className="w-full lg:w-1/12 order-1 lg:order-last flex flex-col flex-1 justify-start">

						{/*START OF RANKING*/}
						<div className="w-full mx-auto">
							<div className="flex flex-row sm:flex-row gap-0">
								<Stage stage={stage} CELL_SIZE={26} />

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

								</div>
							</div>
						</div>
						{/*END OF RANKING*/}

					</div>
				</div>

			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;

