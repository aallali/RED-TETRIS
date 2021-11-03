
import React from 'react';
import { StyledCell } from '../styles/StyledCell';
import { TETROMINOS } from '../../helpers/tetrominos';

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type }:{type:string}) => (
    <StyledCell type={type} color={TETROMINOS[type].color}>
        {/*{console.log('rerender cell')}*/}
    </StyledCell>
);

export default React.memo(Cell);
