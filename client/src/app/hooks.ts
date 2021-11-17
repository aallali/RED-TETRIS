import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useGameStatus } from "./TetrisHooks/useGameStatus"
import { useInterval } from "./TetrisHooks/useInterval"
import { usePlayer } from "./TetrisHooks/usePlayer"
import { useStage } from "./TetrisHooks/useStage"


import io from "socket.io-client";

export const socket = io(`${process.env.REACT_APP_SOCKET_URL || process.env.REACT_APP_API_URL}`);
console.log("[SOCKET] connected")
export { useGameStatus, usePlayer, useInterval, useStage }
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
