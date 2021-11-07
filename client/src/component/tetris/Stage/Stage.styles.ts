import styled from 'styled-components';
import { STAGE_WIDTH, STAGE_HEIGHT } from '../../../helpers/tetrominos';

type Props = {
	CELL_SIZE: number;
  };

export const StyledStage = styled.div<Props>`
  display: grid;
  grid-template-columns: repeat(${STAGE_WIDTH}, ${props => props.CELL_SIZE}px);
  grid-template-rows: repeat(${STAGE_HEIGHT},  ${props => props.CELL_SIZE}px);
  grid-gap: 1px;
  border: 1px solid #777;
  background: #222;
`;
