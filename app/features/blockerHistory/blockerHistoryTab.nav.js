/**
 * @providesModule BlockerHistoryTabNav
 */

import { TabNavigator } from "react-navigation";
import BlockerHistoryNav from "BlockerHistoryNav";
import SelectedScrumNav from "SelectedScrumNav";
import theme from "AppTheme";

const DailyTabNav = TabNavigator ({

	TabOne: {

		screen: BlockerHistoryNav,
	},
	TabTwo: {

		screen: SelectedScrumNav,
	},
}, {

	animationEnabled: true,
	swipeEnabled: true,
	lazyLoad: false,
	initialRouteName: "TabOne",
	order: ["TabOne","TabTwo"],
	tabBarOptions: {

		activeTintColor: theme.white,
		inactiveTintColor: theme.lightPink,
		showIcon: false,
		showLabel: false,
		scrollEnabled: false,
	},
});

export default DailyTabNav;