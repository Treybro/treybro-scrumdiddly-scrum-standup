//	Import drawer from react-navigation package
import { DrawerNavigator } from "react-navigation";
//	Scene imports
import ScreenOne from "../scenes/ScreenOne";
import ScreenTwo from "../scenes/ScreenTwo";
import Drawer from "../components/Drawer";

/*
*	Main navigation root.
*	Responsible to handling the drawer
*/
const AppRoot = DrawerNavigator ({

	ScreenOne: {

		screen: ScreenOne,
	},
	ScreenTwo: {

		screen: ScreenTwo,
	},
}, {

	contentComponent: Drawer,
});

export default AppRoot;