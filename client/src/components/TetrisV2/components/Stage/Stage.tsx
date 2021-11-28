import React from 'react';
import Cell from '../Cell/Cell';
import { StyledStage } from './Stage.styles';
import { TETROMINOS } from '../../../../helpers/tetrominos'

export type STAGECELL = [keyof typeof TETROMINOS, string];
export type STAGE = STAGECELL[][];

type Props = {
	stage: STAGE;
	CELL_SIZE: number;
	STAGE_WIDTH: number;
	STAGE_HEIGHT: number;
}

const Stage: React.FC<Props> = ({ stage, CELL_SIZE, STAGE_WIDTH, STAGE_HEIGHT }) => {
	return (
		<StyledStage
			CELL_SIZE={CELL_SIZE}
			STAGE_WIDTH={STAGE_WIDTH}
			STAGE_HEIGHT={STAGE_HEIGHT}>
			{stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
		</StyledStage>
	)
}

export default Stage;