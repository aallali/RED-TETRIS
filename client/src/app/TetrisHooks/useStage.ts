import {useState, useEffect} from 'react';
import {createStage} from '../../gameHelpers';

export const useStage = (player: { tetromino: any[]; pos: { y: any; x: any; }; collided: any; }, resetPlayer: () => void) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);
    useEffect(() => {
        setRowsCleared(0);
        const sweepRows = (newStage: any[]) =>
            newStage.reduce((ack, row) => {
                if (row.findIndex((cell: number[]) => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, []);

        const updateStage = (prevStage: any[]) => {
            // First flush the stage
            const newStage = prevStage.map(row =>
                row.map((cell: string[]) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            );

            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value: number, x: any) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            // Then check if we got some score if collided
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }
            return newStage;
        };

        // Here are the updates
        setStage(prev => {
            const updatedStage = updateStage(prev)

            return updateStage(updatedStage);
        });
    }, [
        player,

    ]);

    return [stage, setStage, rowsCleared] as const;
};
