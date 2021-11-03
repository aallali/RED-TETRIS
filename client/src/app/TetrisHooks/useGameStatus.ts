import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared: number) => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);
	const [linePoints]= useState([40, 100, 300, 1200]);


    const calcScore = useCallback(() => {
		
        // We have score
        if (rowsCleared > 0) {
            // This is how original Tetris score is calculated
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRows(prev => prev + rowsCleared);
        }
    }, [level, linePoints, rowsCleared]);

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);

// Use throughout your app instead of plain `useDispatch` and `useSelector`

    return [score, setScore, rows, setRows, level, setLevel] as const;
};
