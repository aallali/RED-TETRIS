import RankedPlayers from "../../components/RankedPlayers";
import * as reactRedux from "react-redux";
import { render, screen } from '../../test-utils'
import { act } from "react-dom/test-utils";
const axios = require('axios');

jest.mock('axios')

describe("_RankedPlayers Component test", () => {
	const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

	beforeEach(() => {
		useDispatchMock.mockClear();
		useDispatchMock.mockReturnValue(jest.fn());

	});

	it("render test 1 while mocking axios request", async () => {
		await act(async () => {
			await axios.get.mockResolvedValue({
				data: `allali,67\nbot2,30\nbotUsername3,27`
			});
			render(
				< RankedPlayers />
			)
		});

		expect(screen.queryByText(/Top\s+Ranked\s+Players\s+:/i)).toBeInTheDocument()

		expect(screen.queryByText(/allali/i)).toBeInTheDocument()
		expect(screen.queryByText(/bot2/i)).toBeInTheDocument()
		expect(screen.queryByText(/botUsername3/i)).toBeInTheDocument()

		expect(screen.queryByText(/\[1\]/i)).toBeInTheDocument()
		expect(screen.queryByText(/\[2\]/i)).toBeInTheDocument()
		expect(screen.queryByText(/\[3\]/i)).toBeInTheDocument()
		expect(screen.queryByText(/\[4\]/i)).not.toBeInTheDocument()
	});
	it("render test 2 while mocking axios request", async () => {
		await act(async () => {
			await axios.get.mockResolvedValue({
				data: []
			});
			render(
				< RankedPlayers />
			)
		});

		expect(screen.queryByText(/Top\s+Ranked\s+Players\s+:/i)).toBeInTheDocument()
	});
})
