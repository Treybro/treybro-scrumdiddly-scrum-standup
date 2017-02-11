/**
 * @providesModule TabOneStack
 */

import { StackNavigator } from "react-navigation";
import TabOne from "TabOne";

const TabOneStack = StackNavigator ({

	Index: {

		screen: TabOne,
	},
}, {

	initialRouteName: 'Index',
	initialRouteParams: {},
	navigationOptions: {},
	paths: {},
	mode: 'card',
	headerMode: 'float',
	cardStyle: {},
	onTransitionStart: () => {},
	onTransitionEnd: () => {},
});

export default TabOneStack;