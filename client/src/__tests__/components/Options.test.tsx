import renderer from "react-test-renderer";
import Options from "../../components/Options"
import { Provider } from 'react-redux';

import { aallaliStore, render, screen } from '../../test-utils'
import { fireEvent } from "@testing-library/react";


describe("_ Options Component test", () => {
	test("render test 1", () => {
		const store = aallaliStore({ game: { mode: "solo" } })
		const tree = renderer.create(<Provider store={store}>
			< Options />
		</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});
	test("render test 2", async () => {
		render(
			< Options />, {
			preloadedState:
			{
				opponents: {
					players: [{
						name: "testOpponent",
						lost: true,
						stage: [],
						rows: 55,
						score: 55,
						level: 55,
						admin: true
					}]
				},
				game: { mode: "solo" },
				player: { isAdmin: true }
			}
		}
		)

		fireEvent.click(screen.getByTestId("toggleAudio"))
		expect(await screen.findByText(/Sound Off/i)).toBeInTheDocument()

		fireEvent.click(screen.getByTestId("toggleAudio"))
		expect(await screen.findByText(/Sound On/i)).toBeInTheDocument()

		fireEvent.click(screen.getByTestId("toggleMode"))
		expect(await screen.findByText(/open/i)).toBeInTheDocument()

		fireEvent.click(screen.getByTestId("toggleMode"))
		expect(await screen.findByText(/locked/i)).toBeInTheDocument()


		fireEvent.click(screen.getByTestId("increaseSize"))
		fireEvent.click(screen.getByTestId("increaseSize"))
		expect(await screen.findByText(/3/i)).toBeInTheDocument()

		fireEvent.click(screen.getByTestId("decreaseSize"))
		expect(await screen.findByText(/2/i)).toBeInTheDocument()

		fireEvent.click(screen.getByTestId("decreaseSize"))
		expect(await screen.findByText(/1/i)).toBeInTheDocument()

		fireEvent.click(screen.getByTestId("decreaseSize"))
		expect(await screen.findByText(/1/i)).toBeInTheDocument()

		fireEvent.click(screen.getByTestId("increaseSize")) // 2
		fireEvent.click(screen.getByTestId("increaseSize")) // 3
		fireEvent.click(screen.getByTestId("increaseSize")) // 4
		fireEvent.click(screen.getByTestId("increaseSize")) // 5
		fireEvent.click(screen.getByTestId("increaseSize")) // 6
		fireEvent.click(screen.getByTestId("increaseSize")) // 7
		fireEvent.click(screen.getByTestId("increaseSize")) // 8
		fireEvent.click(screen.getByTestId("increaseSize")) // 9
		fireEvent.click(screen.getByTestId("increaseSize")) // 10
		fireEvent.click(screen.getByTestId("increaseSize")) // should not increase to 11 after fire another click
		expect(await screen.findByText(/10/i)).toBeInTheDocument()

	});

	test("render test 3", async () => {
		render(
			< Options />, {
			preloadedState:
			{
				opponents: {
					players: [{
						name: "testOpponent",
						lost: true,
						stage: [],
						rows: 55,
						score: 55,
						level: 55,
						admin: true
					}]
				},
				game: { mode: "multiplayer" },
				player: { isAdmin: true }
			}
		}
		)

		expect(await screen.findByText(/Open Mode/i)).toBeInTheDocument()
		expect(await screen.findByText(/10/i)).toBeInTheDocument()

	});

})
