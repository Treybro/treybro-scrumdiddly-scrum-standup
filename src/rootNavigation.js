/**
 * @providesModule RootNavigation
 */

//	Import drawer from react-navigation package
import { TabNavigator } from "react-navigation";
//	Scene imports
import DailyTabNav from "DailyTabNav";
import TabTwoStack from "TabTwoStack";
//	Import theme
import theme from "AppTheme";

/*
*	Main navigation root.
*	Responsible for handling the tab nav
*/
const RootNavigation = TabNavigator ({

	DailyTab: {

		screen: DailyTabNav,
	},
	TabTwo: {

		screen: TabTwoStack,
	},
}, {

	animationEnabled: true,
	swipeEnabled: true,
	tabBarPosition: "bottom",
	lazyLoad: false,
	initialRouteName: "DailyTab",
	order: ["DailyTab","TabTwo"],
	tabBarOptions: {

		activeTintColor: theme.white,
		inactiveTintColor: theme.lightPink,
		showIcon: true,
		showLabel: true,
		scrollEnabled: false,
		tabStyle: {

			backgroundColor: theme.pink,
		},
		indicatorStyle: {

			backgroundColor: theme.pink,
		},
		labelStyle: {

			fontSize: 8,
		},
		style: {

			backgroundColor: theme.pink,
		},
	},
});

export default RootNavigation;