import { RootState, store } from "../../app/store";
import errorReducer from "../../reducers/error.reducer"
import { SET_ERROR, CLEAR_ERROR, getError } from "../../reducers/error.reducer"
import { IError } from "../../types";

const state: RootState = store.getState()

const initialState: IError = {
	title: "",
	message: "",
}

describe("_ Error Reducer test", () => {

	it("_ set error message", () => {
		expect(
			errorReducer(initialState, SET_ERROR({ title: "join room", message: "room is full!" }))
		).toEqual({ title: "join room", message: "room is full!" });
	});

	it("_ set error message", () => {
		expect(
			errorReducer({ title: "join room", message: "room is full!", secondaryMessage: "in case not empty" }, CLEAR_ERROR())
		).toEqual({ ...initialState, secondaryMessage: "" });
	});

	// Test selectors :)

	it("_ selectors / getError", () => {
		expect(
			getError({ ...state })
		).toEqual({ title: "", message: "" });
	});

});
