
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import renderer from "react-test-renderer";
import * as reactRedux from "react-redux";
import { render } from '../../test-utils'

import Playboard from '../../pages/playboard';
// import { act } from 'react-test-renderer';
// import { act } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';

// jest.mock('axios')

Object.defineProperty(global.window.HTMLMediaElement.prototype, 'play', {
	configurable: true,
	// Define the property getter
	get() {
		setTimeout(() => (this.onloadeddata && this.onloadeddata()))
		return () => { }
	}
})

describe("_ TetrisV2 Testing ...", () => {
	const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
	beforeEach(() => {
		useDispatchMock.mockClear();
		useDispatchMock.mockReturnValue(jest.fn());
	});

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
