/**
 * @providesModule DrawerActions
 */

export const LIST_ITEM_SELECTED = "LIST_ITEM_SELECTED";

//	Action to declare the user has selected a drawer item
export function selectedListItem () {

	return {

		type: LIST_ITEM_SELECTED,
	};
}