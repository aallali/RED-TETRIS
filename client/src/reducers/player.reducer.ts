import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

export interface IPlayer {
    nickname: string
}

const initialState: IPlayer = {
    nickname: localStorage.getItem("nickname") || ""
};

export const playerSlice = createSlice({
    name: 'Player',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        SET_PLAYER: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload
            localStorage.setItem("nickname", state.nickname)
        },
        GET_PLAYER: (state, action: PayloadAction<string>) => {
            const nickn:string = localStorage.getItem("nickname") || ""
            if (nickn)
                state.nickname = nickn
        },
        LOGOUT_PLAYER: (state) => {
			localStorage.removeItem("nickname")
            state.nickname = ""
        },
        JOIN_ROOM: (state, action:PayloadAction<string>) => {

        }
    }
});

export const {SET_PLAYER, GET_PLAYER, LOGOUT_PLAYER} = playerSlice.actions;
export const getPlayer = (state: RootState) => state.player;
export default playerSlice.reducer;
