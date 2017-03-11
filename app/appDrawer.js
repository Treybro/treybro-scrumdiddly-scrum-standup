/**
 * @providesModule AppDrawer
 */
import { DrawerNavigator } from "react-navigation";

import AppTabs from "AppTabs";
import HistoryNav from "HistoryNav";

const AppDrawer = DrawerNavigator ({

	AppTabs: {

		screen: AppTabs,
	},
	HistoryNav: {

		screen: HistoryNav,
	},
});

export default AppDrawer;