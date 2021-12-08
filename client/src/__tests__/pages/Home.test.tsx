
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Home from '../../pages/home';
import renderer from "react-test-renderer";
import { render, screen } from '../../test-utils'
import { fireEvent } from '@testing-library/react';

describe("_Home PageXContainer test", () => {
	test("_ Home rendering check", () => {
		const tree = renderer.create(<Provider store={store}>
			< Home />
		</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('_ clickPlay /Home', () => {
		render(<Home />)
		renderer.create(<Provider store={store}>
			< Home />
		</Provider>)
		fireEvent.click(screen.getByTestId("play"))
		expect(screen.queryByText("nickname should be alphabetics or number or alphanumeric and 10 characters maximum")).toBeInTheDocument()

		fireEvent.change(screen.getByPlaceholderText("nickname..."), { target: { value: "aallali" } })
		fireEvent.click(screen.getByTestId("play"))
		expect(screen.queryByText("Invalid Hash Query"))
	});
})
