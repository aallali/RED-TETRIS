import renderer, { act } from "react-test-renderer";
import Chatbox from "../../components/Chatbox"
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
			<Chatbox />
		</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("simulate ENTER button click in chatbox input ", () => {
		// const renderer = new ShallowRenderer();
		// const wrapper = mount(<Provider store={store}>
		// 	<Chatbox />
		// </Provider>)
		// // wrapper.render()
		// const instance = wrapper.instance();
		// console.log(instance.handleKeyDown({key:"Enter"}))
		// wrapper.find('[placeholder="write your message here ..."]').simulate('keypress', {key: 'Enter'})
		// wrapper.update()
		// expect(useDispatchMock).toHaveBeenCalled();
		// wrapper.find('[placeholder="write your message here ..."]').simulate('keypress', {key: 'Space'})
		// wrapper.update()

		// expect(wrapper.state('chatopen')).toEqual(true);
		// expect(wrapper.find('.fixed')).toHaveLength(1)
	});

	test('test send message chatbox', async () => {
		useDispatchMock.mockReturnValue(jest.fn());

		render(
			<Chatbox />, {
			preloadedState:
			{
				opponents: {
					players: [{
						name: "testFriend",
						lost: false,
						stage: [],
						rows: 0,
						score: 0,
						level: 0,
						admin: false
					}]
				},
				chat: { msgs: [{ from: "", msg: "this message is from me" }] }
			}
		}
		)
		jest.useFakeTimers()
		const roomInput = screen.getByPlaceholderText(/write your message here \.\.\./i);

		expect(roomInput).toBeInTheDocument()

		fireEvent.change(roomInput, { target: { value: "Hi, this is my first msg in chatbox" } });
		expect(screen.getByText(/Send/)).toBeInTheDocument()
		expect(screen.getByText(/testFriend/)).toBeInTheDocument()

		fireEvent.click(screen.getByText(/Send/));
		expect(useDispatchMock).toHaveBeenCalled();

		act(() => {
			jest.runOnlyPendingTimers();
		});

		act(() => {
			jest.runAllTimers();
		});
		jest.advanceTimersByTime(1000);

		expect(screen.getByTestId("chat-modal")).toHaveClass('show')
		expect(screen.getByTestId("show-chat")).toHaveClass('hidden')
		expect(screen.getByTestId("chat-services")).toHaveClass('expand')

		act(() => {
			fireEvent.click(screen.getByTestId("closeModal"))
		});

		jest.advanceTimersByTime(1000);
		expect(screen.getByTestId("chat-modal")).not.toHaveClass('show')
		expect(screen.getByTestId("show-chat")).not.toHaveClass('hidden')
		expect(screen.getByTestId("chat-services")).not.toHaveClass('expand')

		act(() => {
			fireEvent.click(screen.getByTestId("show-chat"))
		});

		jest.advanceTimersByTime(1000);
		expect(screen.getByTestId("chat-modal")).toHaveClass('show')
		expect(screen.getByTestId("show-chat")).toHaveClass('hidden')
		expect(screen.getByTestId("chat-services")).toHaveClass('expand')
	})
})

