import styled from 'styled-components';

type Props = {
	CELL_SIZE: number;
	STAGE_WIDTH: number;
	STAGE_HEIGHT: number;
};

export const StyledStage = styled.div<Props>`
  display: grid;
  grid-template-columns: repeat(${props => props.STAGE_WIDTH}, ${props => props.CELL_SIZE}px);
  grid-template-rows: repeat(${props => props.STAGE_HEIGHT},  ${props => props.CELL_SIZE}px);
  grid-gap: 1px;
  border: 1px solid #777;
  background: #222;
`;
