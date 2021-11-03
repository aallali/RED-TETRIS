import React from 'react';
import { StyledDisplay } from '../styles/StyledDisplay';

const Display = ({ gameOver, text }:any) => (
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
)

export default Display;
