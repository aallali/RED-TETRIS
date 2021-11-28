import renderer from "react-test-renderer";
import NextTetros from "../../components/NextTetros"
import { Provider } from 'react-redux';
import { store } from '../../app/store';

test("App render test ", () => {
	const tree = renderer.create(<Provider store={store}>
		<NextTetros />
	</Provider>).toJSON();
	expect(tree).toMatchSnapshot();
});
