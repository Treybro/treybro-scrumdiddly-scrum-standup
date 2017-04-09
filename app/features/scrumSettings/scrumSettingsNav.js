/**
 * @providesModule ScrumSettingsNav
 */

import { StackNavigator } from "react-navigation";
import ScrumSettings from "ScrumSettings";

const ScrumSettingsNav = StackNavigator ({

	Index: {

		screen: ScrumSettings,
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

export default ScrumSettingsNav;