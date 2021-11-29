import renderer from "react-test-renderer";
import ProfileCard from "../../components/ProfileCard";
import { Provider } from 'react-redux';
import * as reactRedux from "react-redux";
import { aallaliStore, render, screen } from '../../test-utils'
import { fireEvent } from "@testing-library/react";

jest.setTimeout(10 * 1000)

describe("_Profile Cards Component test", () => {
	const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
	beforeEach(() => {
		useDispatchMock.mockClear();
		useDispatchMock.mockReturnValue(jest.fn());

	});


	test("render test 1", async () => {
		render(
			< ProfileCard playboard={true} />, {
			preloadedState:
			{
				game: { mode: "solo" },
				player: { isAdmin: true }
			}
		}
		)

		expect(await screen.findByText(/start/i)).toBeInTheDocument()
		expect(await screen.findByText(/leave/i)).toBeInTheDocument()

	});

	test("render test 2", async () => {

		render(
			< ProfileCard playboard={true} />, {
			preloadedState:
			{

				game: { mode: "multiplayer" },
				player: { isAdmin: true }
			}
		})
		expect(screen.queryByText(/leave/i)).toBeInTheDocument()
		expect(screen.queryByText(/★/i)).toBeInTheDocument()
		expect(screen.queryByText(/start/i)).not.toBeInTheDocument()

	});

	test("render test 3", async () => {
		render(
			< ProfileCard playboard={true} />, {
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
						admin: false
					}]
				},
				game: { mode: "multiplayer" },
				player: { isAdmin: true }
			}
		}
		)

		expect(screen.queryByText(/leave/i)).toBeInTheDocument()
		expect(screen.queryByText(/★/i)).toBeInTheDocument()
		expect(screen.queryByText(/start/i)).toBeInTheDocument()
		fireEvent.click(screen.getByText(/start/i))
		expect(useDispatchMock).toHaveBeenCalled();
	});

	test("render test 4 / case : game started", async () => {
		render(
			< ProfileCard playboard={true} />, {
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
				game: { mode: "multiplayer", started: true },
				player: { isAdmin: false }
			}
		}
		)

		expect(screen.queryByText(/leave/i)).toBeInTheDocument()
		expect(screen.queryByText(/★/i)).not.toBeInTheDocument()
		expect(screen.queryByText(/start/i)).not.toBeInTheDocument()

	});

	test("render test 5 / case : leave game click simulation / in playboard", async () => {
		render(
			< ProfileCard playboard={true} />, {
			preloadedState:
			{
				game: { mode: "multiplayer", started: true },
				player: { isAdmin: false }
			}
		})

		fireEvent.click(screen.getByText(/leave/i))
		expect(useDispatchMock).toHaveBeenCalled();

	});

	test("render test 6 / case : leave game click simulation / out of playboard", async () => {
		render(
			< ProfileCard playboard={false} />, {
			preloadedState:
			{
				game: { mode: "multiplayer", started: true },
				player: { isAdmin: false }
			}
		})

		fireEvent.click(screen.getByText(/leave/i))
		expect(useDispatchMock).toHaveBeenCalled();

	});
})
