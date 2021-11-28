import { RootState, store } from "../../app/store";
import opponentReducer from "../../reducers/opponent.reducer"
import { UPDATE_PLAYERS, CLEAR_OPPONENTS, getOpponents } from "../../reducers/opponent.reducer"
import { IOpponents } from "../../types";

const state: RootState = store.getState()

const initialState: IOpponents = {
	players: []
};

describe("_ Error Reducer test", () => {

	it("_ set empty opponents array", () => {
		expect(
			opponentReducer(initialState, UPDATE_PLAYERS({ players: [] }))
		).toEqual({ players: [] });
	});

	it("_ set full oppponents array", () => {
		expect(
			opponentReducer(initialState, UPDATE_PLAYERS({
				players: [{
					name: "botOpponent",
					lost: false,
					rows: 0,
					score: 0,
					level: 0,
				}], admin: { name: "allali" }
			}))
		).toEqual({
			players: [{
				name: "botOpponent",
				stage: [],
				lost: false,
				rows: 0,
				score: 0,
				level: 0,
				admin: false
			}]
		});
	});
	it("_ set full oppponents array with admin true", () => {
		expect(
			opponentReducer(initialState, UPDATE_PLAYERS({
				players: [{
					name: "botOpponent",
					stage: [['L', 'merged']],
					lost: false,
					rows: 0,
					score: 0,
					level: 0,
				}], admin: { name: "botOpponent" }
			}))
		).toEqual({
			players: [{

				name: "botOpponent",
				stage: [['L', 'merged']],
				lost: false,
				rows: 0,
				score: 0,
				level: 0,
				admin: true

			}]
		});
	});
	it("_ clear opponents array", () => {
		expect(
			opponentReducer(initialState, CLEAR_OPPONENTS())
		).toEqual({ players: [] });
	});

	// Test selectors :)

	it("_ selectors / getOpponents", () => {
		expect(
			getOpponents({ ...state })
		).toEqual([]);
	});

});
