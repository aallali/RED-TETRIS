import styled from 'styled-components';



export const StyledStage = styled.div<any>`
  display: grid;
  grid-template-rows: repeat(
          ${props => props.height},
          calc(${props => props.gridSize + "vw"}/ ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 0px;
  border: 2px solid black;
  border-radius: 5px;
  width: 100%;
  max-width: ${props => props.gridSize + "vw"};
  background: black;
`;
