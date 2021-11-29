import renderer from "react-test-renderer";
import Opponents from "../../components/OpponentBox"
import { Provider } from 'react-redux';

import { aallaliStore, render, screen } from '../../test-utils'


describe("_ Opponenets Component test", () => {
	test("opponents listing render test ", () => {
		const store = aallaliStore({ opponents: { players: [{ name: "botOpponent", lost: true, score: 100, rows: 3, level: 2, admin: false }] } })
		const tree = renderer.create(<Provider store={store}>
			< Opponents gameOver={true} />
		</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});
	test("opponents listing render test2 ", async () => {
		render(
			< Opponents gameOver={false} />, {
			preloadedState:
			{
				opponents: {
					players: [{
						name: "testOpponent",
						lost: false,
						stage: [],
						rows: 55,
						score: 55,
						level: 55,
						admin: true
					}]
				}
			}
		}
		)

		expect(await screen.findByText(/★/)).toBeInTheDocument()

		expect(await screen.findByTestId("gameOverOverlay")).not.toHaveClass('resourceanimation')
		expect(await screen.findByText(/winner/i)).toBeInTheDocument()
	});


	test("opponents listing render test3 ", async () => {
		render(
			< Opponents gameOver={true} />, {
			preloadedState:
			{
				opponents: {
					players: [{
						name: "testOpponent",
						lost: true,
						stage: [],
						rows: 0,
						score: 0,
						level: 0,
						admin: true
					}]
				}
			}
		}
		)

		expect(await screen.findByText(/★/)).toBeInTheDocument()
	
		expect(await screen.findByTestId("gameOverOverlay")).toHaveClass('resourceanimation')
		expect(await screen.findByText(/Lost/i)).toBeInTheDocument()
	});
})
