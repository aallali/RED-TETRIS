import { RootState, store } from "../../app/store";
import ChatReducer from "../../reducers/chat.reducer"
import { actions as chatActions, getChatMsgs } from "../../reducers/chat.reducer"

const state: RootState = store.getState()

describe("_ Chat Reducer test", () => {

	it("_ add msg / chat", () => {
		expect(
			ChatReducer({ msgs: [] }, chatActions.ADD_MSG({ from: "testUser", msg: "dumb message from testUser!" }))
		).toEqual({ "msgs": [{ "from": "testUser", "msg": "dumb message from testUser!" }] });
	});
	it("_ add msg / chat", () => {
		expect(
			ChatReducer({ msgs: [] }, chatActions.ADD_MSG({ from: "", msg: "message without user" }))
		).toEqual({ "msgs": [{ from: "", msg: "message without user" }] });
	});
	it("_ add msg / chat", () => {
		expect(
			ChatReducer({ msgs: [] }, chatActions.ADD_MSG({ from: "tesUser", msg: "message larger than 100 character ...message larger than 100 character ...message larger than 100 character ...message larger than 100 character ...message larger than 100 character ...message larger than 100 character ...message larger than 100 character ..." }))
		).toEqual({ "msgs": [] });
	});

	// Test selectors :)

	it("_ selectors / getError", () => {
		expect(
			getChatMsgs(state)
		).toEqual([{ from: "Team (automated)", msg: "Hi 👋! welcome to RED-TETRIS game, 1️⃣ first of all i wish you enjoy the game, 2️⃣ second and lets make it short, you can only write a message under 100 character,when u receive a message, the chatbox icon start an alert animation 🚩 until you open the chatbox, if you notice something to fix feel free to notify me, 3️⃣ third... play 🎮 && have fun  😄" }, { from: "Team (automated)", msg: `Regards ! Abdellah Allali (hi@allali.me)` }]);
	});
});
