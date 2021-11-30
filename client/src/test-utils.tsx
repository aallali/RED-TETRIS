// test-utils.jsx
import React, { ReactChildren } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import playerReducer from "./reducers/player.reducer";
import opponentReducer from "./reducers/opponent.reducer"
import errorReducer from "./reducers/error.reducer"
import gameReducer from "./reducers/game.reducer"
import chatReducer from './reducers/chat.reducer';

function aallaliStore(preloadedState: any) {
	return configureStore({
		reducer: {
			player: playerReducer,
			opponents: opponentReducer,
			error: errorReducer,
			game: gameReducer,
			chat: chatReducer
		},
		preloadedState
	})
}
function render(
	ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
	{
		preloadedState,
		store = configureStore({
			reducer: {
				player: playerReducer,
				opponents: opponentReducer,
				error: errorReducer,
				game: gameReducer,
				chat: chatReducer
			},
			preloadedState
		}),
		...renderOptions
	}: any = {}
) {
	function Wrapper({ children }: { children: ReactChildren }) {
		return <Provider store={store}>{children}</Provider>

	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}


// re-export everything
export * from '@testing-library/react'
// override render method
export { render, aallaliStore }