import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

export interface IStage {
    stage:any
}

const initialState: IStage = {
    stage: null
};

export const stageSlice = createSlice({
    name: 'Stage',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        SET_STAGE:(state, action) => {
            state.stage = action.payload
        }
    }
});

export const {SET_STAGE} = stageSlice.actions;
export const getStage = (state: RootState) => state.stage.stage;
export default stageSlice.reducer;
