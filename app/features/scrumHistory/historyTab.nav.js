/**
 * @providesModule HistoryNav
 */

import { StackNavigator } from "react-navigation";
import ScrumHistory from "ScrumHistory";

const HistoryNav = StackNavigator ({

	Index: {

		screen: ScrumHistory,
	},
}, {

	initialRouteName: "Index",
	initialRouteParams: {},
	navigationOptions: {},
	paths: {},
	mode: "card",
	headerMode: "float",
	cardStyle: {},
	onTransitionStart: () => {},
	onTransitionEnd: () => {},
});

export default HistoryNav;