import renderer from "react-test-renderer";
import Error from "../../components/Error"
import { Provider } from 'react-redux';
import { store } from '../../app/store';

test("Error of bad hash query render test ", () => {
	const tree = renderer.create(<Provider store={store}>
		<Error title="hash_query_error" message="" />
	</Provider>).toJSON();
	expect(tree).toMatchSnapshot();
});

test("Standard Error render test ", () => {
	const tree = renderer.create(<Provider store={store}>
		<Error title="join room" message="name already exists" />
	</Provider>).toJSON();
	expect(tree).toMatchSnapshot();
});
