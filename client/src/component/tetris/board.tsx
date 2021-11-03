import {useState} from 'react';

import {createStage, checkCollision} from '../../helpers/gameHelpers';
import {StyledTetrisWrapper, StyledTetris} from '../styles/StyledTetris';
// Custom Hooks
import {useInterval} from '../../app/TetrisHooks/useInterval';
import {usePlayer} from '../../app/TetrisHooks/usePlayer';
import {useStage} from '../../app/TetrisHooks/useStage';
import {useGameStatus} from '../../app/TetrisHooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import {useAppDispatch} from "../../app/hooks";
import {SET_STAGE} from "../../reducers/stage.reducer";

const Tetris = () => {

    const dispatch = useAppDispatch()
    const [dropTime, setDropTime] = useState<number | null>(null)
    const [gameOver, setGameOver] = useState<boolean>(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    console.log('re-render');

    const movePlayer = (dir: number) => {
        if (!checkCollision(player, stage, {x: dir, y: 0})) {
            // @ts-ignore
            updatePlayerPos({x: dir, y: 0});
        }
    };

    const keyUp = ({keyCode}: { keyCode: number }) => {
        if (!gameOver) {
            // Activate the interval again when user releases down arrow.
            if (keyCode === 40) {
                // @ts-ignore
                setDropTime(1000 / (level + 1));
            }
        }
    };

    const startGame = () => {
        // Reset everything
        const stage = createStage()
        setStage(stage);

        setDropTime(1000);
        resetPlayer();
        setScore(0);

        setLevel(0);

        setRows(0);

        setGameOver(false);
    };

    const drop = () => {
        // Increase level when player has cleared 10 rows
        // @ts-ignore
        if (rows > (level + 1) * 10) {
            // @ts-ignore
            setLevel(prev => prev + 1);
            // Also increase speed
            // @ts-ignore
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, {x: 0, y: 1})) {
            // @ts-ignore
            updatePlayerPos({x: 0, y: 1, collided: false});
        } else {
            // @ts-ignore
            // Game over!
            if (player.pos.y < 1) {
                console.log('GAME OVER!!!');
                dispatch(SET_STAGE(stage));
                setGameOver(true);
                setDropTime(null);
            }
            // @ts-ignore
            updatePlayerPos({x: 0, y: 0, collided: true});
        }
    };

    const dropPlayer = () => {
        // We don't need to run the interval when we use the arrow down to
        // move the tetromino downwards. So deactivate it for now.
        setDropTime(null);
        drop();
    };

    // This one starts the game
    // Custom hook by Dan Abramov
    useInterval(() => {
        drop();
        dispatch(SET_STAGE(stage));
    }, dropTime);

    const move = ({keyCode}: { keyCode: number }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    };

    return (
        <StyledTetrisWrapper
            role="button"
            // @ts-ignore
            tabIndex="0"
            onKeyDown={e => move(e)}
            onKeyUp={keyUp}
        >
            <StyledTetris>
                <Stage gridSize={20} stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over"/>
                    ) : (
                      
                        <div>
                            <Display text={`Score: ${score}`}/>
                            <Display text={`rows: ${rows}`}/>
                            <Display text={`Level: ${level}`}/>
                        </div>
                    )}
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
