import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('render app component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/Welcome to DarkTetris/i)).toBeInTheDocument();
});


test('render app component', () => {
	const { getByText } = render(
	  <Provider store={store}>
		<App />
	  </Provider>
	);
  
	expect(getByText(/nickname should be alphabetics or number or alphanumeric and 10 characters maximum/i)).toBeInTheDocument();
  });
  