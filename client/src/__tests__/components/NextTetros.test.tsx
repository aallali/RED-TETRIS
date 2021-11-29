import renderer from "react-test-renderer";
import NextTetros from "../../components/NextTetros"
import { Provider } from 'react-redux';

import { aallaliStore } from '../../test-utils'


describe("_ NextTetro Component test", () => {
	test("Next Tetro snaphot ", () => {
		const store = aallaliStore({ game: { tetros: ['L', 'Z', 'T', 'O', 'T'] } })

		const tree = renderer.create(<Provider store={store}>
			< NextTetros />
		</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});

})
