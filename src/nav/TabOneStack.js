/**
 * @providesModule TabOneStack
 */

import { StackNavigator } from "react-navigation";
import TabOne from "TabOne";

const TabOneStack = StackNavigator ({

	Index: {

		screen: TabOne,
	},
});

export default TabOneStack;