import React from 'react';
import { StyledStage } from '../styles/StyledStage';

import Cell from './Cell';

const Stage = ({ stage, gridSize }:any) => (
    <StyledStage gridSize={gridSize} width={stage[0].length} height={stage.length}>
        {stage.map((row: any[][]) => row.map((cell:any[], x: any) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
);

export default Stage;
