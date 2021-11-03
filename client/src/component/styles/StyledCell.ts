import styled from 'styled-components';

export const StyledCell = styled.div<any>`
  width: auto;
  background: rgba(${props => props.color},0.8);
  border-radius: 1px;
  border: ${props => (props.type === 0 ? '1px solid' : '4px solid')};
  border-bottom-color: rgba(${props => props.color}, 0.1);
  border-right-color: rgba(${props => props.color}, 1);
  border-top-color: rgba(${props => props.color}, 1);
  border-left-color: rgba(${props => props.color}, 0.3);
`;
