/**
 * @providesModule AppDrawer
 */
import { DrawerNavigator } from "react-navigation";

import AppTabs from "AppTabs";

const AppDrawer = DrawerNavigator ({

	AppTabs: {

		screen: AppTabs,
	},
});

export default AppDrawer;