/**
 * @providesModule DailyTabNav
 */

import { StackNavigator } from "react-navigation";
import DailyTab from "DailyTab";

const DailyTabNav = StackNavigator ({

	Index: {

		screen: DailyTab,
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

export default DailyTabNav;