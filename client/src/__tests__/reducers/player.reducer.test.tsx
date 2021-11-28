import { RootState, store } from "../../app/store";
import playerReducer from "../../reducers/player.reducer"

import {
	SET_PLAYER,
	SET_GAME,
	LOGOUT_PLAYER,
	UPDATE_SCORE,
	SET_PLAYER_ADMIN,
	ADD_ROW,
	PLAYER_LOST,
	RESET_STATES,
	BROADCAST_SCORE,
	UNSET_PLAYER_ADMIN
} from "../../reducers/player.reducer"

import {
	getPlayer, getPlayerNickname,
	getRows2Add, getPlayerScore,
	isLost, isAdmin
} from "../../reducers/player.reducer"

const state: RootState = store.getState()

const initialState = {
	nickname: "",
	rows: 0,
	level: 0,
	score: 0,
	lost: false,
	isAdmin: false,
	rows2add: 0,
	stage: [],
	highestLevel: 0
};

describe("_ Player Reducer test", () => {

	it("_ set player name", () => {
		expect(
			playerReducer(initialState, SET_PLAYER({ name: "testUser" }))
		).toEqual({ ...initialState, nickname: "testUser" });
	});

	it("_ set player name", () => {
		expect(
			playerReducer({ ...initialState, nickname: "testUser" }, SET_PLAYER({ name: "testUser" }))
		).toEqual({ ...initialState, nickname: "testUser" });
	});
	it("_ set player lost", () => {
		expect(
			playerReducer(initialState, PLAYER_LOST())
		).toEqual({ ...initialState, lost: true });
	});

	it("_ set game for player", () => {
		expect(
			playerReducer({ ...initialState, score: 1337, level: 123, rows: 99 }, SET_GAME({ room: "arena" }))
		).toEqual(initialState);
	});

	it("_ logout player", () => {
		expect(
			playerReducer({ ...initialState, score: 1337, level: 123, rows: 99, isAdmin: true, nickname: "7wli" }, LOGOUT_PLAYER())
		).toEqual(initialState);
	});

	it("_ update score", () => {
		expect(
			playerReducer(initialState, UPDATE_SCORE({ rows: 5, level: 3, score: 1245, stage: [] }))
		).toEqual({ ...initialState, rows: 5, level: 3, score: 1245, highestLevel: 3 });
	});

	it("_ update score", () => {
		expect(
			playerReducer({ ...initialState, highestLevel: 10 }, UPDATE_SCORE({ rows: 5, level: 3, score: 1245, stage: [] }))
		).toEqual({ ...initialState, rows: 5, level: 3, score: 1245, highestLevel: 10 });
	});

	it("_ add rows to bottom of the stage", () => {
		expect(
			playerReducer({ ...initialState, rows2add: 3 }, ADD_ROW(1))
		).toEqual({ ...initialState, rows2add: 4 });
	});

	it("_ set player admin", () => {
		expect(
			playerReducer({ ...initialState, isAdmin: false }, SET_PLAYER_ADMIN())
		).toEqual({ ...initialState, isAdmin: true });
	});

	it("_ set player admin", () => {
		expect(
			playerReducer({ ...initialState, isAdmin: true }, SET_PLAYER_ADMIN())
		).toEqual({ ...initialState, isAdmin: true });
	});

	it("_ unset player admin", () => {
		expect(
			playerReducer({ ...initialState, isAdmin: true }, UNSET_PLAYER_ADMIN())
		).toEqual({ ...initialState, isAdmin: false });
	});
	it("_ unset player admin", () => {
		expect(
			playerReducer({ ...initialState, isAdmin: false }, UNSET_PLAYER_ADMIN())
		).toEqual({ ...initialState, isAdmin: false });
	});
	it("_ reset states for player", () => {
		expect(
			playerReducer({ ...initialState, score: 1337, level: 123, rows: 99, isAdmin: true, nickname: "7wli" }, RESET_STATES())
		).toEqual({ ...initialState, isAdmin: true, nickname: "7wli" });
	});

	it("_ broadcast score of player to other players in room joined", () => {
		expect(
			playerReducer(initialState, BROADCAST_SCORE([]))
		).toEqual(initialState);
	});



	// Test Selectors :)
	it("_ selectors / getPlayer", () => {
		expect(
			getPlayer({ ...state, player: playerReducer(initialState, SET_PLAYER({ name: "testUser" })) })
		).toEqual({ ...initialState, nickname: "testUser" });
	});

	it("_ selectors / getPlayerNickname", () => {
		expect(
			getPlayerNickname(state)
		).toEqual("");
	});

	it("_ selectors / getRows2Add", () => {
		expect(
			getRows2Add(state)
		).toEqual(0);
	});

	it("_ selectors / getPlayerScore", () => {
		expect(
			getPlayerScore(state)
		).toEqual({ level: 0, rows: 0, score: 0 });
	});

	it("_ selectors / isAdmin", () => {
		expect(
			isAdmin(state)
		).toEqual(false);
	});

	it("_ selectors / isLost", () => {
		expect(
			isLost(state)
		).toEqual(false);
	});
});
