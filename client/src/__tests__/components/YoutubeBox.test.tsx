import renderer from "react-test-renderer";
import YoutubeEmbed from "../../components/YoutubeBox"
import { Provider } from 'react-redux';
import { store } from '../../app/store';

test("_ YouTube Embeded Video Component Test ", () => {
	const tree = renderer.create(<Provider store={store}>
		<YoutubeEmbed embedId="s-Dq5FJEH10" />
	</Provider>).toJSON();
	expect(tree).toMatchSnapshot();
});

