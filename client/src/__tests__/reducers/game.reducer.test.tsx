import gameReducer from "../../reducers/game.reducer"

import { RootState, store } from "../../app/store"
import {
	SHIFT_TETRO, MORE_TETROS,
	SET_GAME_MODE, SET_GAME_OVER,
	SET_GAME_STARTED, SET_IN_GAME,
	SET_WINNER, RESET_GAME,
	UPDATE_GAME_MODE,
	LEAVE_GAME, UPDATE_ROOM_SIZE,
	SET_GAME_TITLE
} from "../../reducers/game.reducer"
import {
	isGameStarted, isGameOver,
	getGameMode,
	getGameTitle,
	getTetros
} from "../../reducers/game.reducer"
import { IGame } from "../../types"


const state: RootState = store.getState()

const initialState: IGame = {
	title: "",
	started: false,
	inGame: false,
	winner: undefined,
	tetros: [],
	mode: "multiplayer",
	gameOver: false,
	size: 5
};


describe("_ Game Reducer test", () => {

	it("_ set game started", () => {
		expect(
			gameReducer(initialState, SET_GAME_STARTED())
		).toEqual({ ...initialState, started: true });
	});

	it("_ set game title", () => {
		expect(
			gameReducer(initialState, SET_GAME_TITLE("arena"))
		).toEqual({ ...initialState, title: "arena", inGame: true });
	});

	it("_ set in game/game live ", () => {
		expect(
			gameReducer({ ...initialState }, SET_IN_GAME())
		).toEqual({ ...initialState, inGame: true });
	});

	it("_ set game over", () => {
		expect(
			gameReducer({ ...initialState }, SET_GAME_OVER())
		).toEqual({ ...initialState, gameOver: true });
	});

	it("_ set the winner name of the game", () => {
		expect(
			gameReducer({ ...initialState }, SET_WINNER("testWinner"))
		).toEqual({ ...initialState, winner: "testWinner" });
	});


	it("_ set game mode", () => {
		expect(
			gameReducer({ ...initialState }, SET_GAME_MODE("solo"))
		).toEqual({ ...initialState, mode: "solo" });
	});

	it("_ reset game states", () => {
		expect(
			gameReducer({ ...initialState }, RESET_GAME())
		).toEqual({ ...initialState });
	});

	it("_ leave game", () => {
		expect(
			gameReducer(initialState, LEAVE_GAME())
		).toEqual(initialState);
	});

	it("_ shift one tetro from the list", () => {
		expect(
			gameReducer({ ...initialState, tetros: ['I', 'J', 'Z'] }, SHIFT_TETRO())
		).toEqual({ ...initialState, tetros: ['J', 'Z'] });
	});
	it("_ add more tetros to the list", () => {
		expect(
			gameReducer({ ...initialState, tetros: ['I', 'J', 'Z'] }, MORE_TETROS(['S', 'Z']))
		).toEqual({ ...initialState, tetros: ['I', 'J', 'Z', 'S', 'Z'] });
	});
	it("_ update the game mode by user", () => {
		expect(
			gameReducer({ ...initialState }, UPDATE_GAME_MODE("solo"))
		).toEqual({ ...initialState, mode: "solo" });
	});

	it("_ update the game mode by user", () => {
		expect(
			gameReducer({ ...initialState, inGame: true }, UPDATE_GAME_MODE("solo"))
		).toEqual({ ...initialState, mode: "solo", inGame: true });
	});
	it("_ update room size by user", () => {
		expect(
			gameReducer({ ...initialState }, UPDATE_ROOM_SIZE(7))
		).toEqual({ ...initialState, size: 7 });
	});

	// TEST SELECTORS :)

	it("_ selectors / is started ?", () => {
		expect(
			isGameStarted(state)
		).toEqual(false);
	});

	it("_ selectors / game over before and after dispatch", () => {
		expect(
			isGameOver({ ...state })
		).toEqual(false);

		// dispatch game over action and verify again
		expect(
			isGameOver({ ...state, game: gameReducer(initialState, SET_GAME_OVER()) })
		).toEqual(true);


	});

	it("_ selectors / get game mode ", () => {
		expect(
			getGameMode(state)
		).toEqual("multiplayer");
	});

	it("_ selectors / getGameTitle", () => {
		expect(
			getGameTitle({ ...state, game: gameReducer(initialState, SET_GAME_TITLE("arena")) })
		).toEqual("arena");
	});

	it("_ selectors / getTetros", () => {
		expect(
			getTetros({ ...state, game: gameReducer({ ...initialState, tetros: ['I', 'J', 'Z'] }, MORE_TETROS(['S', 'Z'])) })
		).toEqual(['I', 'J', 'Z', 'S', 'Z']);
	});


});
