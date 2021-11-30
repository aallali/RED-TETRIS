
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import * as reactRedux from "react-redux";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { aallaliStore, render, screen } from '../test-utils'
import { rest } from "msw";
import { setupServer } from "msw/node";
// const axios = require('axios');



const server = setupServer(
	// rest.get("http://localhost:4242/rooms", (_, res, ctx) => {
	// 	return res(ctx.status(200),ctx.json([]))
	// }),
	// rest.get("http://localhost:4242/top", (_, res, ctx) => {
	// 	return res(ctx.status(200), ctx.json({ data: `allali,67\nbot2,30\nbotUsername3,27` }))
	// })
);



// jest.mock('axios')

describe("_App Component test", () => {
	const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
	beforeEach(() => {
		useDispatchMock.mockClear();
		useDispatchMock.mockReturnValue(jest.fn());

	});
	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	test('_ welcome message / app', () => {
		const { getByText } = render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		expect(getByText(/Welcome to DarkTetris/i)).toBeInTheDocument();
	});

	test('_ error message exists / app', () => {
		render(<App />, {
			preloadedState:
			{
				error: { title: "error", message: "error text here..." }
			}
		})
		expect(screen.queryByText("error")).toBeInTheDocument()
		expect(screen.queryByText("error text here...")).toBeInTheDocument()
	});

	test("_ player ingame case / app", () => {
		const costumStore = aallaliStore(
			{
				game: { title: "zribaK7la", tetros: ['L', 'Z', 'O', 'T'] },
				player: { nickname: "l7wli" }
			}
		)
		const tree = renderer.create(<Provider store={costumStore}>
			<App />
		</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});


	// test("_ player exists but not ingmae case / app", () => {
	// 	act(() => {
	// 		render(<App />, {
	// 			preloadedState:
	// 			{
	// 				player: { nickname: "l7wli" }
	// 			}
	// 		})
	// 	})

	// 	expect(screen.queryByText("No open room available ... create yours now!")).toBeInTheDocument()
	// });
	test('_ invalid Hash Query / app', () => {
		window.location.hash = "roomY"
		render(
			<App />)
		expect(screen.queryByText("Invalid Hash Query"))
		expect(window.location.hash).toEqual("#roomY");
	});

	test('_ valid Hash Query / app', () => {
		window.location.hash = "#arena[allali]"
		render(<App />)
		// expect(screen.queryByText("Invalid Hash Query"))
		expect(window.location.hash).toEqual("#arena[allali]");
	});

	// test('_ valid Hash Query with name already set / app', () => {
	// 	window.location.hash = "#arena[allali]"
	// 	render(<App />, {
	// 		preloadedState:
	// 			{ player: { nickname: "karen" } }
	// 	})
	// 	expect(screen.queryByText("karen")).toBeInTheDocument()
	// });


	// test('_ invalid hash query / app', () => {
	// 	// Object.defineProperty(window.location, 'hash', {
	// 	// 	writable: true,
	// 	// 	value: '#arena[allali]'
	// 	// });
	// 	Object.defineProperty(window, 'location', {
	// 		value: {
	// 			hash: "http://localhost/#arena[allali]"
	// 		}
	// 	})

	// 	Object.defineProperty(window, 'hash', {
	// 		value: {
	// 			hash: "#arena[allali]"
	// 		}
	// 	})
	// 	console.log(window.location.hash)
	// 	render(
	// 		<App />)
	// 	console.log("=============>", window.location.hash, window.location.href)

	// 	console.log(screen.debug())

	// 	// expect(screen.queryByText("Invalid Hash Query"))
	// });
})
