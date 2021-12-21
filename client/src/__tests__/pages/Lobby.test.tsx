
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Lobby from '../../pages/lobby';
import renderer from "react-test-renderer";
import * as reactRedux from "react-redux";
// import { render, screen } from "@testing-library/react";

// import { act } from 'react-test-renderer';
// import { act } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';

// const testRooms = [{ title: "arena", size: 7, active_players: 5, mode: "multiplayer" }, { title: "arena2", size: 3, active_players: 1, mode: "multiplayer" }]

describe("_Loby PageXContainer test", () => {
	const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
	beforeEach(() => {
		useDispatchMock.mockClear();
		useDispatchMock.mockReturnValue(jest.fn());
	});


	test("_ Loby Snapshot Check", () => {
		const tree = renderer.create(<Provider store={store}>
			< Lobby />
		</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	// test("_ Loby rendering with API mocked values for two sub component (Rooms/TopRankedPlayers) check", async () => {




	// axios.get.mockResolvedValue({
	// 	data: testRooms
	// });
	// render(
	// 	< Lobby />
	// )
	// await waitFor(() => {
	// 	expect(screen.queryByText(/Red-Tetris/i)).toBeInTheDocument()
	// });
	// await act(async () => {
	// 	await axios.get.mockResolvedValue({
	// 		data: testRooms
	// 	});
	// 	render(
	// 		< Lobby />
	// 	)
	// });
	// console.log(component.debug())
	// expect(component.g).toBeInTheDocument()

	// const promise = Promise.resolve()
	// console.log(screen.debug())
	// expect(screen.queryByText(/No open room available/i)).not.toBeInTheDocument()
	// try {
	// 	await waitFor(() => {
	// 		expect(screen.queryByText(/No open room available/i)).not.toBeInTheDocument()

	// 	});
	// } catch (error) {
	// 	console.log(error)
	// }
	// });

})
