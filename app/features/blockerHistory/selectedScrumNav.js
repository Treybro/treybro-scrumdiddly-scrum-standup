/**
 * @providesModule SelectedScrumNav
 */

import { StackNavigator } from "react-navigation";
import SelectedScrum from "SelectedScrum";

const SelectedScrumNav = StackNavigator ({

	Index: {

		screen: SelectedScrum,
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

export default SelectedScrumNav;