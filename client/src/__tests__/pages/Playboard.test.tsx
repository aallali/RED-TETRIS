
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import renderer from "react-test-renderer";
import * as reactRedux from "react-redux";
import { render } from '../../test-utils'
import { rest } from "msw";
import { setupServer } from "msw/node";
import Playboard from '../../pages/playboard';
// import { act } from 'react-test-renderer';
// import { act } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';

const server = setupServer(
	rest.get("http://localhost:4242/rooms", (_, res, ctx) => {
		return res(ctx.status(200), ctx.json([{ title: "arena", size: 7, active_players: 5, mode: "multiplayer" }]))
	}),
	rest.get("http://localhost:4242/top", (_, res, ctx) => {
		return res(ctx.status(200), ctx.json(`allali,67\nbot2,30\nbotUsername3,27`))
	})
);

// jest.mock('axios')


describe("_ TetrisV2 Testing ...", () => {
	const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
	beforeEach(() => {
		useDispatchMock.mockClear();
		useDispatchMock.mockReturnValue(jest.fn());
	});
	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	test("__Playboard  snapshot test", () => {
		const tree = renderer.create(<Provider store={store}>
			< Playboard />
		</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("__Playboard  invoke states value", () => {
		render(<Playboard />, {
			preloadedState:
			{
				player: { nickname: "aallali", lost: true },
				game: { gameOver: true, title: "arena", tetros: ['Z', 'T', 'L', 'O'] }
			}
		})
	});

})
