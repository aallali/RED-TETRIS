import renderer from "react-test-renderer";
import CreateRoom from "../../components/CreateRoom"
import { Provider } from 'react-redux';
import * as reactRedux from "react-redux";
import { render, fireEvent, screen } from '../../test-utils'
import { store } from "../../app/store"
// so we can import fireEvent and screen here as well

jest.setTimeout(10 * 1000)

describe("_ ChatBox Component test", () => {
	const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
	beforeEach(() => {
		useDispatchMock.mockClear();
	});

	test("test chatbox rendering ", () => {
		const tree = renderer.create(<Provider store={store}>
			<CreateRoom />
		</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('test send message chatbox', async () => {
		useDispatchMock.mockReturnValue(jest.fn());

		render(
			<CreateRoom />,
			{ game: { mode: "solo" } }
		)

		const checkbox = screen.getByTestId("toggle")
		const createRoomInput = screen.getByPlaceholderText("room name...")

		fireEvent.change(createRoomInput, { target: { value: "" } });
		fireEvent.click(screen.getByText(/CREATE/i));
		expect(screen.getByText(/alphabetic\/numbers only/)).toBeInTheDocument()

		fireEvent.change(createRoomInput, { target: { value: "arena" } });
		fireEvent.click(screen.getByText(/CREATE/i));
		expect(useDispatchMock).toHaveBeenCalled();

		// fireEvent.change(checkbox, { target: { checked: true, value: "multiplayer" } });
		fireEvent.click(checkbox);
		expect(screen.getByText(/multiplayer/i)).toBeInTheDocument()

		render(
			<CreateRoom />,
			{
				preloadedState:
				{
					game: { mode: "solo" }
				}
			}
		)

		// fireEvent.change(checkbox, { target: { checked: false, value: "solo" } });
		fireEvent.click(checkbox);
		expect(screen.getByText(/solo/i)).toBeInTheDocument()
		// fireEvent.change(checkbox, { target: { checked: true } });

	})
})