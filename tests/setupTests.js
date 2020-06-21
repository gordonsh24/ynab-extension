import Enzyme from 'enzyme';
import Adapter from "enzyme-adapter-react-16.3";

Enzyme.configure({
	adapter: new Adapter()
});

Object.defineProperty(window, 'matchMedia', {
	value: () => ({
		matches: false,
		addListener: () => {
		},
		removeListener: () => {
		}
	})
});