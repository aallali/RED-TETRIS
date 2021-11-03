import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import playerReducer from "../reducers/player.reducer";
import stageReducer from "../reducers/stage.reducer"
export const store = configureStore({
  reducer: {
    player: playerReducer,
    stage: stageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
