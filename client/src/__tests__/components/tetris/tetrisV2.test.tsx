
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import TetrisV2 from '../../../components/TetrisV2';
import renderer from "react-test-renderer";
import * as reactRedux from "react-redux";
import { render, screen } from '../../../test-utils'
import { fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from "msw";
import { setupServer } from "msw/node";
import { mount } from 'enzyme';
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

	test("__TetrisV2 snapshot test", () => {
		const tree = renderer.create(<Provider store={store}>
			< TetrisV2 />
		</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("__TetrisV2 invoke states value", () => {
		render(<TetrisV2 />, {
			preloadedState:
			{
				player: { nickname: "aallali", rows2add: 3 },
				game: { started: true, title: "arena", tetros: ['Z', 'T', 'L', 'O'] }
			}
		})
	});

	test("__TetrisV2 invoke states value", () => {
		render(<TetrisV2 />, {
			preloadedState:
			{
				player: { nickname: "aallali", rows2add: 3 },
				game: { started: false, title: "arena", tetros: ['Z', 'T', 'L', 'O'] }
			}
		})
	});

	test("__TetrisV2 invoke states value", () => {
		render(<TetrisV2 />, {
			preloadedState:
			{
				player: { nickname: "aallali", rows2add: 3 },
				game: { started: false, gameOver: true, title: "arena", tetros: ['Z', 'T', 'L', 'O'] }
			}
		})
	});
})
