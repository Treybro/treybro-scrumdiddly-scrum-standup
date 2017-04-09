/**
 * @providesModule BlockerHistoryNav
 */

import { StackNavigator } from "react-navigation";
import BlockerHistory from "BlockerHistory";

const BlockerHistoryNav = StackNavigator ({

	Index: {

		screen: BlockerHistory,
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

export default BlockerHistoryNav;