import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  width: auto;
  height:auto;
  overflow: hidden;
  outline: none;
`;

export const StyledTetris = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 0 auto;

  .display {
    display: flex;
    justify-content: space-between;
    width: 380px;
  }
`;
