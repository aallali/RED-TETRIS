import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface Ichat {
	from: string
	msg: string

}
const initialState: { msgs: Ichat[] } = {
	msgs: [{ from: "Team (automated)", msg: "Hi 👋! welcome to RED-TETRIS game, 1️⃣ first of all i wish you enjoy the game, 2️⃣ second and lets make it short, you can only write a message under 100 character,when u receive a message, the chatbox icon start an alert animation 🚩 until you open the chatbox, if you notice something to fix feel free to notify me, 3️⃣ third... play 🎮 && have fun  😄" }, { from: "Team (automated)", msg: `Regards ! Abdellah Allali (hi@allali.me)` }]};

export const playerSlice = createSlice({
	name: 'Chat',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		ADD_MSG: (state, action: PayloadAction<{ from: string, msg: string }>) => {
			state.msgs = [...state.msgs, action.payload]
		}
	}
});

export const {
	ADD_MSG
} = playerSlice.actions;

export const getChatMsgs = (state: RootState) => state.chat.msgs;

export default playerSlice.reducer;
