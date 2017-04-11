/**
 * @providesModule AppDrawer
 */
import { Platform } from "react-native";
import { DrawerNavigator } from "react-navigation";

//import AppTabs from "AppTabs";
import DailyTabNav from "DailyTabNav";
import HistoryNav from "HistoryNav";
import BlockerHistoryNav from "BlockerHistoryNav";
import ScrumSettingsNav from "ScrumSettingsNav";

import theme from "AppTheme";

const AppDrawer = DrawerNavigator ({

	DailyTabNav: {

		screen: DailyTabNav,
	},
	HistoryNav: {

		screen: HistoryNav,
	},
	BlockerHistoryNav: {

		screen: BlockerHistoryNav,
	},
	SettingsNav: {

		screen: ScrumSettingsNav,
	},
}, {

	contentOptions: {

		activeTintColor: theme.white,
		activeBackgroundColor: theme.pink,
		inactiveTintColor: theme.white,
		inactiveBackgroundColor: theme.pink,
		style: {

			flex: 1,
			backgroundColor: theme.pink,
			marginTop: 0,
			paddingTop: (Platform.OS === "ios") ? 20 : 0,
		},
	},
});

export default AppDrawer;