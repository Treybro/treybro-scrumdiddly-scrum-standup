/**
 * @providesModule IconAssets
 */

import addIcon from "./icon-add.png";
import editIcon from "./icon-edit.png";
import menuIcon from "./icon-menu.png";
import removeIcon from "./icon-remove.png";
import clipboardIcon from "./icon-clipboard.png";
import pencilIcon from "./icon-pencil.png";
import settingsIcon from "./icon-settings.png";
import calendarIcon from "./icon-calendar.png";

export default function getIconAsset (assetName) {

	switch (assetName) {

	case "addIcon":
		return addIcon;
	case "editIcon":
		return editIcon;
	case "menuIcon":
		return menuIcon;
	case "removeIcon":
		return removeIcon;
	case "clipboardIcon":
		return clipboardIcon;
	case "pencilIcon":
		return pencilIcon;
	case "settingsIcon":
		return settingsIcon;
	case "calendarIcon":
		return calendarIcon;
	}
}