
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import renderer from "react-test-renderer";


test('_ welcome message / app', () => {
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	expect(getByText(/Welcome to DarkTetris/i)).toBeInTheDocument();
});

test("_ render app component", () => {
	const tree = renderer.create(<Provider store={store}>
		<App />
	</Provider>).toJSON();
	expect(tree).toMatchSnapshot();
});

test('_ input error message / app', () => {
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	expect(getByText(/nickname should be alphabetics or number or alphanumeric and 10 characters maximum/i)).toBeInTheDocument();
});
