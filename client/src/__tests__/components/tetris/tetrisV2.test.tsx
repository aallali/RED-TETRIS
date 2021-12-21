
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import TetrisV2 from '../../../components/TetrisV2';
import renderer from "react-test-renderer";
import * as reactRedux from "react-redux";
import { render } from '../../../test-utils'
// import { act } from 'react-test-renderer';
// import { act } from '@testing-library/react';

describe("_ TetrisV2 Testing ...", () => {
	const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
	beforeEach(() => {
		useDispatchMock.mockClear();
		useDispatchMock.mockReturnValue(jest.fn());
	});


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
