/**
 * @providesModule RootNavigation
 */

//	Import drawer from react-navigation package
import { TabNavigator } from "react-navigation";
//	Scene imports
import DailyTabNav from "DailyTabNav";
import TabTwoStack from "TabTwoStack";
//	Import theme
import appTheme from "AppTheme";

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

	animationEnabled: false,
	swipeEnabled: true,
	tabBarPosition: "bottom",
	lazyLoad: false,
	initialRouteName: "DailyTab",
	order: ["DailyTab","TabTwo"],
	tabBarOptions: {

		activeTintColor: appTheme.white,
		inactiveTintColor: appTheme.lightPink,
		showIcon: true,
		showLabel: true,
		scrollEnabled: false,
		tabStyle: {

			backgroundColor: appTheme.pink,
		},
		indicatorStyle: {

			backgroundColor: appTheme.pink,
		},
		labelStyle: {

			fontSize: 8,
		},
		style: {

			backgroundColor: appTheme.pink,
		},
	},
});

export default RootNavigation;