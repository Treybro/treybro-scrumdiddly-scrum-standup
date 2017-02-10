/**
 * @providesModule TabTwoStack
 */

import { StackNavigator } from "react-navigation";
import TabTwo from "TabTwo";

const TabTwoStack = StackNavigator ({

	Index: {

		screen: TabTwo,
	},
});

export default TabTwoStack;