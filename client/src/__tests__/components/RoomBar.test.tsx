
import RoomBar from "../../components/RoomBar";
import * as reactRedux from "react-redux";
import { render, screen } from '../../test-utils'
import { fireEvent } from "@testing-library/react";

jest.setTimeout(10 * 1000)

describe("_Roombar Component test", () => {
	const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
	beforeEach(() => {
		useDispatchMock.mockClear();
		useDispatchMock.mockReturnValue(jest.fn());

	});

	test("render test 1", async () => {
		const room = { title: "arena", size: 7, active_players: 5, mode: "multiplayer" }
		render(
			<RoomBar {...room} />, {
			preloadedState:
			{
				player: { nickname: "aallali" }
			}
		})

		expect(screen.queryByText(/arena/i)).toBeInTheDocument()
		expect(screen.queryByText(/5\/7/i)).toBeInTheDocument()
		fireEvent.click(screen.getByText(/JOIN/))
		expect(window.location.href).toMatch("#arena[aallali]")
	});

	test("render test 2 / case : full room", async () => {
		const room = { title: "arena", size: 7, active_players: 7, mode: "multiplayer" }

		render(
			<RoomBar {...room} />, {
			preloadedState:
			{
				player: { nickname: "aallali" }
			}
		})

		expect(screen.queryByText(/arena/i)).toBeInTheDocument()
		expect(screen.queryByText(/7\/7/i)).toBeInTheDocument()
	});
})
